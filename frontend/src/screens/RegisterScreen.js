import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
// import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
// import LockIcon from '@material-ui/icons/Lock';
// import '../components/password-strength/index.scss';
// import NiceInputPassword from '../components/password-strength/NiceInputPassword';
const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }
  const levelBarCss = level => ({
    height: '8px',
    width: level > 0 ? `${((100 / 4) * level)}%` : '100%',
    marginTop: 16,
    transition: 'width 0.5s ease',
    backgroundColor: ['#EFEFEF', 'red', 'orange', 'yellow', 'green'][level],
    borderRadius: 0,
  });
  
  const CustomLevelBar = levels => <div style={levelBarCss(levels)} />;
  const securityLevels = [
    {
      descriptionLabel: <Typography>1 number</Typography>,
      validator: /.*[0-9].*/,
    },
    {
      descriptionLabel: <Typography>1 lowercase letter</Typography>,
      validator: /.*[a-z].*/,
    },
    {
      descriptionLabel: <Typography>1 uppercase letter</Typography>,
      validator: /.*[A-Z].*/,
    },
    {
      descriptionLabel: <Typography>8 of length</Typography>,
      validator: /^.{8,}$/,
    },
  ];

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

      
        <Form.Group controlId='password'>
        <div className="wrap">
            <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
      {/* <NiceInputPassword
         label="Password"
         name="password"
         showSecurityLevelBar
         showSecurityLevelDescription
         securityLevels={securityLevels}
         value={password}
         onChange={(e) => setPassword(e.target.value)}
       /> */}
     </div>
        </Form.Group>
        
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
