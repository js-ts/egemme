import React from "react";
import { Card } from "react-bootstrap";
import Loader from "react-skeleton-splash";

const LoadingProduct = () => {
  return (
    <Card className="my-3 p-3 rounded">
      <Loader style={{ height: "10vh", width: "10vw" }} />
      <Card.Body>
        <Card.Title as="div">
          <div className="container-fluid">
            <Loader style={{ height: "1vh", width: "10vw" }} />
            <Loader style={{ height: "1vh", width: "6vw" }} />
          </div>
        </Card.Title>

        <Card.Text as="div">
          <div className="my-3">
            <div className="container-fluid">
              <Loader style={{ height: "2vh", width: "10vw" }} />
            </div>
          </div>
        </Card.Text>
        <Card.Text>
          <Loader style={{ height: "2vh", width: "10vw" }} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LoadingProduct;
