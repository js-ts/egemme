import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Grid } from "@material-ui/core";
import './vw.css'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listPostDetails, updatePost } from '../actions/postActions'
import { POST_UPDATE_RESET } from '../constants/postConstants'

const PostEditScreen = ({ match, history }) => {
  const postId = match.params.id

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [markdown, setMarkdown] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [youtubeId, setYoutubeId] = useState('')
  console.log(markdown)
  const dispatch = useDispatch()
  const postDetails = useSelector((state) => state.postDetails)
  const { loading, error, post } = postDetails
  const postUpdate = useSelector((state) => state.postUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = postUpdate
  let count = 0;
  const isOne = (count === 1) ? true : false;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET })
      history.push('/admin/postlist')
    } else {
      if (!post.name || post._id !== postId) {
        if (isOne) {
          dispatch(listPostDetails(postId));
          count++;
        }

      } else {
        setTitle(post.title)
        // setPrice(post.price)
        setImage(post.image)
        // setBrand(post.brand)
        // setCategory(post.category)
        // setCountInStock(post.countInSock)
        setDescription(post.description)

        setMarkdown(post.markdown)

      }
    }
  }, [dispatch, history, postId, post, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)

    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updatePost({
        _id: postId,
        image,
        youtubeId,
        title,
        description,
        markdown,

      })
    )
  }
  const customCommand = {
    name: "my-custom-command",
    icon: () => (
      <span role="img" aria-label="nice">
  
      </span>
    ),
   
  };
  return (
    <>
 
        <Link to='/admin/postlist' className='btn btn-light my-3'>
          <i className="fas fa-long-arrow-alt-left fa-5x"></i>
        </Link>

        <FormContainer>
          <h1>Edit Post</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (

                <Form onSubmit={submitHandler}>
                  {/* <Col> */}

                    <Form.Group controlId='title'>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type='title'
                        placeholder='Enter title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  {/* </Col> */}
                  {/* <Col> */}
                    <Form.Group controlId='youtubeId'>
                      <Form.Label>Video url</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Youtube url'
                        value={youtubeId.replace('https://www.youtube.com/watch?v=', '')}
                        onChange={(e) => setYoutubeId(e.target.value)}
                      ></Form.Control>

                    </Form.Group>
                  {/* </Col> */}

                  {/* <Col> */}
                    <Form.Group controlId='image'>
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      ></Form.Control>
                      <Form.File
                        id='image-file'
                        label='Choose File'
                        custom
                        onChange={uploadFileHandler}
                      ></Form.File>
                      {uploading && <Loader />}
                    </Form.Group>
                  {/* </Col> */}
                  {/* <Col> */}

                    <Form.Group controlId='markdown'>

                      <Form.Label>markdown</Form.Label>

                      <div id='mkdn'>

                        {/* <Grid container spacing={2}>

                        <Grid item xs={12}> */}
                        {/* <div className="editor"> */}
                          <ReactMde
                            value={markdown}
                            onChange={setMarkdown}
                            selectedTab={"write"}
                            childProps={{
                              writeButton: {
                                tabIndex: -1
                              }
                            }}
                          />
                        {/* </div> */}
                        {/* ,wordWrap: "break-word" */}
                        <div style={{ borderStyle: "solid"}}>
                          
                          <ReactMarkdown source={markdown} />
                          
                        </div>
                      </div>
                      {/* </Grid >

</Grid > */}

                    </Form.Group>
                  {/* </Col> */}

                  {/* <Col> */}
                    <Form.Group controlId='description'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  {/* </Col> */}

                  <Button type='submit' variant='primary'>
                    Update
            </Button>
                </Form>
              )}

        </FormContainer>
    

    </>
  )
}

export default PostEditScreen
