import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { Card, Form, Image } from 'react-bootstrap';
import { axios } from '../Auth/Axios';
import { IsUserLoggedIn } from '../Auth/Auth';
import NewPost from './NewPost';

const PostsList = (props) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const [commentText, setCommentText] = useState('');
  const isUserFound = IsUserLoggedIn()
  useEffect(() => {
    getPosts()
  }, [])

  const handleTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event, postId) => {
    event.preventDefault();
    setCommentText("")
    saveComment(commentText, postId).then(() => {
      getPosts()
    })
  };

  const saveComment = (text, postId) => {
    return axios.post(`/posts/${postId}/comments`, {text})
  }

  const formatDateTime = (datetime) => {
    const datetimeArray = datetime.substring(0,datetime.lastIndexOf(":")).split('T')
    return `${datetimeArray[0]} ${datetimeArray[1]}`
  }

  const handleImageClick = (userId) => {
    navigate(`/user/${userId}`);
  }
  const handleModalClose = () => {
    getPosts()
  }

  return (
    <>
     <NewPost onClose={handleModalClose}/>
          {posts.map((post) => (
            <div style={{padding: "1rem" }}>
              <Card key={post._id} className="my-3">
                <Card.Header>
                  <Row className='clickable' onClick={() => {handleImageClick(post.user._id)}}>
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

                { isUserFound && <Form onSubmit={(event) => handleSubmit(event, post._id)}>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={commentText}
                      placeholder="כתוב\כיתבי תגובה לפוסט"
                      onChange={handleTextChange}
                    />
                  </Form.Group>
                  <Button style={{margin: "1rem" }} type="submit">הוספת תגובה</Button>
                </Form> }
                </Card.Footer>
              </Card>
            </div>
          ))}
    </>
  );
  
  async function getPosts(){
    const res = await axios.get(`/posts`).then(posts => posts).catch(err => {
      return false
    })
    let posts = res.data
    if(!posts)
        return false

    if(props.userId)
      posts = posts.filter(post => post.user._id === props.userId);

    setPosts(posts)
  }
};


export { PostsList };