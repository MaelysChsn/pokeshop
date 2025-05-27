import { useCart } from '../hooks/useCart';
import { Container, Title, Table, Button, Group, Input, Text, ActionIcon, Paper, Stack, Badge, Box, Grid, Divider, Modal } from '@mantine/core';
import { useCallback, useState } from 'react';
import { IconTrash, IconShoppingCart, IconArrowLeft } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import '../styles/CartPage.css';

const CartPage: React.FC = () => {
    const {items, totalQuantity, totalPrice, removeItemCompletely, updateQuantity, clearCart} = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    // Optimisation avec useCallback pour éviter les re-rendus inutiles
    const handleQuantityChange = useCallback((pokemonId: number, newValue: string) => {
        const quantity = parseInt(newValue);
        if (!isNaN(quantity)) {
            updateQuantity(pokemonId, quantity);
        }
    }, [updateQuantity]);

    // Fonction pour simuler un paiement
    const handleCheckout = async () => {
        setIsProcessing(true);
        try {
            // Simuler un paiement réussi
            await new Promise(resolve => setTimeout(resolve, 3000));
            open();
        } catch (err) {
            console.error('Erreur lors du paiement:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    // Si le panier est vide
    if(items.length === 0){
        return (
            <Container size="md" py="xl">
                <Paper shadow="md" p="xl" radius="lg" withBorder>
                    <Stack gap="md" align="center">
                        <Box className="empty-cart-icon">
                            <IconShoppingCart size={64} color="gray" />
                        </Box>
                        <Title order={2} c="dimmed" ta="center">Votre panier est vide</Title>
                        <Text c="dimmed" ta="center" size="lg">
                            Explorez notre collection de Pokémon et commencez vos achats !
                        </Text>
                        <Button 
                            component={Link} 
                            to="/" 
                            variant="light"
                            leftSection={<IconArrowLeft size={16} />}
                            size="lg"
                            mt="md"
                        >
                            Continuer vos achats
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        );
    }

    return (
        <>
            <Container size="lg" py="xl">
                <Stack gap="xl">
                    <Group justify="space-between" align="center">
                        <Title order={2}>Votre Panier</Title>
                        <Badge size="lg" variant="filled" color="blue" radius="md">
                            {totalQuantity} articles
                        </Badge>
                    </Group>

                    <Grid gutter="xl">
                        {/* Colonne de gauche - Liste des articles */}
                        <Grid.Col span={{ base: 12, md: 8 }}>
                            <Paper shadow="md" p="xl" radius="lg" withBorder>
                                <Table striped highlightOnHover>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>Nom</Table.Th>
                                            <Table.Th>Prix unitaire</Table.Th>
                                            <Table.Th>Quantité</Table.Th>
                                            <Table.Th>Total</Table.Th>
                                            <Table.Th>Actions</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {items.map((item) => (
                                            <Table.Tr key={item.pokemonId}>
                                                <Table.Td>
                                                    <Text fw={500} size="lg">{item.name}</Text>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Text fw={500}>{item.price.toLocaleString('fr-FR')}€</Text>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Group gap="xs">
                                                        <Button 
                                                            size="xs" 
                                                            variant="light" 
                                                            onClick={() => updateQuantity(item.pokemonId, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </Button>
                                                        <Input 
                                                            type="number" 
                                                            min={0}
                                                            size="xs"
                                                            w={60}
                                                            value={item.quantity} 
                                                            onChange={(e) => handleQuantityChange(item.pokemonId, e.target.value)} 
                                                        />
                                                        <Button 
                                                            size="xs" 
                                                            variant="light" 
                                                            onClick={() => updateQuantity(item.pokemonId, item.quantity + 1)}
                                                        >
                                                            +
                                                        </Button>
                                                    </Group>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Text fw={700} c="blue">{(item.price * item.quantity).toLocaleString('fr-FR')}€</Text>
                                                </Table.Td>
                                                <Table.Td>
                                                    <ActionIcon 
                                                        color="red" 
                                                        variant="light" 
                                                        onClick={() => removeItemCompletely(item.pokemonId)}
                                                        title="Supprimer l'article"
                                                        size="lg"
                                                    >
                                                        <IconTrash size={18} />
                                                    </ActionIcon>
                                                </Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            </Paper>
                        </Grid.Col>

                        {/* Colonne de droite - Récapitulatif */}
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Paper shadow="md" p="xl" radius="lg" withBorder>
                                <Stack gap="xl">
                                    <Title order={3}>Récapitulatif</Title>
                                    
                                    <Stack gap="md">
                                        <Group justify="space-between">
                                            <Text size="sm" c="dimmed">Nombre d'articles</Text>
                                            <Text fw={500}>{totalQuantity}</Text>
                                        </Group>
                                        <Group justify="space-between">
                                            <Text size="sm" c="dimmed">Sous-total</Text>
                                            <Text fw={500}>{totalPrice.toLocaleString('fr-FR')}€</Text>
                                        </Group>
                                        <Divider />
                                        <Group justify="space-between">
                                            <Text size="lg" fw={700}>Total</Text>
                                            <Text size="lg" fw={700} c="blue">{totalPrice.toLocaleString('fr-FR')}€</Text>
                                        </Group>
                                    </Stack>

                                    <Stack gap="md">
                                        <Button 
                                            onClick={handleCheckout}
                                            size="lg"
                                            radius="md"
                                            fullWidth
                                            loading={isProcessing}
                                        >
                                            Payer maintenant
                                        </Button>
                                        <Button 
                                            variant="light" 
                                            color="red" 
                                            onClick={clearCart}
                                            leftSection={<IconTrash size={16} />}
                                            fullWidth
                                        >
                                            Vider le panier
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Container>

            {
                opened && (
                    <Modal
                        opened={opened}
                        onClose={close}
                        title="🎉 Paiement validé"
                        centered
                        closeOnClickOutside={false}
                        closeOnEscape={false}
                        withCloseButton={false}
                        classNames={{
                            root: 'modal-root',
                            inner: 'modal-inner',
                            content: 'modal-content',
                            title: 'modal-title'
                        }}
                    >
                        <Stack gap="md">
                            <Text>Merci pour votre commande !</Text>
                            <Button onClick={() => {
                                clearCart();
                                navigate('/');
                            }}>Revenir à l'accueil</Button>
                        </Stack>
                    </Modal>
                )}
            </>
        );
    }

    export default CartPage;