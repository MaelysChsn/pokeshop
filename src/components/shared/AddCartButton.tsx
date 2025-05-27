import { Button } from '@mantine/core';
import { useCart } from '../../hooks/useCart';

/**
 * Props du composant AddCartButton
 */
interface AddCartButtonProps {
    pokemonId: number;
    price: number;
    name: string;
}

/**
 * Composant bouton pour ajouter un Pokémon au panier
 */
export const AddCartButton: React.FC<AddCartButtonProps> = ({pokemonId, price, name}) => {
    const {addToCart} = useCart();

    return (
        <Button onClick={() => addToCart(pokemonId, price, name)}>
            Ajouter au panier
        </Button>
    )
}

