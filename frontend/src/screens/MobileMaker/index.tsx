import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import UserHeader from '../link/UserHeader';
// import Link from './Link';
import { Table, Form, Button, Row, Col,Image } from 'react-bootstrap'

import NotFound from '../link/NotFound';
import LinksContext from '../../links-context';
import Footer from '../../components/Footer'
import Loader from '../../components/Loader';
import {IconPickerItem}  from 'react-fa-icon-picker'
// import Movies from './Movies'
import ReactDevicePreview from "react-device-preview";

import styled from 'styled-components'
import LinkElement from '../link/Component/index'
import '../link/themes.css';
import varp from '../link/varp'
const App = ({match}) => {
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
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
console.log(image)

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

      setImage('/uploads/'+data.slice(8))
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  // const image ='https://www.webfx.com/blog/images/assets/cdn.sixrevisions.com/0431-01_responsive_background_image_demo/images/background-photo-mobile-devices.jpg'
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

  axios.get(`/api/l/Vedant/60b379ab375154fa9b62cb13`)
  .then(res => {
    console.log(res)
    setLinks([...res.data.links.links]);
    setsocialLinks([...res.data.socialLinks])
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
      <ReactDevicePreview device="iphonex" scale="0.5">
          <div className="mobile-frame">
      <div className="mockup">
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
        {/* <Scroller setSection={setSection}> */}
        {console.log(sociallinks)}
          {(sociallinks.length > 0) ? (sociallinks.map(link =><div key={link._id}><a  href={`https://www.${link.url}`} target="_blank" rel="noopener noreferrer"><IconPickerItem icon={link.icon} size={30}/></a></div>)) : (<h1 className="empty-linktree">User's Linktree is empty!</h1>)}
        </div>
        </div>
          <Footer/>
        </div>
      </div>
      </Container>
      </div>
      </div>
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
      </ReactDevicePreview>

      )
  )
}

export default App





























// import "./styles.css";
// import React from 'react'
// export default function App() {
//   return (
//     <div className="mobile-frame">
//       <div className="mockup">
//         <h1>Website</h1>
//         <p>
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry's standard dummy text ever
//           since the 1500s, when an unknown printer took a galley of type and
//           scrambled it to make a type specimen book. It has survived not only
//           five centuries, but also the leap into electronic typesetting,
//           remaining essentially unchanged.
//         </p>
//         <p>
//           It was popularised in the 1960s with the release of Letraset sheets
//           containing Lorem Ipsum passages, and more recently with desktop
//           publishing software like Aldus PageMaker including versions of Lorem
//           Ipsum.
//         </p>
//         <p>
//           Contrary to popular belief, Lorem Ipsum is not simply random text. It
//           has roots in a piece of classical Latin literature from 45 BC, making
//           it over 2000 years old. Richard McClintock, a Latin professor at
//           Hampden-Sydney College in Virginia, looked up one of the more obscure
//           Latin words, consectetur, from a Lorem Ipsum passage, and going
//           through the cites of the word in classical literature, discovered the
//           undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
//           1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
//           Evil) by Cicero, written in 45 BC. This book is a treatise on the
//           theory of ethics, very popular during the Renaissance. The first line
//           of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
//           section 1.10.32.
//         </p>
//         <p>
//           The standard chunk of Lorem Ipsum used since the 1500s is reproduced
//           below for those interested. Sections 1.10.32 and 1.10.33 from "de
//           Finibus Bonorum et Malorum" by Cicero are also reproduced in their
//           exact original form, accompanied by English versions from the 1914
//           translation by H. Rackham.
//         </p>
//       </div>
//     </div>
//   );
// }
