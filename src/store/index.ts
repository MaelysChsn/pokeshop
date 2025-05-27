// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'      // localStorage
import cartReducer from './slice/cartSlice'

/**
 * Configuration pour le persist
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],    // ne persister que le slice 'cart'
}

/**
 * Racine du reducer
 */
const rootReducer = {
  cart: persistReducer(persistConfig, cartReducer),
}

/**
 * Configuration pour le store
 */ 
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,  // à désactiver pour redux-persist
    }),
})

/**
 * Persistor pour le store
 */
export const persistor = persistStore(store)

/**
 * Typings pour useSelector/useDispatch
 */
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch