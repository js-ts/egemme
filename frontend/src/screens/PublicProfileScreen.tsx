import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { listPosts, listUserPostDetails } from '../actions/postActions'
import { getUserPageDetails } from '../actions/userActions'
import Posts from '../components/Posts'
import "./ProfileHeader.styles.css";
import "./ProfileAbout.styles.css"

const PublicProfileScreen = ({match, location, history }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [followers, setFollwers] = useState([])
  const [following, setFollwing] = useState([])
  const postList = useSelector((state) => state.postList)
  const { ploading, perror } = postList
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserPageDetails(match.params.username))
      } else {
        dispatch(listUserPostDetails(user._id))
        setName(user.name)
        setImage(user.image)
        setDescription(user.description)
        dispatch(listPosts(''))
        setFollwers(user.followers)
        setFollwing(user.following)
      }
    }
  }, [dispatch, history, userInfo, user])

  const uposts = useSelector((state) => state.listUserPostDetails)
  const { posts, poloading } = uposts
  const followUser = async () => {
    await axios.put(`/api/users/follow/${match.params.username}`);
    window.location.reload(false);
  };

  const unfollowUser = async () => {
    await axios.put(`/api/users/unfollow/${match.params.username}`);
    window.location.reload(false);
  };
//   if(user.followers || user.following)
// {
  const followOrUnfollowButton = () => {
    if (
      followers.filter(
        (follower) => follower.username === userInfo.username
      ).length === 0
    ) {
      return (
        <button
          onClick={followUser}
          className="button is-danger is-inverted is-outlined"
        >
          <i className="fas fa-user-plus mr-2"></i>Follow
        </button>
      );
    } else {
      return (
        <button
          onClick={unfollowUser}
          className="button is-danger is-inverted is-outlined"
        >
          <i className="fas fa-user-minus mr-2"></i>Unfollow
        </button>
      );
    // }
  };}
  console.log(user)
  return (
    <>
      <div id="profile" className="container">

        <div id="profile-header">
          <img src={image} alt="User avatar" />
          <div className="text-container">
            <h1 className="title">{name}</h1>
            <h3 className="subtitle">{description}</h3>
            {followOrUnfollowButton()}
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

            </>
          )}
      </div>

    </>
  )
}

export default PublicProfileScreen