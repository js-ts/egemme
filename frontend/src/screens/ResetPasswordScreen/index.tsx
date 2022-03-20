import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import axios from 'axios';

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const history = useHistory();
  const location = useLocation();
  const token = location.search.split('=')[1];

  useEffect(() => {
    if (!token) {
      history.push('/');
    }
  });

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
      setLoading(true);
      e.preventDefault();
      axios
        .post('api/password/reset', {
          token,
          password,
          confirm_password: confirmPassword,
        })
        .then((response) => {
          setSuccess(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.response.data.message);
          setLoading(false);
        });
    },
    [token, confirmPassword, password]
  );

  return (
    <FormContainer>
      <h1>Reset your password</h1>
      <Form onSubmit={submitHandler}>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">{success}</Message>}
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Reset password
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          <Link to={'/login'}>Come back</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default ResetPasswordScreen;
