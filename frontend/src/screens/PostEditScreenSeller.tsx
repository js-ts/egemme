import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./editor/constants";
import { Grid } from "@material-ui/core";
import './vw.css'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listPostDetails, updatePost,listUserPostDetails } from '../actions/postActions'
import { POST_UPDATE_RESET } from '../constants/postConstants'

const PostEditScreen = ({ match, history }) => {
  const postId = match.params.id
  const [readOnly, setreadOnly] = useState(true)
  const [uploading, setUploading] = useState(false)
  const instanceRef = React.useRef(null);
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
  const [data, setData] = useState(post)
  // const [pubSave, setPubSave] = useState(post.data.time)

  const isOne = (count === 1) ? true : false;
  const isdef = (post) ? true : false
// if(isdef){  console.log(post.data.time>post.saved.time)
//   console.log(data)}
  console.log(data)
  // console.log(pubSave)
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET })
      history.push('/seller/postlist')
    } else {
      if (!post.data || post._id !== postId) {
        if (isOne) {
        
          dispatch(listPostDetails(postId))
          dispatch(listUserPostDetails(postId))
          
        count++;
        }

      } else {
        if(post.isPublished){
        setData(post.data)
                    }
        else{
          setData(post.save)
        }
      }
    }
  }, [dispatch,match, history, postId, post, successUpdate])


  async function submitHandler(e) {
    const data = await instanceRef.current.save();
    console.log(data)
    e.preventDefault()
    dispatch(
      updatePost({
        _id: postId,
        data

      },false)
    )
  }

  async function saveSubmitHandler(e) {
    const data = await instanceRef.current.save();
    console.log(data)
    e.preventDefault()
    dispatch(
      updatePost({
        _id: postId,
        data

      },true)
    )
  }
  const customCommand = {
    name: "my-custom-command",
    icon: () => (
      <span role="img" aria-label="nice"></span>),};
  async function handleSave() {
    const savedData = await instanceRef.current.save();
    console.log("savedData", savedData);
}

  



  {post && delete post._id}
  {console.log(post)}
  return (
    <>

      <Link to='/seller/postlist' className='btn btn-light my-3'>
        <i className="fas fa-long-arrow-alt-left fa-5x"></i>
      </Link>

      <>
       {post.isPublished? <h1>Edit Post</h1>:<h1>Create Post</h1>}

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (

 <Form onSubmit={submitHandler}>

                {isdef ? (
                  <>
                    <Button onClick={saveSubmitHandler}>Save Post</Button>
                    <EditorJs
                      tools={EDITOR_JS_TOOLS}
                      data={data}
                      instanceRef={instance => (instanceRef.current = instance)}
                      i18n={{
                        messages: {}
                      }}
                    />
                  </>) : (
                    <Loader />
                  )}

                <Button type='submit' variant='primary'>
                  Publish
            </Button>
              </Form>
            )}

      </>


    </>
  )
}

export default PostEditScreen
