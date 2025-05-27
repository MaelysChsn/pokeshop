import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import type { UseCartReturn } from '../types/hooks'
import { addItem, removeItem, removeItemCompletely as removeItemCompletelyAction, updateQuantity as updateQuantityAction, clearCart as clearCartAction } from '../store/slice/cartSlice'

/**
 * Hook personnalisé pour gérer le panier
 * @returns {UseCartReturn} Les méthodes et propriétés du panier
 */
export function useCart(): UseCartReturn {
    const dispatch = useDispatch<AppDispatch>()
    const items = useSelector((state: RootState) => state.cart.items);
    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);


    // Ajouter un Pokémon au panier
    const addToCart = (pokemonId: number, price: number, name: string): void => {
        dispatch(addItem({pokemonId, price, name}));
    }

    // Retirer un Pokémon du panier
    const removeFromCart = (pokemonId: number): void => {
        dispatch(removeItem(pokemonId));
    }

    // Retirer complètement un Pokémon du panier
    const removeItemCompletely = (pokemonId: number): void => {
        dispatch(removeItemCompletelyAction(pokemonId));
    }

    // Mettre à jour la quantité d'un Pokémon dans le panier
    const updateQuantity = (pokemonId: number, quantity: number): void => {
        // Vérification de la validité de la quantité
        if (quantity < 0) return;
        
        dispatch(updateQuantityAction({pokemonId, quantity}));
    }

    // Vider le panier
    const clearCart = (): void => {
        dispatch(clearCartAction());
    }

    return {
        items,
        totalQuantity,
        totalPrice,
        addToCart,
        removeFromCart,
        removeItemCompletely,
        updateQuantity,
        clearCart,
    }
}

export type UseCartResult = ReturnType<typeof useCart>;