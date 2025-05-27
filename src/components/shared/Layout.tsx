import { Outlet } from 'react-router-dom'
import Header from './Header'
import { Container } from '@mantine/core'

/**
 * Composant Layout
 * @returns {JSX.Element} Composant Layout
 */
const Layout:React.FC = () => {

    return(
        <Container m="xl" style={{maxWidth: '1280px'}}>
            <Header />
            <Outlet />
        </Container>
    )
}

export default Layout;