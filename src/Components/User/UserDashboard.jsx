import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { IsUserLoggedIn } from "../Auth/Auth";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  

    useEffect(() => {
      const isUserFound = IsUserLoggedIn()
      if(!isUserFound)
        return navigate('/login');
    }, [])
    

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2>User Dashboard</h2>
        </Col>
      </Row>
    </Container>
    )
};

export { UserDashboard };