import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import ReactStarRating from "react-star-ratings-component";
import ReactStars from "react-rating-stars-component";
import ReactMarkdown from "react-markdown";
import Rating from '../components/Rating'
import YouTubePlayer from '../components/ytframe/YouTubePlayer'
import { Grid } from "@material-ui/core";
import Message from '../components/Message'
import LoadingProducts from '../components/LoadingProducts'
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./editor/constants";
import Meta from '../components/Meta'
import {
    listPostDetails,
    createPostReview,
} from '../actions/postActions'
import { POST_CREATE_REVIEW_RESET } from '../constants/postConstants'
import { useTheme } from 'css-vars-hook';
import { makeStyles } from "@material-ui/core/styles";
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

const theme = { Zoom: 0.5, Height: 10, Width: 10 };

const PostScreen = ({ history, match }) => {

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [readOnly, setreadOnly] = useState(true)
    const instanceRef = React.useRef(null);

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
    const { setRef, setVariable } = useTheme(theme);
    const [inputValue, setInputValue] = useState(theme.Zoom);
    const [iHeight, setiHeight] = useState(theme.Height)
    const [iWidth, setiWidth] = useState(theme.Width)
    const livep = "http://localhost:4000/gist/ce75d1dbca7435979529b011fd826df0"
    const classes = useStyles();
    const [value, setValue] = React.useState(theme.Zoom);
    const [hvalue, sethvalue] = React.useState(theme.Height);
    const [wvalue, setwvalue] = React.useState(theme.Width);


    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === "" ? "" : Number(event.target.value));
    };

    const handleHeightSliderChange = (event, newValue) => {
        sethvalue(newValue);};

    const handleHeightInputChange = (event) => {
        sethvalue(event.target.value === "" ? "" : Number(event.target.value));
    };

    const handleWidthSliderChange = (event, newValue) => {
        setwvalue(newValue);
    };
const handleWidthInputChange = (event) => {
        setwvalue(event.target.value === "" ? "" : Number(event.target.value));};
useEffect(() => {
        setInputValue(inputValue);
        setiHeight(iHeight);
        setiWidth(iWidth);
        console.log(theme.Height)
        console.log(theme.Width)
        console.log(setRef)
        if (successPostReview) {
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: POST_CREATE_REVIEW_RESET })
        }
        dispatch(listPostDetails(match.params.id))
    }, [dispatch, match, successPostReview, inputValue, iHeight, iWidth])

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


    {post && delete post._id}
    {console.log(post)}

    return (
        <>
            <Link className='btn btn-light my-3' to='/profile'>
                <i className="fas fa-long-arrow-alt-left fa-5x"></i>
            </Link>
            {loading ? (
                <LoadingProducts />
  ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (  <>
                   {post.data &&  <div style={{flexDirection:"row"}}>
                          <h6> {Math.ceil(post.data.blocks.filter(w=>w.type !=="list")
                          .filter(w=> w.type !=="delimiter")
                          .map(x=>x.data.text).join('').split(' ').length/275 + ((post.data.blocks.map(x=>x.type==='simpleImage').filter(y=>y!==false).length*12)/60))} min read</h6>
                          <h6>{new Date(post.createdAt).toLocaleDateString("en-US")}</h6>
                        </div>}
                           
                            <EditorJs
                                enableReInitialize={true}
                                readOnly={readOnly}
                                tools={EDITOR_JS_TOOLS}
                                data={post.data}
                                instanceRef={instance => (instanceRef.current = instance)}
                                i18n={{
                                    messages: {}
                                }}
                            />
                            <Row>
                                <Col>
                                   
                                    <ListGroup variant='flush'>
                                    <ListGroup.Item>

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rate Post</Form.Label>
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
                                                    <h2>Write a Comment</h2>
                                            {errorPostReview && (
                                                <Message variant='danger'>{errorPostReview}</Message>
                                            )}
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
                                                        Please <Link to='/login'>sign in</Link> to write a comment{' '}
                                                    </Message>
                                                )}
                                        </ListGroup.Item>
                                        <h2>Comments</h2>
                                    {post.reviews.length === 0 && <Message>No Comments</Message>}
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

                                    </ListGroup>
                                </Col>
                            </Row>

                        </>
                    )}
        </>
    )
}
export default PostScreen 
