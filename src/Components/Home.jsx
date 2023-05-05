import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { PostsList } from './Posts/PostsList';
const Home = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
        </Col>
      </Row>
      <Row className="row-md-8 justify-content-center">
        <PostsList/>
      </Row>
    </Container>
  );
};

export { Home };