import React from "react";
// import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import Loader from "react-skeleton-splash";
// import Rating from "../components/Rating";

const LoadingProducts = () => {
  return (
    <>
      <Row>
        <Col md={6}>
          <Loader style={{ height: "50vh", width: "40vw" }} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Loader style={{ height: "1vh", width: "5vw" }} />
            </ListGroup.Item>
            <ListGroup.Item>
              <Loader style={{ height: "1vh", width: "5vw" }} />
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <Loader style={{ height: "1vh", width: "5vw" }} />
                </Col>
                <Col>
                  <Loader style={{ height: "1vh", width: "5vw" }} />
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status :</Col>
                <Col>
                  <Loader style={{ height: "1vh", width: "5vw" }} />
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Loader style={{ height: "1vh", width: "5vw" }} />
            </ListGroup.Item>
          </ListGroup>

          <ListGroup>
            <ListGroup.Item>
              {" "}
              <Loader style={{ height: "1vh", width: "5vw" }} />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Loader style={{ height: "1vh", width: "5vw" }} />
                <Col>
                  <Loader style={{ height: "1vh", width: "5vw" }} />
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default LoadingProducts;
