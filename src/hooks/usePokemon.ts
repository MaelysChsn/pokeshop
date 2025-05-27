import {useState, useEffect} from 'react';
import type {Pokemon} from '../types/pokemon';
import PokemonService from '../api/pokemonService';
import type { UsePokemonOptions, UsePokemonResult } from '../types/pokemon';

/**
 * Hook personnalisé pour récupérer les données d'un Pokémon
 * @param options - Options pour le hook
 * @returns {UsePokemonResult} Les données du Pokémon, l'erreur et le statut de chargement
 */
export function usePokemon (
    options: UsePokemonOptions = {
        id: ''
    }
): UsePokemonResult 
{
    const {id} = options;

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData(){
            setLoading(true);
            setError(null);

            try{
                const result = await PokemonService.getPokemonById(id);

                if (!cancelled){
                    setPokemon(result);
                }
            } catch (err){
                if (!cancelled){
                    setError(err as string);
                }
            } finally {
                if (!cancelled){
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            cancelled = true;
        }
    }, [id]);

    return {data: pokemon, error, isLoading: loading};
}
