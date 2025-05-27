import React, {useState, useEffect} from 'react';
import type {Pokemon} from '../types/pokemon';
import type {ApiList} from '../types/api';
import PokemonService from '../api/pokemonService';

/**
 * Options pour fetch PokemonList
 */
export interface UsePokemonListOptions {
    limit?: number,
    offset?: number,
    filters?: string[],
    page?: number
}

/**
 * Résultat du hook usePokemons
 */
export interface UsePokemonsResult{
    data: ApiList<Pokemon> | null,
    isLoading: boolean,
    error: string | null,
    totalPages: number,
    currentPage: number
}

/**
 * Hook pour récupérer la liste des Pokémons.
 * @param options – options pour fetch PokemonList
 * @returns liste des Pokémons
 */
export function usePokemons(
    options: UsePokemonListOptions = {}
): UsePokemonsResult {
    const { 
        limit = 20, 
        filters,
        page = 1 
    } = options;

    const [pokemons, setPokemons] = useState<ApiList<Pokemon> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const currentOffset = (page - 1) * limit;

                const result = filters
                    ? await PokemonService.getPokemonByFilter(limit, filters, currentOffset)
                    : await PokemonService.getPokemonList(limit, currentOffset);

                if (!cancelled) {
                    setPokemons(result);
                    setTotalPages(Math.ceil(result.count / limit));
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err as string);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            cancelled = true;
        };
    }, [limit, filters, page]);

    return { 
        data: pokemons, 
        isLoading: loading, 
        error,
        totalPages,
        currentPage: page
    };
}








