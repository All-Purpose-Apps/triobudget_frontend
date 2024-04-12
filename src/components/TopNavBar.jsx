// create a basic navigation bar using Bootstrap@latest
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function TopNavBar() {
    const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">TrioBudget</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!isLoggedIn && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                        {!isLoggedIn && <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>}
                        {isLoggedIn && <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}