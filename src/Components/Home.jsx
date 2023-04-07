import React, {useState, useEffect} from 'react';
import { Container, Row, Col,Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { Card, Form, Image } from 'react-bootstrap';
import { axios } from './Auth/Axios';

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const [text, setText] = useState('');
  

  useEffect(() => {
    getPosts()
  }, [])

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event, postId) => {
    event.preventDefault();
    saveComment(text, postId)
    setText("")
    setTimeout(() => {
      getPosts()
    }, 1000);
  };

  const handleClick = (page) => {
    navigate(page);
  }

  const saveComment = (text, postId) => {
    axios.post(`/posts/${postId}/comments`, {text})
  }

  const formatDateTime = (datetime) => {
    const datetimeArray = datetime.substring(0,datetime.lastIndexOf(":")).split('T')
    return `${datetimeArray[0]} ${datetimeArray[1]}`
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
      <Row className="row-md-8 justify-content-center">
          {posts.map((post) => (
            <Card key={post._id} className="my-3">
              <Card.Header>
                <Row>
                  <Col className="col-md-1" style={{"marginRight": "1rem"}}>
                    <Image style={{width: "100%"}} src={process.env.REACT_APP_API_SERVER_URL + post.user.profileImage} roundedCircle />
                  </Col>
                  <Col>
                    <Card.Text>{post.user.username}</Card.Text>
                    <Card.Text>{formatDateTime(post.createdAt)}</Card.Text>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Card.Text className='rtl'>{post.text}</Card.Text>
              </Card.Body>
              <Card.Footer className="rtl text-muted">
              <Card.Text>{post.comments.length} תגובות</Card.Text>

              {post.comments.map((comment) => (
                <Row key={comment._id}>
                  <hr></hr>
                  <Card.Text>{comment.author.username}</Card.Text>
                  <Card.Text>{comment.text}</Card.Text>
                  <Card.Text> {formatDateTime(comment.createdAt)}</Card.Text>
                </Row>
              )).reverse()}

              <Form onSubmit={(event) => handleSubmit(event, post._id)}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={text}
                    placeholder="כתוב\כיתבי תגובה לפוסט"
                    onChange={handleTextChange}
                  />
                </Form.Group>
                <Button type="submit">הוספת תגובה</Button>
              </Form>
              </Card.Footer>
            </Card>
          ))}
      </Row>
    </Container>
  );
  
  async function getPosts(){
    const posts = await axios.get(`/posts`).then(posts => posts).catch(err => {
      return false
    })

    if(!posts.data)
        return false

    setPosts(posts.data)
  }
};


export { Home };