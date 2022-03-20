import React, { useState, useEffect,useReducer } from 'react'
import { Table, Form, Button, Row, Col,Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import {validationReducer,validationObj,ValidationItems} from '../components/Validate'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import { IconPicker } from "react-fa-icon-picker";
// import { listMyOrders } from '../actions/orderActions'

const UserProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [canda, setCanda] = useState(false)
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch()
  const [ilinkList, setiLinkList] = useState([{ title: "", link: "", thumbnail:"" }]);
  
  const [state, dispatche] = useReducer(validationReducer, validationObj);
  
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails


  console.log(user)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

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

  const handleInputChange = (e, index) => {

    const { name, value } = e.target;
    const list = [...ilinkList];
    list[index][name] = value;
    setiLinkList(list);
  };

  const handleThumbChange = (value,index) =>{
    const list = [...ilinkList];
    console.log(value)
    list[index]['thumbnail'] = value;
    setiLinkList(list);
  }

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...ilinkList];
    list.splice(index, 1);
    setiLinkList(list);
  };
  // handle click event of the Add button
  const handleAddClick = () => {
    setiLinkList([...ilinkList, { title: "", link: "",thumbnail:""}]);
  };

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

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')

    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch({type:USER_UPDATE_PROFILE_RESET})
      } else {
        setName(user.name)
        setEmail(user.email)
        setImage(user.image)
        setDescription(user.description)
      }
    }
  }, [dispatch, history, userInfo, user,success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({id: user._id, name, email, password,image,description}))
    }
  }

  return (
    <FormContainer>
  
      <Col md={12}>
        <h2>User Profile Edit</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
  
        <Image src={image} alt={'Profile image'} fluid style={{
                                        margin: "auto",
                                        display: "block"
                                    }} />

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
            <Form.Label>Password</Form.Label>
            <ValidationItems state={state} />
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={handleChange}
            ></Form.Control>
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

                <Form.Group controlId='description'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                      as="textarea"
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <label
                          htmlFor="inputVacationPercentage"
                          className="switch switch-default"
                        >
                          Add variants{" "}
                        </label>
                        <input
                          id="inputVacationPercentage"
                          type="checkbox"
                          checked={canda}
                          onChange={() => setCanda(!canda)}
                        />

                    {ilinkList.map((x, i) => {
                          return (
                            <div key={i}>
                              { canda &&
                                <div>
                                  <input
                                    name="title"
                                    placeholder="Link Name"
                                    value={x.title}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                  <br />

                                  Icon
                                  <IconPicker value={x.thumbnail} onChange={(value) => handleThumbChange(value, i)} />
                                  <br/>
                                  <input
                                   name="link"
                                    placeholder="Link"
                                    value={x.link}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />

                                  <br />
                                </div>}

                              <div className="btn-box">
                                {ilinkList.length !== 1 && (
                                  <button className="mr10" onClick={() => handleRemoveClick(i)}>X</button>
                                )}
                                {ilinkList.length - 1 === i && (
                                  <button onClick={handleAddClick}>+</button>
                                )}
                              </div>

                            </div>
                          );
                        })}      
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      
  </FormContainer>
  )
}

export default UserProfileScreen;
