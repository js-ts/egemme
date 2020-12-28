import React, { useState, useEffect } from 'react'
//import MovieList from './MovieList';
import ReactImageZoom from 'react-image-zoom';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { ModalLink } from "react-router-modal-gallery";
import Rating from '../components/Rating'
import Message from '../components/Message'
import Meta from '../components/Meta'
import './ModalProduct.css'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
// import { getsProductById, getAllsProducts } from './ProductScreen';

import styled from 'styled-components';
import { useParams } from "react-router";
import PropTypes from 'prop-types';
// import ModalCompoment from './frontend/src/components/ModalCompoment';

const Root = styled.div`
  padding: 12px;
`;
const ModalProduct = ({
   history, match 
}) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  // const clickRef = useRef(null);
  // useEffect(() => {
  //   clickRef.current.click();
  // }, []);

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate
  

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }    
  let { pid } = useParams();
    // console.log(id)
    console.log(pid)
    const getsProductById = (productId) => {
        const allsProducts = product.sProducts;
        console.log(allsProducts)
 
         return allsProducts.find(product => product._id ===productId);
};

  const sproduct = getsProductById(pid)
  console.log(sproduct)
  const [currId, setId] = useState(sproduct._id);

  // const ModalProducts = sproduct;

  const otherProducts = product.sProducts.filter(
    product => product._id !== pid
  );

  {
    /*display: "flex",
    justifyContent: "center",
    alignItems: "center"*/
  }
  const [currImg, setImg] = useState(sproduct.image);


  const props = {
    width: 200,
    height: 200,
    zoomWidth: 350,
    zoomPosition: 'right',
    img: currImg
  };

  function changeImage(i) {
    setImg(i);
  }
  function changeProduct(i) {
    setId(i);
  }
  return (
    <Root>
      {/* <Row> */}
     
        {/* <div className="productreview">
          */}

          {/* <div> */}
          <Row>

          <Col md={3}>
      <div id="box">
              <ReactImageZoom {...props} />
            </div>
            </Col>
          {/* <div className="center">
          <Meta title={product.name} />
          </div>
            <div className="center3">
              <p>Price: {product.price}</p>
            </div>
            <div className="center1">
              <span className="dot"></span>
              <p>
                Color:
                <br />
                {sproduct.color}
              </p>
            </div>
            <div className="center2">
              <p> Size:64GB </p>
            </div> */}
            <Col  md={3}>
        

            
                <ListGroup.Item> <Col> {sproduct.name} </Col></ListGroup.Item>
                <ListGroup.Item>
                  <Col>Size:64GB</Col></ListGroup.Item>
                  <ListGroup.Item>
                  <Col> Color:
                <br />
                {sproduct.color}</Col></ListGroup.Item>
                <ListGroup.Item><Col>Price: {sproduct.price}</Col> </ListGroup.Item>
                
            </Col>
            <Col md={3}>
                  <ListGroup.Item>
                  <Col>Status :  
                  <br/>
                  {sproduct.countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                  </ListGroup.Item>
                
                 
 
 {sproduct.countInStock > 0 && (
   <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            >
                            {[...Array(sproduct.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                              )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    
                    )}
                    
                    </Col>
         
            {/* <img style={{"height" : "300px", "width" : "250px"}} src={'https://m.media-amazon.com/images/I/81mxun+6pEL.jpg'}/> */}
      </Row>

          {/* </div> */}
          <div id="main">
            {/* {sproduct.ThumbArray.map(img => (
              <div
              key={sproduct.ThumbArray.indexOf(img)}
              onClick={() => {
                changeImage(img);
              }}
              >
              <img src={img} style={{ height: '4vh', width: '4vw' }} />
              <li key={product.ThumbArray.indexOf(img)}>
              <img src={img} />
              </li>
              </div>
            ))} */}
          </div>
        {/* </div> */}

        {/* <div id="main1">
          <MovieList movies={otherMovies} />
        </div> */}
      <Row>
        <div id="main1">
          {otherProducts.map(products => (
            <div key={products.id}>
              <ModalLink to={`/product/${sproduct._id}/${products._id}`}>
                <div
                  className="cell"
                  onClick={() => {
                    changeImage(products.image);
                    changeProduct(products._id); 
                  }}
                  >
                  <img src={products.image} />{' '}
                  <p>
                    {' '}
                    {products.name}
                    <br />
                    Price:{products.price}
                  </p>
                </div>
              </ModalLink>
            </div>
          ))}
        </div>
        </Row>
          {/* </Row> */}

      {/* <Typography variant="h6">{product.title}</Typography>
      <img src={product.image}/>
      <ModalLink to={`/collections/${collection.id}`} style={{ fontSize: 14 }}>

        {collection.name}
      </ModalLink>
      <hr />
      <p>Other movies by {collection.name}:</p>
      <MovieList movies={otherMovies} /> */}
    </Root>
  );
};

// ModalProduct.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       pid: PropTypes.string
//     })
//   }).isRequired
// };

export default ModalProduct;

////Old Code

// import React from 'react';
// import MovieList from './MovieList';
// import Dropdown from './Dropdown';
// import ReactImageZoom from 'react-image-zoom';

// import { getcollectionByMovieId, getMovieById } from '../data';
// import { ModalLink } from '../../../src';
// import styled from 'styled-components';
// import { Typography } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import './Movie.css';

// const Root = styled.div`
//   padding: 12px;
// `;

// const Movie = ({
//   match: {
//     params: { id }
//   }
// }) => {
//   const product = getMovieById(id);

//   const collection = getcollectionByMovieId(id);

//   const otherMovies = collection.movies.filter(product => product.id !== id);
//   {
//     /*display: "flex",
//     justifyContent: "center",
//     alignItems: "center"*/
//   }
//   const props = {
//     width: 200,
//     height: 300,
//     zoomWidth: 350,
//     zoomPosition: 'right',
//     img: product.image
//   };

//   return (
//     <Root>
//       <div>
//         <div className="center">
//           <span>{product.title}</span>
//         </div>

//         <div>
//           <div className="center3">
//             <p>Price: {product.price}</p>
//           </div>
//           <div className="center1">
//             <span className="dot"></span>
//             <p>
//               Color:
//               <br />
//               {product.color}
//             </p>
//           </div>
//           <div className="center2">
//             <p> Size:64GB </p>
//           </div>

//           <select id="qty">
//             <option value="Qty: 1">Qty: 1</option>
//             <option value="Qty: 2">Qty: 2</option>
//             <option value="Qty: 3">Qty: 3</option>
//             <option value="Qty: 4">Qty: 4</option>
//           </select>

//           <div id="box">
//             <ReactImageZoom {...props} />
//           </div>
//           {/* <img style={{"height" : "300px", "width" : "250px"}} src={'https://m.media-amazon.com/images/I/81mxun+6pEL.jpg'}/> */}
//         </div>
//         <div id="main">
//           <div>
//             <img src="https://m.media-amazon.com/images/I/41Q0PRqeavL._SS40_.jpg" />
//           </div>
//           <div>
//             <img src="https://m.media-amazon.com/images/I/4131ycq4QDL._SS40_.jpg" />
//           </div>
//           <div>
//             <img src="https://m.media-amazon.com/images/I/31BFm30Q93L._SS40_.jpg" />
//           </div>
//           <div>
//             <img src="https://m.media-amazon.com/images/I/41AisChzPDL._SS40_.jpg" />
//           </div>
//           <div>
//             <img src="https://m.media-amazon.com/images/I/31C+yq94rSL._SS40_.jpg" />
//           </div>
//         </div>
//         <div id="main1">
//           <MovieList movies={otherMovies} />
//         </div>
//       </div>

//       {/* <Typography variant="h6">{product.title}</Typography>
//       <img src={product.image}/>
//       <ModalLink to={`/collections/${collection.id}`} style={{ fontSize: 14 }}>

//         {collection.name}
//       </ModalLink>
//       <hr />
//       <p>Other movies by {collection.name}:</p>
//       <MovieList movies={otherMovies} /> */}
//     </Root>
//   );
// };

// Movie.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string
//     })
//   }).isRequired
// };

// export default Movie;
