import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { listPosts, listUserPostDetails } from '../actions/postActions'
import { getUserDetails } from '../actions/userActions'
import Posts from '../components/Posts'
import "./ProfileHeader.styles.css";
import "./ProfileAbout.styles.css"
import FollowList from "./follow-list/FollowList.component";


const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const postList = useSelector((state) => state.postList)
  const { ploading, perror } = postList
  const [activeTab, setActiveTab] = useState("posts");
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        dispatch(listUserPostDetails(user._id))
        setName(user.name)
        setImage(user.image)
        setDescription(user.description)
        dispatch(listPosts(''))
      }
    }
  }, [dispatch, history, userInfo, user])

  const uposts = useSelector((state) => state.listUserPostDetails)
  const { posts, poloading } = uposts

  console.log(user)
  return (
    <>
      <div id="profile" className="container">

        <div id="profile-header">
          <img src={image} alt="User avatar" />
          <div className="text-container">
            <h1 className="title">{name}</h1>
            <h3 className="subtitle">{description}</h3>
            {true ? (
              <Link
                to="/profile/edit"
                className="button is-danger is-inverted is-outlined"
                >
                <i className="fas fa-user-edit mr-2"></i>Edit Profile
              </Link>
            ) : (
              null
              )}
              </div>
          </div>
          {!true ? null : (
            <>
              <div className="tabs is-boxed">
                <ul>
                  <li
                    onClick={() => setActiveTab("posts")}
                    className={activeTab === "posts" ? "is-active" : undefined}
                  >
                    <a href="#!">
                      <span className="icon is-small">
                        <i className="fas fa-image" aria-hidden="true"></i>
                      </span>
                      <span>Posts</span>
                    </a>
                  </li>
                  {' '}
                  <li
                    onClick={() => setActiveTab("about")}
                    className={activeTab === "about" ? "is-active" : undefined}
                  >
                    <a href="#!">
                      <span className="icon is-small">
                        <i className="fas fa-user" aria-hidden="true"></i>
                      </span>
                      <span>About</span>
                    </a>
                  {' '}
                  </li>
                  <li
                onClick={() => setActiveTab("followers")}
                className={activeTab === "followers" ? "is-active" : undefined}
              >
                <a href="#!">
                  <span className="icon is-small">
                    <i className="fas fa-user-friends" aria-hidden="true"></i>
                  </span>
                  <span>Followers</span>
                </a>
              </li>
              {' '}

              <li
                onClick={() => setActiveTab("following")}
                className={activeTab === "following" ? "is-active" : undefined}
              >
                <a href="#!">
                  <span className="icon is-small">
                    <i className="fas fa-user-friends" aria-hidden="true"></i>
                  </span>
                  <span>Following</span>
                </a>
              </li>
                </ul>
              </div>
              {activeTab === "posts" ? 
             ( <div
                className="tab-content"
                style={activeTab === "posts" ? { display: "block" } : null}
              >
                <br />
                <h3>
                  My Posts
            {posts.length === 0 && <Message>No Posts</Message>}
                </h3>

                {ploading ? (
                  <Loader />
                ) : ploading ? (
                  <Message variant='danger'>{error}</Message>
                ) : (posts.length !== 0 &&

                  posts.map((post) => (

                    <Posts post={post} />

                  )))}


              </div>):(null)}
              {activeTab === "about" ? (
              <div
                className="tab-content"
                style={activeTab === "about" ? { display: "block" } : null}
              >

                <h1 className="title about-title">About Me</h1>
                <section className="profile-about-content">
                  <div className="about-user">
                    {description && (
                      <h1>
                        <i className="fas fa-comment-alt primary-text"></i>
                        {description}
                      </h1>
                    )}
                  </div>
                  

                </section>


              </div>):(null)}
              {activeTab === "followers" ?
              (<div
            className="tab-content"
            style={activeTab === "followers" ? { display: "block" } : null}
          >
            <FollowList
              list={user ? user.followers : []}
              which="followers"
            />
          </div>):(null)}
          {activeTab === "following" ? 
         ( <div
            className="tab-content"
            style={activeTab === "following" ? { display: "block" } : null}
          >
            <FollowList
              list={user ? user.following : []}
              which="following"
            />
          </div>):(null)}

            </>
          )}
      </div>

    </>
  )
}

export default ProfileScreen

























// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Table, Form, Button, Row, Col } from 'react-bootstrap'
// import {Link} from 'react-router-dom'
// import { LinkContainer } from 'react-router-bootstrap'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import axios from 'axios'
// import { listPosts,listUserPostDetails } from '../actions/postActions'
// import { getUserDetails} from '../actions/userActions'
// import Posts from '../components/Posts'
// import "./ProfileHeader.css";

// const ProfileScreen = ({ location, history }) => {
//   const [name, setName] = useState('')
//   const [message, setMessage] = useState(null)
//   const [image, setImage] = useState('')
//   const [description, setDescription] = useState('')
//   const dispatch = useDispatch()
//   const userDetails = useSelector((state) => state.userDetails)
//   const { loading, error, user } = userDetails
//   const userLogin = useSelector((state) => state.userLogin)
//   const { userInfo } = userLogin
//   const postList = useSelector((state) => state.postList)
//   const { ploading, perror } = postList

//    useEffect(() => {
//     if (!userInfo) { history.push('/login')
//     } else {
//       if (!user.name) {
//         dispatch(getUserDetails('profile'))
//       } else {
//         dispatch(listUserPostDetails(user._id))
//         setName(user.name)
//         setImage(user.image)
//         setDescription(user.description)
//         dispatch(listPosts(''))
//       }
//     }
//   }, [dispatch, history, userInfo, user])

//   const uposts = useSelector((state)=>state.listUserPostDetails)
//   const { posts , poloading } = uposts

//   console.log(user)
//   return (
//     <>
//     <div id="profile-header">
//     <img src={image} alt="User avatar" />
//     <div className="text-container">
//       <h1 className="title">{name}</h1>
//       <h3 className="subtitle">{description}</h3>
//       {true ? (
//         <Link
//           to="/profile/edit"
//           className="button is-danger is-inverted is-outlined"
//         >
//           <i className="fas fa-user-edit mr-2"></i>Edit Profile
//         </Link>
//       ) : (
//        null
//       )}
//     </div>
//   </div>
//     <Row>
//       <Col md={3}>
//         <h2>User Profile</h2>
//         {message && <Message variant='danger'>{message}</Message>}
//         {error && <Message variant='danger'>{error}</Message>}
//                {loading && <Loader />}
//         <img src={image} style={{width:'20vw',height:"20vw"}}/>
//         <Form>
//           <Form.Group controlId='name'>
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type='name'
//               placeholder='Enter name'
//               value={name}
//             //   onChange={(e) => setName(e.target.value)}
//               readOnly 
//             ></Form.Control>
//           </Form.Group>
//        <Form.Group controlId='description'>
//                       <Form.Label>Description</Form.Label>
//                       <Form.Control
//                       as="textarea"
//                         type='text'
//                         placeholder='Enter description'
//                         value={description}
//                         // onChange={(e) => setDescription(e.target.value)}
//                         readOnly 
//                       ></Form.Control>
//                     </Form.Group>      
//          </Form>
//       </Col>
//       <Col md={9}>
// {  console.log(posts)}
    //   <>
    //   <br/>
    //   <h3>
    //   My Posts
    //   {posts.length === 0 && <Message>No Posts</Message>}
    //     </h3>
    //       <Row>
    //         {ploading ? (
    //     <Loader />
    //   ) : ploading ? (
    //     <Message variant='danger'>{error}</Message>
    //   ) :(posts.length !== 0 &&

    //     posts.map((post) => (
    //           <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
    //             <Posts post={post} />
    //           </Col>
    //         )))}
    //       </Row>
    //     </>

    //   </Col>
    // </Row>
    // </>
//   )
// }

// export default ProfileScreen
