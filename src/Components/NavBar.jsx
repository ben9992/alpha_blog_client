import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Image, Col } from "react-bootstrap";
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
		<Navbar
			style={{ direction: "rtl" }}
			expand="lg"
			className="sticky-top navbar-custom"
		>
			<Navbar.Brand href="/">
				<Container>
					<Image className="logo" src={logo} /> Alpha Blog
				</Container>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav>
					<Nav.Link className="nav-text-custom" href="/Login">
						התחברות
					</Nav.Link>
					<Nav.Link className="nav-text-custom" href="/Register">
						הרשמה
					</Nav.Link>
					<Nav.Link className="nav-text-custom" href="/PrivacyPolicy">
						פרטיות
					</Nav.Link>
					<Nav.Link className="nav-text-custom" href="/Community">
						קהילה
					</Nav.Link>
					<Nav.Link className="nav-text-custom pro" href="/UpgradePro">
						שדרוג לפרו
					</Nav.Link>
					<Nav.Link className="nav-text-custom" href="/Terms">
						תנאי שימוש
					</Nav.Link>
					{isAdminLoggedIn && <Nav.Link href="/admin-dashboard">מנהל</Nav.Link>}
					<Nav.Link className="nav-text-custom" href="/user-dashboard">
						ההגדרות שלי
					</Nav.Link>
					{userId && (
						<Nav.Link className="nav-text-custom" href={`/user/${userId}`}>
							הבלוג של {user ? user.username + "" : ""}
						</Nav.Link>
					)}

					<Nav.Link className="nav-text-custom" href="/">
						אלפא בלוג
					</Nav.Link>
				</Nav>

				<Nav>
					{userId && (
						<Nav.Link className="nav-text-custom logout" onClick={handleLogout}>
							התנתקות
						</Nav.Link>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default NavBar;
