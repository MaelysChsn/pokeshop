import React from 'react';
import { Card, Image, Text, Group, Badge, Button, Anchor } from '@mantine/core';
import type { PokemonCardProps } from '../../types/pokemon';
import PokemonType from './PokemonType';
import { Link } from 'react-router-dom';


/**
 * PokemonCard - Affiche une carte pour un Pokémon
 * @param {PokemonCardProps} props - Les propriétés du composant
 * @returns {React.ReactElement}
 */
export default function PokemonCard({ pokemon }: PokemonCardProps) {
    
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={pokemon.image}
                    height={160}
                    alt={pokemon.name}
                    fit="contain"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="md">
                <Text fw={500} size="lg" style={{ textTransform: 'capitalize' }}>
                    {pokemon.name}
                </Text>
                <Badge color="blue" variant="light">
                    {pokemon.price.toLocaleString('fr-FR')} €
                </Badge>
            </Group>

            <PokemonType types={pokemon.types} />

            <Anchor component={Link} to={`/pokemon/${pokemon.id}`} underline='never'>
                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                    Voir le Pokémon
                </Button>
            </Anchor>
        </Card>
    );
}



