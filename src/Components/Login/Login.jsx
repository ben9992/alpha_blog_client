import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Alert,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { axios, updateToken } from "../Auth/Axios";
function Login() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async () => {
		try {
			const response = await axios.post(`/users/login`, {
				username,
				password,
			});

			localStorage.setItem("token", response.data.token);
			localStorage.setItem("userId", response.data.userId);

			// Set up a default authorization header for all requests
			updateToken(response.data.token);

			// Redirect the user to the homepage or dashboard
			setTimeout(() => {
				navigate("/");
				window.location.reload();
			}, 200);
		} catch (error) {
			setError("Invalid username or password.");
		}
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Col xs={12} md={8} lg={6}>
					<h2>Login</h2>
					<Form onSubmit={(e) => e.preventDefault()}>
						{error && <Alert color="danger">{error}</Alert>}
						<FormGroup>
							<Label for="username">Username:</Label>
							<Input
								type="text"
								id="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="password">Password:</Label>
							<Input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormGroup>
						<Button color="primary" onClick={handleLogin}>
							Login
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export { Login };
