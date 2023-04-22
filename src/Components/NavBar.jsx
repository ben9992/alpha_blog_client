import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavBar() {
    const userId = localStorage.getItem('userId');
    const handleLogout = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        window.location.href = "/"
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="/">Alpha Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/Login">Login</Nav.Link>
                <Nav.Link href="/Register">Register</Nav.Link>
                <Nav.Link href="/admin-dashboard">Admin</Nav.Link>
                <Nav.Link href="/user-dashboard">My Settings</Nav.Link>
                {userId && <Nav.Link href={`/user/${userId}`}>My Profile</Nav.Link>}

            </Nav>

            <Nav>
                {userId && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
};

export default NavBar;