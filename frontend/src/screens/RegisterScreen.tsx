import React, { useState, useEffect, useReducer } from 'react'
import './passwordValidation.css'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { register } from '../actions/userActions'
// import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import Typography from '@material-ui/core/Typography';
// import LockIcon from '@material-ui/icons/Lock';
// import '../components/password-strength/index.scss';
// import NiceInputPassword from '../components/password-strength/NiceInputPassword';

const validationNames = [
  { id: 'lowercase', name: 'Lower-case' },
  { id: 'uppercase', name: 'Upper-case' },
  { id: 'number', name: 'Number' },
  { id: 'minChar', name: 'More than 8 characters' },
];

const validationObj = {
  lowercase: false,
  uppercase: false,
  number: false,
  minChar: false,
};

const validationReducer = (state, action) => {
  switch (action.type) {
    case 'lowercase':
      return { ...state, lowercase: action.payload };
    case 'uppercase':
      return { ...state, uppercase: action.payload };
    case 'number':
      return { ...state, number: action.payload };
    case 'minChar':
      return { ...state, minChar: action.payload };
    default:
      return state;
  }
};


const ValidationIcon = ({ isDone }) => {
  return isDone ? (
    <svg width="14" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline
        className="check"
        points="1,7 5,11 13,1"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2px"
        strokeLinecap="round"
      />
    </svg>
  ) : (
      <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6A6 6 0 110 6a6 6 0 0112 0z" fill="#5B9A78" />
      </svg>
    );
};

const ValidationItems = ({ state }) => (
  <ul className="validation-box">
    {validationNames.map((item) => (
      <li
        className={
          state[item.id] === true ? `done validation-item` : 'validation-item'
        }
        key={item.id}>
        <span className="validation-icon">
          <ValidationIcon isDone={state[item.id]} />
        </span>
        {item.name}
      </li>
    ))}
  </ul>
);

const FormField = ({ handleChange }) => {
  return (
    <div className="form-field">
      <input
        className="form-input"
        id="password"
        type="password"
        onChange={handleChange}
      />
    </div>
  );
};






const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState(null)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const [state, dispatche] = useReducer(validationReducer, validationObj);

  console.log(description)

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

    const isAllGood =
      checkLength && checkUpperCase && checkLowerCase && checkNumber;

    return isAllGood;
  };


  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(description)

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password, image, description))
    }
  }

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
          <Form.Label>Confirm Password</Form.Label>
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
