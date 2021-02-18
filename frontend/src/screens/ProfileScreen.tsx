import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { listPosts } from '../actions/postActions'
import { getUserDetails} from '../actions/userActions'
import Posts from '../components/Posts'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postList = useSelector((state) => state.postList)
  const { ploading, perror, posts } = postList
  

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setImage(user.image)
        setDescription(user.description)
        dispatch(listPosts(''))
      }
    }
  }, [dispatch, history, userInfo, user])


  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
               {loading && <Loader />}
        <img src={image} style={{width:'20vw',height:"20vw"}}/>
        <Form>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
            //   onChange={(e) => setName(e.target.value)}
              readOnly 
            ></Form.Control>
          </Form.Group>
       <Form.Group controlId='description'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                      as="textarea"
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        // onChange={(e) => setDescription(e.target.value)}
                        readOnly 
                      ></Form.Control>
                    </Form.Group>      
         </Form>
      </Col>
      <Col md={9}>
{  console.log(posts)}
      
           <>
          <Row>
            {ploading ? (
        <Loader />
      ) : perror ? (
        <Message variant='danger'>{error}</Message>
      ) :(posts.map((post) => (
              <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
                <Posts post={post} />
              </Col>
            )))}
          </Row>
        </>
       
      </Col>
    </Row>
  )
}

export default ProfileScreen
