import React, {useState, useEffect} from 'react';
import { Container, Row, Col,Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { Card } from 'react-bootstrap';
import { axios } from './Auth/Axios';

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  

  useEffect(() => {
    const getPosts = async() => {
      const posts = await axios.get(`/posts`).then(posts => posts).catch(err => {
        return false
      })
  
      if(!posts.data)
          return false
  
      setPosts(posts.data)
    }
    getPosts()
  }, [])
  

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
      <Row>
          {posts.map((post) => (
            <Card key={post.id} className="my-3">
              <Card.Body>
                <Card.Title>
                <Card.Img variant="top"
                  rounded style={{width:"5%"}} src={process.env.REACT_APP_API_SERVER_URL + post.user.profileImage}></Card.Img> {post.user.username}
                </Card.Title>
                <Card.Text>{post.text}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                {post.comments.length} comments
              </Card.Footer>
            </Card>
          ))}
      </Row>
    </Container>
  );
};

export { Home };