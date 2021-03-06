import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function MainNavigation() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to='/'>Recipe React</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    <Nav.Link as={Link} to='/create'>Create Recipe</Nav.Link>
                    <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                    <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default MainNavigation;