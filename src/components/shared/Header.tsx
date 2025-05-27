import React from 'react'
import { Container, Group, Title, Badge, Anchor, Image, Box } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import basketIcon from '../../assets/icons/svg/basket.svg'
import '../../styles/components/Header.css'


/**
 * Composant Header
 * @returns {JSX.Element} Composant Header
 */
const Header: React.FC = () => {
  // récupère les infos du panier
  const { totalQuantity } = useCart();

  return (
    <Box className="header-container">
      <Container size="xl">
        <Group justify="space-between" align="center">
          <Anchor component={Link} to="/" underline="never">
            <Title order={3} className="header-title">PokéShop</Title>
          </Anchor>

          <Group gap="xl">
            <Anchor 
              component={Link} 
              to="/" 
              className="header-nav-link"
            >
              Pokémons
            </Anchor>
            <Anchor 
              component={Link} 
              to="/cart" 
              className="cart-link"
            >
              <Image 
                src={basketIcon} 
                width={24} 
                height={24} 
                alt="Panier" 
                className="cart-icon"
              />
              <Badge 
                size="sm"
                className="cart-badge"
              >
                {totalQuantity}
              </Badge>
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  )
}

export default Header;