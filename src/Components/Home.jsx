import React from 'react';
import { Container, Row, Col,Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  

  const handleClick = (page) => {
    navigate(page);
  }


  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2>Home</h2>
        </Col>
      </Row>
      <Row>
      <Col xs={12} md={8} lg={6}>
        <Button color="primary" onClick={() => handleClick("/Login")}>Login</Button>
        <Button color="primary" onClick={() => handleClick("/Register")}>Register</Button>
        <Button color="primary" onClick={() => handleClick("/admin-dashboard")}>admin</Button>
        <Button color="primary" onClick={() => handleClick("/user-dashboard")}>user</Button>
        </Col>
      </Row>
    </Container>
  );
};

export { Home };