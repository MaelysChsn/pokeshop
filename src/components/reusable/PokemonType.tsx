import React from 'react';
import { Badge, Group } from '@mantine/core';
import { POKEMON_TYPE_COLORS } from '../../constants/pokemonTypes';
import type { PokemonTypeProps } from '../../types/pokemonType';


/**
 * Composant PokemonType
 * @param {PokemonTypeProps} props - Props du composant
 * @returns {JSX.Element} Composant PokemonType
 */
export default function PokemonType({ types, size = 'md', numberShow = 1 }: PokemonTypeProps) {

    // Vérification de sécurité pour les types
    if (!types || !Array.isArray(types)) {
        return null;
    }

    const typesToShow = types.slice(0, numberShow);
    
    return (
        <Group gap="xs" style={{marginBottom: '10px'}}>
            {typesToShow.map((type) => {
                const typeColors = POKEMON_TYPE_COLORS[type.toLowerCase()] || {
                    color: '#6D6D4E',
                    backgroundColor: '#C6C6A7'
                };

                return (
                    <Badge
                        key={type}
                        size={size}
                        style={{
                            backgroundColor: typeColors.backgroundColor,
                            color: typeColors.color,
                            textTransform: 'capitalize',
                            fontWeight: 700,
                            border: 'none',
                            padding: '8px 12px',
                            letterSpacing: '0.5px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        {type}
                    </Badge>
                );
            })}
        </Group>
    );
} 