import { Link, useParams } from 'react-router-dom';
import React from 'react';
import { Container, Image, Text, Badge, Group, Grid, Loader, Title, Stack, Paper, Box, Divider, NumberInput, Button, Anchor } from '@mantine/core';
import { usePokemon } from '../hooks/usePokemon';
import { useCart } from '../hooks/useCart';
import { IconMinus, IconPlus, IconArrowLeft } from '@tabler/icons-react';
import PokemonType from '../components/reusable/PokemonType';
import '../styles/components/PokemonDetailPage.css';

const PokemonDetailPage: React.FC = () => {
    const { id } = useParams();
    const { data, isLoading } = usePokemon({ id: id as string });
    const { addToCart, removeFromCart, items } = useCart();
    const quantity = items.find(item => item.pokemonId === data?.id)?.quantity ?? 0;

    // Si le pokémon est en cours de chargement
    if (isLoading) {
        return (
            <Container size="lg" py="xl">
                <Grid>
                    <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                        <Loader size="xl" />
                    </Grid.Col>
                </Grid>
            </Container>
        )
    }

    return (
        <Container size="lg" py="xl">
             <Group>
                <Anchor component={Link} to="/">
                    <Group>
                        <IconArrowLeft size={16} />
                        Retour
                    </Group>
                </Anchor>
            </Group>
            <Grid gutter="xl" mt="xl">
    
                {/* Colonne de gauche - Image */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper shadow="md" radius="lg" p="xl" style={{ height: '100%' }}>
                        <Box className="pokemon-image-container">
                            <Image 
                                src={data?.image} 
                                alt={data?.name} 
                                height={500}
                                fit="contain"
                            />
                        </Box>
                    </Paper>
                </Grid.Col>

                {/* Colonne de droite - Informations */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper shadow="md" radius="lg" p="xl">
                        <Stack gap="xl">
                            {/* En-tête avec nom et prix */}
                            <Group justify="space-between" align="flex-start">
                                <Title order={1} style={{ textTransform: 'capitalize' }}>
                                    {data?.name}
                                </Title>
                                <Text size="xl" fw={700} c="blue">
                                    {data?.price.toLocaleString('fr-FR')} €
                                </Text>
                            </Group>

                            <Divider />

                            {/* Types */}
                            <Stack gap="xs">
                                <Text fw={600} size="lg">Types</Text>
                                <PokemonType types={data?.types ?? []} size="lg" numberShow={2} />
                            </Stack>

                            <Divider />

                            {/* Capacités */}
                            <Stack gap="xs">
                                <Text fw={600} size="lg">Capacités</Text>
                                <Group gap="xs">
                                    {data?.abilities.map((ability) => (
                                        <Badge 
                                            key={ability} 
                                            size="lg"
                                            variant="light"
                                            className="ability-badge"
                                        >
                                            {ability}
                                        </Badge>
                                    ))}
                                </Group>
                            </Stack>

                            <Divider />

                            {/* Section panier */}
                            <Stack gap="md">
                                <Text fw={600} size="lg">Quantité</Text>
                                <Group>
                                    <Button 
                                        variant="light" 
                                        onClick={() => removeFromCart(data?.id ?? 0)}
                                        disabled={quantity === 0}
                                    >
                                        <IconMinus size={16} />
                                    </Button>
                                    <NumberInput
                                        value={quantity}
                                        onChange={() => {}}
                                        readOnly
                                        min={0}
                                        className="quantity-input"
                                    />
                                    <Button 
                                        variant="light"
                                        onClick={() => addToCart(
                                            data?.id ?? 0,
                                            data?.price ?? 0,
                                            data?.name ?? ''
                                        )}
                                    >
                                        <IconPlus size={16} />
                                    </Button>
                                </Group>
                                <Text fw={600} size="lg">
                                    Total: {(quantity * (data?.price ?? 0)).toLocaleString('fr-FR')} €
                                </Text>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Container>
    )
}

export default PokemonDetailPage;