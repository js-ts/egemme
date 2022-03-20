import React, { useState, useEffect } from 'react'
//import MovieList from './MovieList';
import ReactImageZoom from 'react-image-zoom';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactStarRating from "react-star-ratings-component";
import ReactStars from "react-rating-stars-component";
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import useImageSize from '../components/ImgSize'
import { ModalLink } from "react-router-modal-gallery";
import Rating from '../components/Rating'
import Message from '../components/Message'
import ImageHotspots from 'react-image-hotspots'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Meta from '../components/Meta'
import './ModalProduct.css'
import YouTubePlayer from '../components/ytframe/YouTubePlayer'
import { Grid } from "@material-ui/core";
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

  let parray: any = [];
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any[]) => {

    for (var i in data) {
      if (data[i] !== false) {
        parray.push(`${[data[i]]}`);
      }      
      
      console.log(parray[0].replace(/false,/g, "").replace(/false/g, "").replace(/,/g, "?qty=1&").slice(0, -1))
      if(parray[0].replace(/false,/g, "").replace(/false/g, "").slice(0, -1).split(',').length<product.sProducts.length){
      history.push('/cart/' + parray[0].replace(/false,/g, "").replace(/false/g, "").replace(/,/g, "?qty=1&").slice(0, -1))}
      else{
        buyAllHandler()
      }

    }
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
  const getsProductById = (productId: string) => {
    const allsProducts = product.sProducts;
    console.log(allsProducts)

    return allsProducts.find(product => product._id === productId);
  };
  const [currId, setId] = useState(pid);
  const [clickId, setClickid] = useState()
  const sproduct = getsProductById(currId)

  console.log(sproduct)
  function mChange(products) {
    changeImage(products.image[0]['images']);
    changeProduct(products._id);
    setClickid(products._id)
  }

  // const ModalProducts = sproduct;

  const otherProducts = product.sProducts.filter(
    product => product._id !== clickId
    //pid
  );







  console.log(otherProducts)
  {
    /*display: "flex",
    justifyContent: "center",
    alignItems: "center"*/
  }
  const [currImg, setImg] = useState(sproduct.image[0]['images']);
  const [width, height] = useImageSize(sproduct.image[0]['images']);


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
  const addToCartHandler = () => {
    history.push(`/cart/${sproduct._id}?qty=${qty}`)
  }
  const buyAllHandler = () => {
    let allps = []
    console.log(product.sProducts)
    for (let i=0;i<product.sProducts.length;i++) {
      allps.push(product.sProducts[i]._id)
    }
    console.log(('/cart/' + allps.join('?qty=1&').slice(0, -1)))
    history.push('/cart/' + allps.join('?qty=1&')+'?qty=1')
  }
  return (
    <Root>
      <Row>

        {/* <div className="productreview">
          */}

        {/* <div> */}
        <Col>
          <Row>
            <Col md={6}>
              <TransformWrapper
                defaultScale={1}
              >
                <TransformComponent>
                  <div id="Pinch">

                    <ImageHotspots
                      src={currImg}
                      alt='Sample image'

                      hideFullscreenControl={true}
                      hideZoomControls={true}
                      hideMinimap={true}
                    />

                  </div>
                </TransformComponent>
              </TransformWrapper>
              {/* <div id="box">
                <ReactImageZoom {...props} />
              </div> */}
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
            <Col md={3}>



              <ListGroup.Item> <Col> {sproduct.name} </Col></ListGroup.Item>
              {/* <ListGroup.Item>
                <Col>Size:64GB</Col></ListGroup.Item>
              <ListGroup.Item>
                <Col> Color:
                <br />
                  {sproduct.color}</Col></ListGroup.Item> */}
              <ListGroup.Item><Col>Price: {sproduct.price}</Col> </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={sproduct.rating}
                  text={`${sproduct.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Status :
                  <br />
                  {sproduct.countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
              </ListGroup.Item>



              {sproduct.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <br />
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
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Button
                        type='button'
                        className='btn-block'
                        disabled={!product.iscollection || product.countInStock === 0}
                        onClick={buyAllHandler}
                      >
                        Buy All
                        </Button>
                    </ListGroup.Item>
                </ListGroup.Item>

              )}

            </Col>
            {/* <Col md={3}>
              <ListGroup.Item>
                <Col>Status :
                  <br />
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
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                </Button>
                  </ListGroup.Item>
                </ListGroup.Item>

              )}


            </Col> */}
            <Col md={3}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {product.sProducts.map((data, i: number) => <li key={data._id}>
                  <Row>










                    <ModalLink to={`${product._id}/${data._id}`} >
                      <Col>
                        <Row>
                          <div
                            id="cell"
                            onClick={() => mChange(data)}
                          >
                            <Row>
                              <div className="thumbimage">

                                <img src={data.image[0]['images']} />

                              </div>
                              <div>

                                {' '}
                                {data.name}
                                <br />
                            Price:{data.price}
                                <Rating
                                  value={data.rating} />
                              </div>


                            </Row>
                          </div>
                        </Row>
                      </Col>

                    </ModalLink>
                    <Col>
                      <input
                        type="checkbox"
                        value={data._id}
                        name={"available." + i}
                        ref={register}
                      />
                    </Col>

                  </Row>
                </li>)}
                <input type="submit" value="add these" />

              </form>
            </Col>






          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <ReactStarRating
                          numberOfStar={5}
                          numberOfSelectedStar={rating}
                          colorFilledStar="gold"
                          colorEmptyStar="black"
                          starSize="5vw"
                          spaceBetweenStar="1vw"
                          disableOnSelect={false}
                          onSelectStar={(val: number) => {
                            setRating(val);
                          }}
                        />
                        <ReactStars
                              size={50}
                              isHalf={true}
                              halfIcon={<i className="fa fa-star-half-alt" />}
                              a11y={false}
                              value={3.5}
                              onChange={(val: number) => {
                                setRating(val);
                              }}
                              />
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a review{' '}
                      </Message>
                    )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            {product.youTubeId !== '' &&
              <Grid container spacing={1}>

                <Grid item xs={12}>
                  <YouTubePlayer youtubeId={sproduct.youtubeId} />

                </Grid>
              </Grid>}

          </Row>
        </Col>


        {/* <img style={{"height" : "300px", "width" : "250px"}} src={'https://m.media-amazon.com/images/I/81mxun+6pEL.jpg'}/> */}


      </Row>

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


export default ModalProduct;


