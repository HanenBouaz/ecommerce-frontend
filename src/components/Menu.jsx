import React from 'react'

import { Nav, Navbar,Container,Form,FormControl,Button,Badge } from 'react-bootstrap';
import { useShoppingCart} from 'use-shopping-cart';
import { Link } from 'react-router-dom'
const Menu = () => {
    const { cartCount } = useShoppingCart();
    return (
        <Navbar className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand >E-commerce</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <Badge bg="danger">{cartCount}</Badge>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/categories">Catégories</Nav.Link>
                    <Nav.Link as={Link} to="/scategories">Sous Catégories</Nav.Link>
                    <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
                    <Nav.Link as={Link} to="/client">Client</Nav.Link>
                </Nav>
            </Container>
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="success">Chercher</Button>
            </Form>
        </Navbar>
    )
}
export default Menu
