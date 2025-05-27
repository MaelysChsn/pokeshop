import { getAxiosInstance } from './axiosInstance';
import type { Pokemon, RawPokemonDetail } from '../types/pokemon';
import type { RawTypeSummary } from '../types/pokemonType';
import type { FilterOption } from '../types/filter'
import type { ApiList } from '../types/api';
import mapDetailToPokemon from '../utils/mappers/pokemonMapper';


const PokemonService = {

    /**
     * Récupère la liste des Pokémons.
     * @param limit – nombre de Pokémons à récupérer
     * @param offset – nombre de Pokémons à ignorer
     * @returns liste des Pokémons
     */
    getPokemonList: async (limit:number = 20, offset:number = 0): Promise<ApiList<Pokemon>> => {

        const { count, results } = await getAxiosInstance<ApiList<{ name: string; url: string }>>(
            '/pokemon',
            { limit, offset },
          )
      
          // 2) Pour chaque résumé, récupère le détail et mappe-le
          const enriched = await Promise.all(
            results.map(async ({ name, url }) => {
              const id = url.split('/').filter(Boolean).pop()!
              const detail = await getAxiosInstance<RawPokemonDetail>(`/pokemon/${id}`)
              const pokemon = mapDetailToPokemon(detail)
              // Si tu ne veux qu'un summary, tu pourrais ne retourner que subset:
              // const { id, name, image, types, abilities } = pokemon
              return pokemon
            }),
          )
      
          return { count, results: enriched }
    },

    /**
     * Récupère les Pokémons par filtre.
     * @param limit – nombre de Pokémons à récupérer
     * @param offset – nombre de Pokémons à ignorer
     * @param filter – filtre à appliquer
     * @returns liste des Pokémons
     */
    getPokemonByFilter: async(limit: number=20, filters: string[], offset: number=0): Promise<ApiList<Pokemon>> => {
        // Si aucun filtre n'est sélectionné, retourner la liste complète
        if (!filters.length) {
            return await PokemonService.getPokemonList(limit, offset);
        }

        // Récupérer les Pokémons pour chaque type sélectionné
        const pokemonPromises = await Promise.all(
            filters.map(async (type) => {
                const response = await getAxiosInstance<{ pokemon: Array<{ pokemon: { name: string; url: string } }> }>(
                    `/type/${type}`
                );
                
                // Récupérer les détails de chaque Pokémon pour vérifier son type principal
                const pokemonDetails = await Promise.all(
                    response.pokemon.map(async ({ pokemon }) => {
                        const id = pokemon.url.split('/').filter(Boolean).pop()!;
                        const detail = await getAxiosInstance<RawPokemonDetail>(`/pokemon/${id}`);
                        return {
                            id,
                            url: pokemon.url,
                            primaryType: detail.types[0].type.name
                        };
                    })
                );

                // Ne garder que les Pokémon dont le type principal correspond au filtre
                return pokemonDetails
                    .filter(pokemon => pokemon.primaryType === type)
                    .map(pokemon => ({ id: pokemon.id }));
            })
        );

        // Fusionner et dédoublonner les résultats
        const uniquePokemons = Array.from(
            new Set(pokemonPromises.flat().map(p => p.id))
        ).map(id => ({ id }));

        // Appliquer l'offset et la limite
        const paginatedPokemons = uniquePokemons.slice(offset, offset + limit);

        // Enrichir les données des Pokémons
        const enriched = await Promise.all(
            paginatedPokemons.map(async ({ id }) => {
                const detail = await getAxiosInstance<RawPokemonDetail>(`/pokemon/${id}`);
                return mapDetailToPokemon(detail);
            })
        );

        return { count: uniquePokemons.length, results: enriched };
    },

    
    /**
     * Récupère un Pokémon par son ID.
     * @param id – ID du Pokémon à récupérer
     * @returns Pokémon
     */
    getPokemonById: async (id: string): Promise<Pokemon> => {
        const result =  await getAxiosInstance<Pokemon>(`/pokemon/${id}`)

        const pokemon = mapDetailToPokemon(result);

        return pokemon;
    },

    /**
     * Récupère les types de Pokémons.
     * @returns liste des types de Pokémons
     */
    getPokemonTypes: async (): Promise<FilterOption[]> => {
        const { results } = await getAxiosInstance<ApiList<RawTypeSummary>>('/type')

        return results.map(({ name }) => ({
            value: name,
            label: name.charAt(0).toUpperCase() + name.slice(1),
        }))
    }
    
}

export default PokemonService;
