import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { Card, Form, Image, Modal } from 'react-bootstrap';
import { axios } from '../Auth/Axios';
import { IsAdminLoggedIn, IsUserLoggedIn } from '../Auth/Auth';
import NewPost from './NewPost';
import { Trash3Fill } from 'react-bootstrap-icons';
import EditPost from './EditPost';
import EditComment from './EditComment';

const PostsList = (props) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const [commentText, setCommentText] = useState('');
  const isUserFound = IsUserLoggedIn()

  const [show, setShow] = useState(false);
  const [confirmType, setConfirmType] = useState("Post");
  const [postId, setPostId] = useState("");
  const [commentId, setCommentId] = useState("");
  const [IsAdminLogIn, setIsAdminLoggedIn] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (event, postId, commentId = "") => {
    event.preventDefault()
    commentId === "" ? setConfirmType("Post") : setConfirmType("Comment")
    setPostId(postId)
    setCommentId(commentId)
    setShow(true);
  }

  IsAdminLoggedIn().then(res => {
    setIsAdminLoggedIn(res)
  })

  const checkUser = (userId) => {
    const currentUserId = localStorage.getItem('userId');
      if(!currentUserId)
        return false
  
      if(IsAdminLogIn)
        return true

      return userId === currentUserId
  }

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

  const handleRemovePost = () => {
    axios.delete(`/posts/${postId}`).then(() => {
      getPosts()
    })
    handleClose()
  }

  const handleRemoveComment = () => {
    axios.delete(`/posts/comments/${postId}/${commentId}`).then(() => {
      getPosts()
    })
    handleClose()
  }

  if (IsAdminLogIn === null) {
    // Render a loading indicator or a placeholder while the data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
     {isUserFound && <NewPost onClose={handleModalClose}/> }
          {posts.map((post) => (
            <div style={{padding: "1rem" }}>
              <Card key={post._id} className="my-3">
                <Card.Header>
                  <Row>
                    <Col onClick={() => {handleImageClick(post.user._id)}} className="clickable col-md-1" style={{"marginRight": "1rem"}}>
                      <Image style={{width: "100%"}} src={process.env.REACT_APP_API_SERVER_URL + post.user.profileImage} roundedCircle />
                    </Col>
                    <Col onClick={() => {handleImageClick(post.user._id)}} className="clickable">
                      <Card.Text>{post.user.username}</Card.Text>
                      <Card.Text>{formatDateTime(post.createdAt)}</Card.Text>
                    </Col>
                    { checkUser(post.user._id) && <Col>
                      <div className='col-md-1' style={{marginLeft: "85%", display: "flex" }}>
                        <Button className="btn btn-light"onClick={(event) => {handleShow(event, post._id)}}><Trash3Fill/></Button>
                        <EditPost postData={post.text} postId={post._id} onClose={handleModalClose}></EditPost>
                      </div>
                    </Col> }
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Card.Text className='rtl'>{post.text}</Card.Text>
                </Card.Body>
                <Card.Footer className="rtl text-muted">
                <Card.Text>{post.comments.length} תגובות
                </Card.Text>
                {post.comments.map((comment) => (
                  <Row key={comment._id}>
                    <hr></hr>
                    <Card.Text>{comment.author.username}</Card.Text>
                    <Card.Text>{comment.text}</Card.Text>
                    <Card.Text> {formatDateTime(comment.createdAt)} { 
                      checkUser(comment.author.id) && 
                      <div style={{marginRight: "85%", display: "flex"}}>
                        <EditComment commentData={comment.text} postId={post._id} commentId={comment._id} onClose={handleModalClose}></EditComment>
                        <Button className="btn btn-light" onClick={(event) => {handleShow(event, post._id, comment._id)}}><Trash3Fill/></Button>
                      </div>
                      }
                    
                    </Card.Text>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-header">?האם ברצונך למחוק {confirmType === "Post" ? "פוסט" : "תגובה"}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            בטל
          </Button>
          <Button className="btn btn-danger" onClick={confirmType === "Post" ? () => {handleRemovePost()} : () => {handleRemoveComment()}}>
            מחק
          </Button>
        </Modal.Footer>
      </Modal>
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