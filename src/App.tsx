// src/App.tsx
import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import PokemonListPage from './views/PokemonListPage'
import PokemonDetailPage from './views/PokemonDetailPage'
import CartPage from './views/CartPage'


const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PokemonListPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
