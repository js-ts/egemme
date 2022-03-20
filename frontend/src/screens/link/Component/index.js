import ReactDOM from 'react-dom'
import React, { useState } from 'react'
// import styled from "styled-components";
// import ShowMore from "./ShowMore";
import { Thumbnail } from '../../../components/Thumbnail'
import EditorJs from 'react-editor-js'
import {IconPickerItem}  from 'react-fa-icon-picker'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { EDITOR_JS_TOOLS } from '../../editor/constants'
import "./styles.css";
import styled from "styled-components";
import Link from '../Link';
import { BottomArrow, UpArrow } from "./Arrow";
// import block from './block'

const ShowMoreBox = styled.div`
text-align: center;
color: #666;

  &.hide {
 
    .gradient {
    
      width: 100%;
      background-image: linear-gradient(
        0deg,
        #ffffff 0,
        rgba(255, 255, 255, 0) 100%
      );
    }
    .text {
      background-color: #fff;
      width: 100%;
    }
  }
  &.show {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    justify-content: center;
  }
`;

function ReactEditor(props) {
  const { active, block, level } = props;
  console.log({ active, block, level })
  const [isShowAll, setShowAll] = useState(active);
  const [currBlock, setcurrBlock] = useState(block.slice(0, level))
  console.log(currBlock)
  console.log(isShowAll)
  function show(blk) {
    setShowAll(true)
    setcurrBlock(blk)
  }
  function hide(blk) {
    setShowAll(false)
    setcurrBlock(blk)
  }
  function changeState(st) {
    st ? show(block) : hide(block.slice(0, 2))
  }
  console.log(block.slice(0, 2))
  return (
    <>
      {isShowAll ? <EditorJs
        enableReInitialize={true}
        readOnly={true}
        tools={EDITOR_JS_TOOLS}
        minHeight={0}
        // id={editor-js-kv7w32g5}
        data={{
          time: 1556098174501,
          blocks: currBlock,
          version: '2.12.4',
        }}
      /> : <EditorJs
        enableReInitialize={true}
        readOnly={true}
        tools={EDITOR_JS_TOOLS}
        minHeight={0}
        data={{
          time: 1556098174501,
          blocks: currBlock,
          version: '2.12.4',
        }}
      />}
      {/* <ShowMore
        showFullContent={isShowAll}
        show={() => show()}
        hide={() => hide()}
      /> */}
      {/* <button onClick={()=>changeState(!isShowAll)}> */}
      {!isShowAll ? <ShowMoreBox onClick={() => changeState(!isShowAll)} className="hide">
        <div className="gradient" />
        <div className="text">
          show more
          <BottomArrow />
        </div>
      </ShowMoreBox> : <ShowMoreBox onClick={() => changeState(!isShowAll)} className="show">
        <div className="text">
          show less
        <UpArrow />
        </div>
      </ShowMoreBox>}
      {/* </button> */}
    </>
  )
}

/*
 |   |   |   |   |   |   |   |   |   |   |   | 
\|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/
*/
function LinkElement(props) {
  console.log(props)
  const {faqArr} = props
  console.log(faqArr)
  // const faqArr = [
  //   {
  //     id: 1,
  //     active: true,
  //     block: block
  //     ,
  //     title: "Why shouldn't we trust atoms?",
  //     paragraph: "They make up everything."
  //   },
  //   {
  //     id: 2,
  //     active: false,
  //     title: "What do you call someone with no body and no nose?",
  //     paragraph: "Nobody knows.",
  //     block: block

  //   },
  //   {
  //     id: 3,
  //     active: false,
  //     title: "What's the object-oriented way to become wealthy?",
  //     paragraph: "Inheritance."
  //     , block: block
  //     , level: 2

  //   },
  //   {
  //     id: 4,
  //     active: false,
  //     title: "How many tickles does it take to tickle an octopus?",
  //     paragraph: "Ten-tickles!"
  //     , block: block

  //   },
  //   {
  //     id: 5,
  //     active: false,
  //     title: "What is: 1 + 1?",
  //     paragraph: "Depends on who are you asking."
  //     , block: block
  //     , level: 4

  //   }
  // ];

  const [items, setItems] = useState(faqArr);
console.log(items)
  const clickHandler = (id,faq,i) => {
    // if(!(!faq.level && !faq.active && !faq.data) && !(faq.active && faqArr[i].active === true)){
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item.active = !item.active;
        }
        return item;
      })
    );
  // }
  };

  return (
    <div>
      <div className="faqs-container">
        {items.map((faq, i) => (
          (faq.active && faqArr[i].active  && !faq.url=== true ?
            <>
full
              <div className={faq.active === true ? "faq active" : "faq"}>
                <h3 className="faq-title">{faq.linkTitle}</h3>
                <div className="faq-text"> <EditorJs
                  enableReInitialize={true}
                  readOnly={true}
                  tools={EDITOR_JS_TOOLS}
                  minHeight={0}
                  data={faq.data}
                /></div>
              </div>
            </>
            : !faq.level && !faq.data?
            <>link 
            <Link key={faq._id} link={faq} />
            </>
            :
            faq.level ?
              <>level
                <div className={"faq active"}>

                  <ReactEditor
                    active={faq.active}
                    block={faq.data.blocks}
                    level={faq.level}
                  />
                </div>
              </> : <>
expansionsry
                <div className={faq.active === true ? "faq active" : "faq"}>
          <span style={{ padding: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', float: 'left' }}>{faq.emoji.split(':')[0] === 'emoji' ? faq.emoji.split(':')[1] : faq.emoji.split(':')[0] === 'thumb' ? <Thumbnail size="sm" source={`/${faq.emoji.split(':')[1]}`} shape="squircle" /> : <IconPickerItem icon={faq.emoji.split(':')[1]} size={30} />}</span>

                  <h3 className="faq-title">{faq.linkTitle}</h3>
                  <div className="faq-text"> <EditorJs
                    enableReInitialize={true}
                    readOnly={true}
                    tools={EDITOR_JS_TOOLS}
                    minHeight={0}
                    data={{
                      time: 1556098174501,
                      blocks: faq.data.blocks,
                      version: '2.12.4',
                    }}
                  /></div>

                  <button className="faq-toggle" onClick={() => clickHandler(faq.id,faq,i)}>
                    <FontAwesomeIcon className="chevron" icon={faChevronDown} />
                    <FontAwesomeIcon className="times" icon={faTimes} />
                  </button>

                </div>
              </>
          )

        ))}
      </div>
    </div>
  );
}


export default LinkElement;

