import type { CartItem } from './cart';
import type { Pokemon } from './pokemon';


/**
 * Interface pour le hook useCart
 */
export interface UseCartReturn {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
    addToCart: (pokemonId: number, price: number, name: string) => void;
    removeFromCart: (pokemonId: number) => void;
    removeItemCompletely: (pokemonId: number) => void;
    updateQuantity: (pokemonId: number, quantity: number) => void;
    clearCart: () => void;
}

/**
 * Interface pour le hook useTypes
 */
export interface UseTypesReturn {
    options: Array<{ value: string; label: string }>;
    loading: boolean;
    error: string | null;
}

/**
 * Interface pour le hook usePokemon
 */
export interface UsePokemonReturn {
    pokemon: Pokemon | null;
    loading: boolean;
    error: string | null;
}

/**
 * Interface pour le hook usePokemons
 */
export interface UsePokemonsReturn {
    pokemons: Pokemon[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
} 