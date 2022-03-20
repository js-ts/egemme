import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';

import axios from 'axios';

import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(false);
  const [ errors, setErrors ] = useState({})
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const history = useHistory();
  const userLogin = useSelector((store: RootStore) => store.userLogin);

  
  const setEmailField = (value) => {
    setEmail(value)
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors['email'] ) setErrors({
      ...errors,
      ['email']: null
    })
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
    // if ( !password || password === '' ) newErrors.password = 'cannot be blank!'
    // else if ( comment.length > 100 ) newErrors.comment = 'comment is too long!'

    return newErrors
  }
  useEffect(() => {
    if (userLogin.userInfo) {
      history.push('/');
    }
  }, [history, userLogin.userInfo]);

  // use effect to clear a message when a register is done
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const newErrors = findFormErrors()
      // Conditional logic:
      if ( Object.keys(newErrors).length > 0 ) {
        // We got errors!
        setErrors(newErrors)
      }
      else{
      setLoading(true);
      e.preventDefault();
      axios
        .post('api/password/forgot-password', {
          email,
        })
        .then((response) => {
          setSuccess(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.response.data.message);
          setLoading(false);
        });
    }},
    [email]
  );

  return (
    <FormContainer>
      <h1>Forgot my password</h1>
      <Form onSubmit={submitHandler}>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">{success}</Message>}

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmailField(e.target.value)}
          ></Form.Control>
           <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">
          Send email
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          <Link to={'/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default ForgotPasswordScreen;
