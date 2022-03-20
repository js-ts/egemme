import React, { useState } from 'react';
import Modalb from './Modalb';
import "./styles.css";
import "./themes.css"
import Scroller from "./scroller";
import { Row } from 'react-bootstrap'
import { Thumbnail } from '../../components/Thumbnail'
import EditorJs from 'react-editor-js'
import{IconPickerItem}  from 'react-fa-icon-picker'
import Movies from './Movies'
import { EDITOR_JS_TOOLS } from "../editor/constants";
import { ModalLink } from 'react-router-modal-gallery';

const Link = ({ link, idrl }) => {
  const [section, setSection] = useState(0);
  const [section1, setSection1] = useState(0);
  const [section2, setSection2] = useState(0);
  const [section3, setSection3] = useState(0);
  const [vp, setvp] = useState(true)
  const [concealed, setconcealed] = useState(true)
  const formatURL = () => {
    const substring = "//";
    if (link.url.includes(substring)) {
      return link.url;
    } else {
      const newURL = `//${link.url}`;
      return newURL;
    }
  }
  let linki = link.thumbnail.split(':')
  const pid = '1-1'
  return (

    <div>

      <div className="link" >

        <a className="linkContainer" href={formatURL()} target="_blank" rel="noopener noreferrer" >


          <span style={{ padding: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', float: 'left' }}>{linki[0] === 'emoji' ? linki[1] : linki[0] === 'thumb' ? <Thumbnail size="sm" source={`/${linki[1]}`} shape="squircle" /> : <IconPickerItem icon={linki[1]} size={30} />}</span>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h4>

              {link.linkTitle}
            </h4>




          </div>

        </a>



      </div>
      {/* <button onClick={() => setvp(!vp)}>
        V
           </button>

      {vp ? (<div>


        <button onClick={() => setconcealed(!concealed)}>
          T
        </button>
        {concealed ? (<button>




          <ModalLink to={`${idrl}/${pid}`}>

            +
        </ModalLink>

        </button>) : (
          <div>
            <Scroller className="container" setSection={setSection1} >
              <EditorJs enableReInitialize={true}

                tools={EDITOR_JS_TOOLS} data={link.data} />
            </Scroller>

          </div>
        )}
      </div>) : (null)} */}
    </div>
  )
}

export default Link






// import React from 'react';

// const Link = ({ link }) => {
//   const formatURL = () => {
//     const substring = "//";
//     if (link.url.includes(substring)) {
//       return link.url;
//     } else {
//       const newURL = `//${link.url}`;
//       return newURL;
//     }
//   }

//   return (
//     <div className="link">
//       <a className="linkContainer" href={formatURL()} target="_blank" rel="noopener noreferrer">{link.linkTitle}</a>
//     </div>
//   )
// }

// export default Link
