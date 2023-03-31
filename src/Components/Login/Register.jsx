import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { axios, updateToken } from '../Auth/Axios';
function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      if(!email || !username || !password)
        return setError('One of the fields is empty.');
      if(password !== confirmPassword)
        return setError('Passwords does not match');

      const response = await axios.post(`/users/register`, {
        username,
        password,
        email
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);

      // Set up a default authorization header for all requests
      updateToken(response.data.token)

      // Redirect the user to the homepage or dashboard
      navigate("/")
    } catch (error) {
      setError('Username or Email already taken.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2>Register</h2>
          <Form onSubmit={(e) => e.preventDefault()}>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup>
              <Label for="username">Username:</Label>
              <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password:</Label>
              <Input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </FormGroup>
            <Button color="primary" onClick={handleRegister}>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export { Register };