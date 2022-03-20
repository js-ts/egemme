import React, { ReactNode } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

interface IFormContainer {
  children: React.ReactNode;
}
const FormContainer = ({ children } : IFormContainer) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
