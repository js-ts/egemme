import React, { useState, useEffect, useReducer } from 'react'
import '../components/passwordValidation.css'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {validationReducer,validationObj,ValidationItems} from '../components/Validate'
import axios from 'axios'
import { register } from '../actions/userActions'
// import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import Typography from '@material-ui/core/Typography';
// import LockIcon from '@material-ui/icons/Lock';
// import '../components/password-strength/index.scss';
// import NiceInputPassword from '../components/password-strength/NiceInputPassword';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username,setUsername]=useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [ errors, setErrors ] = useState({})
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const [state, dispatche] = useReducer(validationReducer, validationObj);
console.log(description)
  console.log(username)

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  const handleChange = (e) => {
    validate(e.target.value.trim());
    setPassword(e.target.value)
  };

  const validate = (value: string) => {
    const checkLength = value.length >= 8;
    const checkLowerCase = /[a-z|ç|ş|ö|ü|ı|ğ]/u.test(value);
    const checkUpperCase = /[A-Z|Ç|Ş|Ö|Ü|İ|Ğ]/u.test(value);
    const checkNumber = /[0-9]/.test(value);
    const checkSpecialChar = /[^A-Za-z0-9]/.test(value)

    if (checkLength) {
      dispatche({ type: 'minChar', payload: true });
    } else {
      dispatche({ type: 'minChar', payload: false });
    }

    if (checkLowerCase) {
      dispatche({ type: 'lowercase', payload: true });
    } else {
      dispatche({ type: 'lowercase', payload: false });
    }

    if (checkUpperCase) {
      dispatche({ type: 'uppercase', payload: true });
    } else {
      dispatche({ type: 'uppercase', payload: false });
    }

    if (checkNumber) {
      dispatche({ type: 'number', payload: true });
    } else {
      dispatche({ type: 'number', payload: false });
    }

    if (checkSpecialChar) {
      dispatche({ type: 'specialChar', payload: true });
    } else {
      dispatche({ type: 'specialChar', payload: false });
    }

    const isAllGood =
      checkLength && checkUpperCase && checkLowerCase && checkNumber && checkSpecialChar;
    return isAllGood;
  };
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

  const setUsernameField = (value) => {
    setUsername(value)
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors['username'] ) setErrors({
      ...errors,
      ['username']: null
    })
  }

  const setNameField = (value) => {
    setName(value)
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors['name'] ) setErrors({
      ...errors,
      ['name']: null
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
    console.log(username)
    console.log({name, username,email, password, image, description})

    
    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      setErrors(newErrors)
    }
    else{
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      console.log({name, username,email, password, image, description})
      dispatch(register(name, username,email, password, image, description))
    }}
  }

  const findFormErrors = () => {
    
    const newErrors = {}
    // name errors
    if ( !email || email === '' ) newErrors.email = 'cannot be blank!'
    // else if ( email.length > 30 ) newErrors.email = 'name is too long!'
    // food errors
    if ( !username|| username=== '' ) newErrors.username =  'cannot be blank!'
    if ( !name|| name=== '' ) newErrors.name =  'cannot be blank!'

    // rating errors
    // if ( !rating || rating > 5 || rating < 1 ) newErrors.rating = 'must assign a rating between 1 and 5!'
    // comment errors
    if ( !password || password === '' ) newErrors.password = 'cannot be blank!'
    // else if ( comment.length > 100 ) newErrors.comment = 'comment is too long!'

    return newErrors
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name *</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setNameField(e.target.value)}
            isInvalid={ !!errors.name }
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>{ errors.name }</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='username'>
          <Form.Label>Username *</Form.Label>
          <Form.Control
            type='username'
            placeholder='Enter Username'
            value={username}
            onChange={(e) =>setUsernameField(e.target.value)}
            isInvalid={ !!errors.username }
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address *</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmailField(e.target.value)}
            isInvalid={ !!errors.email }
          ></Form.Control>
           <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId='password'>
          <div className="wrap">
            <Form.Group controlId='password'>
              <Form.Label>Password *</Form.Label>
              <ValidationItems state={state} />
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

          </div>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password *</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='image'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter image url'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <Form.File
            id='image-file'
            label='Choose File'
            custom
            onChange={uploadFileHandler}
          ></Form.File>
          {uploading && <Loader />}
        </Form.Group>
        <Form.Group controlId='description'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                       type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
