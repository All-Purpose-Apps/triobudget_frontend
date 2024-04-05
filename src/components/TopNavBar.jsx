// create a basic navigation bar using Bootstrap@latest
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';



export default function TopNavBar({ handleSignOut }) {
    const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">TrioBudget</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                        {isLoggedIn && <Nav.Link as={Link} to="/test">Transactions</Nav.Link>}
                        {isLoggedIn && <Button variant="primary" size="sm" className="m-2" onClick={handleSignOut}>Sign Out</Button>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}