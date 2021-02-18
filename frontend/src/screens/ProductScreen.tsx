import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import ReactStarRating from "react-star-ratings-component";
import './Hotspot.css';
import { ModalLink } from "react-router-modal-gallery";
import { useForm } from 'react-hook-form'
import Rating from '../components/Rating'
import Message from '../components/Message'
import ImageHotspots from 'react-image-hotspots'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import YouTubePlayer from '../components/ytframe/YouTubePlayer'
import { Grid } from "@material-ui/core";
import Iframe from 'react-iframe'
// import Loader from '../components/Loader'
import LoadingProducts from '../components/LoadingProducts'
import Meta from '../components/Meta'
import { addToCart, removeFromCart } from '../actions/cartActions'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
//
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_UPDATE_STOCK_RESET,
} from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')


  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  console.log(useSelector((state) => state.productDetails))
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate

  const checkoutHandler = () => {
    dispatch(addToCart(product._id, qty,true))
    history.push('/login?redirect=shipping')
  }
  const productUpdateStock = useSelector((state) => state.productUpdateStock);
  const { success: successStockUpdate } = productUpdateStock;
  useEffect(() => {
    window.scrollTo(0, 0)
    if (successStockUpdate) {
      dispatch({ type: PRODUCT_UPDATE_STOCK_RESET });
    }

    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))

    console.log(dispatch(listProductDetails(match.params.id)))
  }, [dispatch, match, successProductReview, product._id,
    successStockUpdate,])
  let parray = [];
  const { register, handleSubmit } = useForm();

  console.log(parray)
  const onSubmit = (data) => {

    for (var i in data) {
      if (data[i] !== false) {
        parray.push(`${[data[i]]}`);
      }
      history.push('/cart/' + parray[0].replace(/false,/g, "").replace(/false/g, "").replace(/,/g, "?qty=1&").slice(0, -1))

    }

    //   if(parray["available"]!==undefined){alert('/cart/'+parray["available"].filter(x=>x!==false).join("?qty=1&"))}

    // alert(parray)
    const qs = parray.filter(x => x !== false).join("?qty=1&")
    console.log(qs)

  };
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
  //md
  const arr = [];
  const pricesArr = [];
  const livep = product.livep
  console.log(history)

  if (product.iscollection) {
    product.sProducts.map(data =>
      arr.push({
        x: data.x,
        y: data.y,
        content: (
          <li key={data._id}>

            <ModalLink to={`${product._id}/${data._id}`} >

              <p>
                {' '}
                {data.name}
                <br />
                      Price:{data.price}
              </p>
            </ModalLink>

          </li>
        )
      }))
    // ModalProducts.push(product.sProducts)
    product.sProducts.map(e => pricesArr.push(e.price))
    console.log(pricesArr)
    console.log(product.sProducts)

  }
  console.log(arr)

  return (
    <>
      {/* <Link className='btn btn-light my-3' to='/'>
      <i class="fas fa-long-arrow-alt-left fa-5x"></i>
      </Link> */}
      {loading ? (
        <LoadingProducts />
        // <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Meta title={product.name} />
              <Row>
                <Col md={6}>
                  {product.iscollection ? (<ImageHotspots
                    src={product.image[0]['images']}
                    alt='Sample image'
                    hotspots={arr}
                    hideFullscreenControl={true}
                    hideZoomControls={true}
                    hideMinimap={true}
                  />) : (livep !== "" ?
                    <div id="outerdiv">
                      <Iframe url={livep}
                        id="innerIframe"
                        display="initial"
                        position="absolute"
                        scrolling="no" />
                    </div> :
                    
               <TransformWrapper
               defaultScale={1}
               >
               <TransformComponent> 
               <div style={{ width: '40vw', height: '50vh' }}>

<ImageHotspots
                  src={product.image[0]['images']}
                  alt='Sample image'

                  hideFullscreenControl={true}
                  hideZoomControls={true}
                  hideMinimap={true}
                />
                </div>
                
   </TransformComponent>
   </TransformWrapper>
                   )

                  }
                </Col>

                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price :</Col>
                        <Col>
                          <strong> {product.iscollection ? `$${Math.min(...pricesArr)}-$${pricesArr.reduce((a, b) => a + b, 0)}` : `${product.price}`}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status :</Col>
                        <Col>
                          {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as='select'
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
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
                        disabled={product.iscollection || product.countInStock === 0}
                        onClick={checkoutHandler}
                      >
                        Buy Now
              </Button>
                    </ListGroup.Item>
                  </ListGroup>

                  <ListGroup>
                    <ListGroup.Item>
                      Description : {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                  {/* <ListGroup>
                    <ListGroup.Item>
                      exists : {parray.filter(x => x !== false).join("?qty=1&")}
                    </ListGroup.Item>
                  </ListGroup> */}


                </Col>
                <Col md={3}>
                  {product.iscollection ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      { product.sProducts.map((data, i: number) => <li key={data._id}>
                        <Row>





                          <input
                            type="checkbox"
                            value={data._id}
                            name={"available." + i}
                            ref={register}
                          />





                          <ModalLink to={`${product._id}/${data._id}`} >
                            <Col>
                              <Row>
                                <div className="thumbimg">

                                  <img src={data.image[0]['images']} />

                                </div>
                                <div className="pblack">
                                  <p>
                                    {' '}
                                    {data.name}
                                    <br />
                                    Price:{data.price}
                                    <Rating
                                      value={data.rating}

                                    />

                                  </p>




                                </div>
                              </Row>
                            </Col>

                          </ModalLink>
                          {/* <Form.Control
                              as='select'
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(data.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control> */}
                        </Row>
                      </li>)}
                      <input type="submit" value="add these" />

                    </form>




                  ) : (
                      null
                    )
                  }





                </Col>
              </Row>
              <Col>
                <Row>
                  <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message>No Reviews</Message>}
                    <ListGroup variant='flush'>
                      {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <Row>
                            <Col md={1}>
                              <img style={{
                                display: 'inline-block',
                                width: '3vw',
                                borderRadius: '50%',
                                borderStyle: 'solid 1px black',
                                borderColor: 'black',
                                // padding: '5px'
                              }}
                                src={review.image}
                                alt="user pic"
                              />
                            </Col>
                            <Col>
                              <strong>{review.name}</strong>
                              <Rating value={review.rating} />
                              <p>{review.createdAt.substring(0, 10)}</p>
                              <p>{review.comment}</p>
                            </Col>
                          </Row>
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
                                starSize="5em"
                                spaceBetweenStar="10px"
                                disableOnSelect={false}
                                onSelectStar={(val: number) => {
                                  setRating(val);
                                }}
                              />
                              {/*  ['Poor','Fair','Good','Very Good','Excellent']
                              use to display rating range
                              <Form.Control
                              as='select'
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value=''>Select...</option>
                              <option value='1'>1 - Poor</option>
                              <option value='2'>2 - Fair</option>
                              <option value='3'>3 - Good</option>
                              <option value='4'>4 - Very Good</option>
                              <option value='5'>5 - Excellent</option>
                            </Form.Control> */}
                              {/* <p>{ ['Poor','Fair','Good','Very Good','Excellent'][val-1]}</p> */}
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
                  {product.youTubeId !== '' && <Grid container spacing={2}>

                    <Grid item xs={6}>
                      <YouTubePlayer youtubeId={product.youtubeId} />

                    </Grid>
                  </Grid>}
                </Row>

              </Col>

            </>
          )}
    </>
  )
}


export default ProductScreen 
