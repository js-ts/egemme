import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import ReactStarRating from "react-star-ratings-component";
import ReactMarkdown from "react-markdown";
import Rating from '../components/Rating'
import YouTubePlayer from '../components/ytframe/YouTubePlayer'
import { Grid } from "@material-ui/core";
import Message from '../components/Message'
import LoadingProducts from '../components/LoadingProducts'
import Meta from '../components/Meta'
import {
    listPostDetails,
    createPostReview,
} from '../actions/postActions'
import { POST_CREATE_REVIEW_RESET } from '../constants/postConstants'
import {useTheme} from 'css-vars-hook';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import Iframe from 'react-iframe'
import './postyle.css'
const useStyles = makeStyles({
    root: {
      width: 250
    },
    input: {
      width: 42
    }
  });
  
  const theme = {Zoom: 0.5};

const PostScreen = ({ history, match }) => {

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const postDetails = useSelector((state) => state.postDetails)
    const { loading, error, post } = postDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const postReviewCreate = useSelector((state) => state.postReviewCreate)
    const {
        success: successPostReview,
        error: errorPostReview,
    } = postReviewCreate
  const {setRef, setVariable} = useTheme(theme);
  const [inputValue, setInputValue] = useState(theme.Zoom);
  const livep = "http://localhost:4000/gist/ce75d1dbca7435979529b011fd826df0"
  const classes = useStyles();
  const [value, setValue] = React.useState(theme.Zoom);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

    useEffect(() => {
        setInputValue(inputValue);
        if (successPostReview) {
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: POST_CREATE_REVIEW_RESET })
        }
        dispatch(listPostDetails(match.params.id))
    }, [dispatch, match, successPostReview,inputValue])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createPostReview(match.params.id, {
                rating,
                comment,
            })
        )
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                <i className="fas fa-long-arrow-alt-left fa-5x"></i>
            </Link>
            {loading ? (
                <LoadingProducts />

            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                        <>
                            <Meta title={post.title} />
                            <Col>
<div  className="demo-color" ref={setRef}>

                            <fieldset>

{livep !== "" ?
  <div>
    <div id="outerdiv">
      <Iframe url={livep}

        className="innerIframe"

        display="initial"
        position="absolute"
        scrolling="yes" />

    </div>
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Zoom
</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value*0.01}
            margin="dense"
            onChange={handleInputChange}

            inputProps={{
              step: 10,
              min: 0,
              max: 1,
              type: "number",
              "aria-labelledby": "input-slider"
            }}
          />
          <button
  onClick={() => {
    setVariable('Zoom', value*0.01);
  }}
  type="button">
  Set
</button>
<p>{value}</p>
        </Grid>
      </Grid>
    </div>
  </div>

  : null
}
</fieldset>
</div>
                                <Col >

                                    <Image src={post.image} alt={post.title} fluid style={{
                                        margin: "auto",
                                        display: "block"
                                    }} />
                                </Col>

                                <Col >
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{post.title}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating
                                                value={post.rating}
                                                text={`${post.numReviews} reviews`}
                                            />
                                        </ListGroup.Item>


                                    </ListGroup>

                                    <ListGroup>
                                        <ListGroup.Item>
                                            Description : {post.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                {/* <ListGroup> */}
                                    <Col style={{ borderStyle: "solid" }}>

                                        <ReactMarkdown source={post.markdown} />



                                    </Col>
                                {/* </ListGroup> */}
                                <Col>
                                {post.youTubeId!=='' && <Grid container spacing={2}>

                    <Grid item xs={12}>
                      <YouTubePlayer youtubeId={post.youtubeId} />

                    </Grid>
                  </Grid>}
                                </Col>
                            </Col>
                            <Row>
                                <Col>
                                    <h2>Reviews</h2>
                                    {post.reviews.length === 0 && <Message>No Reviews</Message>}
                                    <ListGroup variant='flush'>
                                        {post.reviews.map((review) => (
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
                                            {errorPostReview && (
                                                <Message variant='danger'>{errorPostReview}</Message>
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
                        </>
                    )}
        </>
    )
}
export default PostScreen 
