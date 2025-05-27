import React, {useState, useCallback} from 'react';
import { Container, Grid, Title, Loader, Alert, Group, Pagination, Box } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { usePokemons } from '../hooks/usePokemons';
import PokemonCard from '../components/reusable/PokemonCard';
import FilterComponent from '../components/shared/FilterComponent';
import '../styles/components/PokemonListPage.css';

const PokemonListPage: React.FC = () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Utilisation de useCallback pour optimiser les performances
    const handleTypeChange = useCallback((types: string[]) => {
        console.log('Types sélectionnés:', types); // Debug
        setSelectedTypes(types);
        setCurrentPage(1); // Réinitialiser la page lors du changement de filtre
    }, []);

    // Gestion de la pagination
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    // Récupération des données des Pokémons
    const { data, isLoading, error, totalPages } = usePokemons({
        filters: selectedTypes,
        limit: 20,
        page: currentPage
    });

    // Affichage du loader lors du chargement des données
    if (isLoading) {
        return (
            <Container>
                <Grid>
                    <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <Loader size="lg" />
                    </Grid.Col>
                </Grid>
            </Container>
        );
    }

    // Affichage d'une erreur si elle survient
    if (error) {
        return (
            <Container>
                <Grid>
                    <Grid.Col span={12}>
                        <Alert icon={<IconAlertCircle size="1rem" />} title="Erreur" color="red">
                            {error}
                        </Alert>
                    </Grid.Col>
                </Grid>
            </Container>
        );
    }

    return (
        <Container className="pokemon-list-container">
            <Grid mt="xl">
                <Grid.Col span={12}>
                    <FilterComponent
                        selectedTypes={selectedTypes}
                        onSelectTypes={handleTypeChange}
                    />
                </Grid.Col>

                <Grid.Col span={12}>
                    <Group>
                        <Grid>
                            <Grid.Col span={12}>
                                <Title order={2}>Liste des Pokémons</Title>
                            </Grid.Col>
                        </Grid>

                        <Grid style={{ width: '100%' }}>
                            {
                            data?.results.length > 0 ?
                                data?.results.map((pokemon) => (
                                    <Grid.Col 
                                        key={pokemon.id} 
                                        span={4} 
                                        className="pokemon-grid"
                                    >
                                        <Box className="pokemon-card-container">
                                            <PokemonCard pokemon={pokemon} />
                                        </Box>
                                    </Grid.Col>
                                ))
                            :
                                <Grid.Col span={12}>
                                    <Alert icon={<IconAlertCircle size="1rem" />} title="Aucun Pokémon trouvé" color="blue">
                                        Aucun Pokémon trouvé pour les types sélectionnés.
                                    </Alert>
                                </Grid.Col>
                        }
                        </Grid>

                        {totalPages > 1 && (
                            <Grid.Col span={12}>
                                <Box className="pagination-container">
                                    <Pagination
                                        total={totalPages}
                                        value={currentPage}
                                        onChange={handlePageChange}
                                        size="md"
                                        radius="md"
                                        withEdges
                                    />
                                </Box>
                            </Grid.Col>
                        )}
                    </Group>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default PokemonListPage;

