import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import logo from "../Images/logo.png";
import { axios } from "./Auth/Axios";
import { IsAdminLoggedIn } from "./Auth/Auth";

function NavBar() {
	const userId = localStorage.getItem("userId");
	const [user, setUser] = useState(null);
	const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
	const handleLogout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	useEffect(() => {
		const isAdminLoggedIn = async () => {
			const res = await IsAdminLoggedIn();
			setIsAdminLoggedIn(res);
		};
		const getUser = async () => {
			const user = await axios
				.get(`/users/${userId}`)
				.then((user) => user)
				.catch((err) => {
					return false;
				});

			if (!user.data) return false;

			setUser(user.data);
		};
		getUser();
		isAdminLoggedIn();
	}, []);

	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
			<Container>
				<Navbar.Brand href="/">
					<Image style={{ width: "12%" }} src={logo} /> Alpha Blog
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/Login">Login</Nav.Link>
						<Nav.Link href="/Register">Register</Nav.Link>
						{isAdminLoggedIn && (
							<Nav.Link href="/admin-dashboard">Admin</Nav.Link>
						)}
						<Nav.Link href="/user-dashboard">My Settings</Nav.Link>
						{userId && (
							<Nav.Link href={`/user/${userId}`}>
								{user ? user.username + "`s " : ""} Profile
							</Nav.Link>
						)}
					</Nav>

					<Nav>
						{userId && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
