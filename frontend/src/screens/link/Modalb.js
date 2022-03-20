import React, { useState } from 'react';
import Model from 'react-modal';
import Scroller from "./scroller";
import EditorJs from 'react-editor-js'
// import ClipLoader from 'react-spinners/ClipLoader';
import { EDITOR_JS_TOOLS } from "../editor/constants";
const modalStyle = {
  content: {
    top                   : '45%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '540px',
    height: '500px',
    background            : 'white',
    padding: '0px'
  },
  overlay: {
    backgroundColor: 'rgba(47, 53, 62, 0.86)'
  },
}

const Modalb = ({data}) => {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div>

      {true ? <button onClick={openModal}>+</button> : <div className="avatarStyle">
        {/* <ClipLoader sizeUnit={"px"} size={96} color={'rgb(31, 28, 28)'} loading={true}/> */}
        </div>}
      <Model 
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
        style={modalStyle}
        ariaHideApp={false}
      >
          <Scroller className="container" > 
          <EditorJs 
   tools={EDITOR_JS_TOOLS} data={data}/>

       <button onClick={closeModal}>X</button>
          </Scroller>
    
      </Model>
    </div>
  )
}

export default Modalb
