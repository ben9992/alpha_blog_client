import React from 'react';
import { Container, Row, Col } from 'reactstrap';


const AdminDashboard = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2>Admin Dashboard</h2>
        </Col>
      </Row>
    </Container>
    )
};

export { AdminDashboard };