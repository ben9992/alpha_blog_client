import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { PostsList } from './Posts/PostsList';
import { Image } from 'react-bootstrap';
import logo from 'public/logo.jpeg'
const Home = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Image style={{width: "20%", padding: "1rem"}} src={logo} />
        </Col>
      </Row>
      <Row className="row-md-8 justify-content-center">
        <PostsList/>
      </Row>
    </Container>
  );
};

export { Home };