import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CartItem } from '../../types/cart'


interface CartState {
    items: CartItem[],
    totalQuantity: number,
    totalPrice: number,
}

/**
 * État initial du panier
 */
const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
}

// Fonction utilitaire pour calculer le total
const calculateTotals = (items: CartItem[]) => {
    return items.reduce((acc, item) => ({
        quantity: acc.quantity + item.quantity,
        price: acc.price + (item.price * item.quantity)
    }), { quantity: 0, price: 0 });
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        /**
         * Ajoute un Pokémon au panier
         * @param state - État du panier
         * @param action - Action de création
         */
        addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
            const existingItem = state.items.find(item => item.pokemonId === action.payload.pokemonId)

            if(!existingItem){
                state.items.push({...action.payload, quantity: 1})
            } else {
                existingItem.quantity += 1
            }
            
            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.quantity;
            state.totalPrice = totals.price;
        },

        /**
         * Supprime un Pokémon du panier
         * @param state - État du panier
         * @param action - Action de suppression
         */
        removeItem(
            state,
            action: PayloadAction<number>
        ) {
            const pokemonId = action.payload
            const existing = state.items.find(i => i.pokemonId === pokemonId)
            if (!existing) return

            existing.quantity -= 1
            
            if (existing.quantity <= 0) {
                state.items = state.items.filter(i => i.pokemonId !== pokemonId)
            }

            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.quantity;
            state.totalPrice = totals.price;
        },

        removeItemCompletely(
            state,
            action: PayloadAction<number>
        ) {
            const pokemonId = action.payload;
            state.items = state.items.filter(i => i.pokemonId !== pokemonId);
            
            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.quantity;
            state.totalPrice = totals.price;
        },

        /**
         * Met à jour la quantité d'un Pokémon dans le panier
         * @param state - État du panier
         * @param action - Action de mise à jour
         */
        updateQuantity(
            state,
            action: PayloadAction<{ pokemonId: number; quantity: number }>
        ) {
            const { pokemonId, quantity } = action.payload
            const item = state.items.find(i => i.pokemonId === pokemonId)
            if (!item) return
      
            item.quantity = quantity
      
            if (item.quantity <= 0) {
                state.items = state.items.filter(i => i.pokemonId !== pokemonId)
            }

            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.quantity;
            state.totalPrice = totals.price;
        },


        /**
         * Vide le panier
         * @param state - État du panier
         */
        clearCart: (state) => {
            state.items = []
            state.totalQuantity = 0
            state.totalPrice = 0
        }
    }
})

export const { addItem, removeItem, removeItemCompletely, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer