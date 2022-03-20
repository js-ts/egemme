import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import UserHeader from './UserHeader';
import Link from './Link';
import NotFound from './NotFound';
import LinksContext from '../../links-context';
import Footer from '../../components/Footer'
import Loader from '../../components/Loader';
import {IconPickerItem} from 'react-fa-icon-picker'
import Movies from './Movies'
import styled from 'styled-components'
import LinkElement from './Component/index'
import './themes.css';
import varp from './varp'
const UserLinkTree = ({match}) => {
  const [bio, setbio] = useState('')
  const [links, setLinks] = useState([]);
  const [sociallinks, setsocialLinks] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [theme, setTheme] = useState(1);
  //const [avatar, setAvatar] = useState(avatar);
  const [userAvatar, setUserAvatar] = useState('');
  console.log(match.params.id,match.params.username)
  const image ='https://www.webfx.com/blog/images/assets/cdn.sixrevisions.com/0431-01_responsive_background_image_demo/images/background-photo.jpg'
  const Container=styled.div`
  .bg {
    background: url(${image}) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-y: scroll;
  }
  `
const jlink=      {
  username: "jojo",
  theme: 13,
  avatar: "uploads/image-1613660771861.jpg",
  socialLinks:[{      linkTitle:"google",
  url: "google.com",icon:"FaYoutube"},{      linkTitle:"Youtube",
  url: "google.com",icon:"FaFacebook"},{      linkTitle:"facebook",
  url: "google.com",icon:"FaTwitter"},{      linkTitle:"twitter",
  url: "google.com",icon:"FaGoogle"}],
  bio:"Hi this is admin and I make websites",
  links: [{
    linkTitle:"sample",
    url: "sample.com",
    "emoji": "thumb:uploads/image-1613660771861.jpg",
    data:{
      time:new Date().getTime()
      ,
      blocks: [
        {
          type: "header",
          data: {
            text: "hi",
            level: 2
          }
        },
        {
          type: "paragraph",
          data: {
            text:
            varp
          }
        }
      ],
      version: "2.12.4"
    },
    
  },{
    linkTitle:"facebook",
    url: "facebook.com",
    "emoji": "emoji:🎸",
    data:{
      time:new Date().getTime()
      ,
      blocks: [
        {
          type: "header",
          data: {
            text: "hi",
            level: 2
          }
        },
        {
          type: "paragraph",
          data: {
            text:
            varp
          }
        }
      ],
      version: "2.12.4"
    },
  },{
    linkTitle:"twitter",
    url: "twitter.com",
    "emoji": "emoji:🤘",
    data:{
      time:new Date().getTime()
      ,
      blocks: [
        {
          type: "header",
          data: {
            text: "hi",
            level: 2
          }
        },
   {
     type: "paragraph",
     data: {
       text:
       varp
      }
    }
  ],
  version: "2.12.4"
},

},{
  linkTitle:"youtube",
  url: "youtube.com",
  "emoji": "icon:FaYoutube",
  data:{
    time:new Date().getTime()
    ,
    blocks: [
      {
        type: "header",
        data: {
          text: "hi",
          level: 2
        }
      },
      {
        type: "paragraph",
        data: {
          text:
          varp
        }
      }
    ],
    version: "2.12.4"
  },
}]
}
// console.log(`api/l/${window.location.href.split('/')[3]}/${window.location.href.split('/')[4]}`)
const linksCtx = useContext(LinksContext);
useEffect(() => {
  axios.get(`/api/l/${match.params.username}/${match.params.id}`)
  .then(res => {
    console.log(res)
    setLinks([...res.data.links.links]);
    setsocialLinks([...res.data.links.socialLinks])
    setbio(res.data.bio)
    setUsername(res.data.username);
    setTheme(res.data.links.theme);
    setLoading(false);
    setUserAvatar(res.data.avatar);
    linksCtx.addLink([...res.data.links.links]);
  })
}, []);


// Return loading UI while waiting for GET request, then load user's page once the request goes through.
// Return NotFound component if GET request does not find the searched username
return ( 
  (loading && !notFound) ? <div className="green-container"><div className="loader">
      {/* <ClipLoader sizeUnit={"px"} size={150} color={'rgb(31, 28, 28)'} loading={true}/> */}
   <Loader/>
      </div></div>
    : (notFound) ? <NotFound /> 
    : (
      <Container>

    <div className={(theme === 1) ? 'green-container' : `theme-${theme}`}>
      <div className="bg">
      <div className="container" id="style-1">
        <UserHeader username={username} avatar={userAvatar}/>
        <h5 style={{textAlign:'center'}}>{bio}</h5>
        <section>
        <div className="linksList">
        {/* <Scroller setSection={setSection}> */}
           {   console.log(links)}

          {/* {(links.length > 0) ? (links.map(link => <Link key={link._id} link={link} idrl={match.params.id}/>)) : (<h1 className="empty-linktree">User's Linktree is empty!</h1>)} */}
            {<LinkElement faqArr={links}/>}
        </div>

        </section>
        <div className="sociallinksList">
          {console.log(sociallinks)}
        {/* <Scroller setSection={setSection}> */}
          {(sociallinks.length > 0) ? (sociallinks.map(link =><div key={link._id}><a  href={`https://www.${link.url}`} target="_blank" rel="noopener noreferrer"><IconPickerItem icon={link.icon} size={30}/></a></div>)) : (<h1 className="empty-linktree">User's Linktree is empty!</h1>)}
        </div>
        </div>
          <Footer/>
        </div>
      </div>
      </Container>
      
      )
  )
}

export default UserLinkTree