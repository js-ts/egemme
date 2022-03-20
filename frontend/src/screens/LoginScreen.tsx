import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ errors, setErrors ] = useState({})
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const setEmailField = (value) => {
    setEmail(value)
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors['email'] ) setErrors({
      ...errors,
      ['email']: null
    })
  }

  const setPasswordField = (value) => {
    setPassword(value)
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors['password'] ) setErrors({
      ...errors,
      ['password']: null
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      setErrors(newErrors)
    }
    else{
    dispatch(login(email, password))}
  }

  const findFormErrors = () => {
    
    const newErrors = {}
    // name errors
    if ( !email || email === '' ) newErrors.email = 'cannot be blank!'
    // else if ( email.length > 30 ) newErrors.email = 'name is too long!'
    // food errors
    // if ( !food || food === '' ) newErrors.food = 'select a food!'
    // rating errors
    // if ( !rating || rating > 5 || rating < 1 ) newErrors.rating = 'must assign a rating between 1 and 5!'
    // comment errors
    if ( !password || password === '' ) newErrors.password = 'cannot be blank!'
    // else if ( comment.length > 100 ) newErrors.comment = 'comment is too long!'

    return newErrors
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address or Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter email or Username'
            value={email}
            onChange={(e) => setEmailField(e.target.value)}
            isInvalid={ !!errors.email }
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPasswordField(e.target.value)}
            isInvalid={ !!errors.password }
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className="py-2">
        <Col>
          <Link to={'forgot-password'}>Forgot password</Link>
        </Col>
      </Row>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
