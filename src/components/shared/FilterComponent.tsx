import React from 'react'
import { MultiSelect, Loader, Text, Box } from '@mantine/core'
import { useTypes } from '../../hooks/useTypes'
import { POKEMON_TYPE_COLORS } from '../../constants/pokemonTypes'
import '../../styles/FilterComponent.css'
import type { FilterComponentProps } from '../../types/filter'


/**
 * Composant de filtre pour les types de Pokémons
 * @param {FilterComponentProps} props - Props du composant
 * @returns {JSX.Element} Composant de filtre
 */
export default function FilterComponent({
  selectedTypes,
  onSelectTypes,
}: FilterComponentProps) {
  const { options, loading, error } = useTypes()

  if (error) {
    return <Text color="red">Erreur chargement des types : {error}</Text>
  }

  return (
    <Box mb="md">
      <MultiSelect
        data={options}
        value={selectedTypes}
        onChange={onSelectTypes}
        placeholder={loading ? 'Chargement…' : 'Filtrer par type'}
        searchable
        clearable
        disabled={loading}
        rightSection={loading ? <Loader size="xs" /> : null}
        description="Sélectionnez un ou plusieurs types pour filtrer les Pokémons"
        maxDropdownHeight={400}
        styles={{
          dropdown: {
            maxHeight: '400px',
            overflowY: 'auto',
          },
          option: {
            '&[data-selected="true"]': {
              backgroundColor: 'var(--mantine-color-blue-6)',
              color: 'white',
            },
          },
          input: {
            '&[data-selected="true"]': {
              backgroundColor: 'var(--mantine-color-blue-6)',
              color: 'white',
            },
          },
        }}
        renderOption={({ option, ...others }) => {
          const typeColors = POKEMON_TYPE_COLORS[option.value.toLowerCase()] || {
            color: '#A8A878',
            backgroundColor: '#C6C6A7'
          };

          return (
            <div {...others} className="filter-option">
              <div 
                className="type-indicator"
                style={{ backgroundColor: typeColors.color }}
              />
              {option.label}
            </div>
          );
        }}
      />
    </Box>
  )
}