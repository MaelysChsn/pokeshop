
/**
 * Type pour les types de Pokémons
 */
export interface RawTypeSummary {
    name: string
    url: string
}

/**
 * Type pour les types de Pokémons
 */
export interface PokemonType {
    id: number
    name: string
    url: string
}

/**
 * Type pour les props du composant PokemonType
 */
export interface PokemonTypeProps {
    types: string[];
    size?: 'sm' | 'md' | 'lg';
    numberShow?: number;
}

