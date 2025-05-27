
/**
 * Type pour les Pokémons
 */
export interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
    abilities: string[];
    price: number;
}

/**
 * Type pour les détails des Pokémons
 */
export interface RawPokemonDetail {
    id: number
    name: string
    sprites: {
      front_default: string
      other?: {
        'official-artwork'?: {
          front_default: string
        }
      }
    }
    types: Array<{
      slot: number
      type: { name: string; url: string }
    }>
    abilities: RawAbilityEntry[]
}

/**
 * Type pour les entrées d'abilités
 */
export interface RawAbilityEntry {
    ability: { name: string; url: string }
    is_hidden: boolean
    slot: number
}

/**
 * Type pour les props du composant PokemonCard
 */
export interface PokemonCardProps {
    pokemon: Pokemon;
}

/**
 * Type pour les options du hook usePokemon
 */ 
export interface UsePokemonOptions {
  id: string;
}

/**
 * Type pour le résultat du hook usePokemon
 */
export interface UsePokemonResult {
    data: Pokemon | null;
    error: string | null;
    isLoading: boolean;
}
