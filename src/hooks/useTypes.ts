import { useState, useEffect } from 'react'
import type { FilterOption } from '../types/filter'
import PokemonService from '../api/pokemonService'
import type { UseTypesReturn } from '../types/hooks'

/**
 * Hook personnalisé pour récupérer les types de Pokémons
 * @returns {UseTypesReturn} Les types de Pokémons, le statut de chargement et l'erreur
 */

export function useTypes(): UseTypesReturn {
  const [options, setOptions] = useState<FilterOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const types = await PokemonService.getPokemonTypes()
        setOptions(types)
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchTypes()
  }, [])

  return { options, loading, error }
}