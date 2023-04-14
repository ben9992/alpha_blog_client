import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { IsUserLoggedIn } from "../Auth/Auth";
import { axios, updateToken } from '../Auth/Axios';
import { PostsList } from '../Posts/PostsList';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const isUserFound = IsUserLoggedIn()
    if(!isUserFound)
      return navigate('/login');

    const token = localStorage.getItem('token');
    updateToken(token)
    const getUser = async() => {
      const user = await axios.get(`/users/${userId}`).then(user => user).catch(err => {
        return false
      })
  
      if(!user.data)
          return false
  
      setUser(user.data)
    }
    getUser()
  }, [])


  return !user ? (<></>) : (
    <Container>
      <Row className="row-md-8 justify-content-center">
        <Col>
          <Row className="row-md-8 justify-content-center">
            <Image style={{width: "20%"}} src={process.env.REACT_APP_API_SERVER_URL + user.profileImage} roundedCircle />
          </Row>
          <Row className="row-md-8 justify-content-center text-center">
            <h1>{user.username}</h1>
          </Row>
        </Col>
          
          
      </Row>
      <Row className="row-md-8 justify-content-center">
        <PostsList userId={userId}/>
      </Row>
    </Container>
  );
};

export default UserProfile;