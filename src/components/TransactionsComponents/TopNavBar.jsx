// create a basic navigation bar using Bootstrap@latest
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function TopNavBar({ handleSignOut }) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">TrioBudget</Navbar.Brand>
                <Nav.Link onClick={handleSignOut}>SignOut</Nav.Link>
            </Container>
        </Navbar>
    );
}