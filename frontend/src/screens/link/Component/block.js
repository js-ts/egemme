const block=[
    {
      type: 'header',
      data: {
        text: 'Editor.js',
        level: 2,
      },
    },
    {
      type: 'paragraph',
      data: {
        text:
          'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.',
      },
    },
    {
      type: 'header',
      data: {
        text: 'Key features',
        level: 3,
      },
    },
    {
      type: 'list',
      data: {
        style: 'unordered',
        items: [
          'It is a block-styled editor',
          'It returns clean data output in JSON',
          'Designed to be extendable and pluggable with a simple API',
        ],
      },
    },
    {
      type: 'header',
      data: {
        text: 'What does it mean «block-styled editor»',
        level: 3,
      },
    },
    {
      type: 'paragraph',
      data: {
        text:
          'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
      },
    },
    {
      type: 'paragraph',
      data: {
        text:
          'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.',
      },
    },
    {
      type: 'header',
      data: {
        text: 'What does it mean clean data output',
        level: 3,
      },
    },
    {
      type: 'paragraph',
      data: {
        text:
          'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below',
      },
    },
    {
      type: 'paragraph',
      data: {
        text:
          'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.',
      },
    },
    {
      type: 'paragraph',
      data: {
        text:
          'Clean data is useful to sanitize, validate and process on the backend.',
      },
    },
    {
      type: 'delimiter',
      data: {},
    },
    {
      type: 'paragraph',
      data: {
        text:
          "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
      },
    },
    {
      type: 'image',
      data: {
        file: {
          url:
            'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',
        },
        caption: '',
        withBorder: true,
        stretched: false,
        withBackground: false,
      },
    },
]

export default block











































// import ReactDOM from 'react-dom'
// import React, { useState } from 'react'
// // import styled from "styled-components";
// // import ShowMore from "./ShowMore";
// import EditorJs from 'react-editor-js'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { EDITOR_JS_TOOLS } from './constants'
// import "./styles.css";
// import block from './block'

// function ReactEditor(props){
//   const { showall, block,level  } = props;

//   const [isShowAll, setShowAll] = useState(false);
//   const [currBlock, setcurrBlock] = useState(block.slice(0,2))
//   console.log(currBlock)
//   console.log(isShowAll)
//   function show(blk){
//     setShowAll(true)
//     setcurrBlock(blk)
//   }
//   function hide(blk){
//     setShowAll(false)
//     setcurrBlock(blk)
//   }
//   function changeState(st){
//     st? show(block):hide(block.slice(0,2))
//   }
//   console.log(block.slice(0,2))
//     return (
//       <>
//  {isShowAll?     <EditorJs
//     enableReInitialize={true}
//     readOnly={true}
//         tools={EDITOR_JS_TOOLS}
//         minHeight ={0} 
//         data={{
//           time: 1556098174501,
//           blocks: currBlock,
//           version: '2.12.4',
//         }}
//       />: <EditorJs
//       enableReInitialize={true}
//       readOnly={true}
//       tools={EDITOR_JS_TOOLS}
//       minHeight ={0} 
//       data={{
//         time: 1556098174501,
//         blocks: currBlock,
//         version: '2.12.4',
//       }}
//     />}
//          {/* <ShowMore
//         showFullContent={isShowAll}
//         show={() => show()}
//         hide={() => hide()}
//       /> */}
//       <button onClick={()=>changeState(!isShowAll)}>
//       {isShowAll? 'hide':'show'}
//       </button>
//       </>
//     )
//   }

// /*
//  |   |   |   |   |   |   |   |   |   |   |   | 
// \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/
// */
//   function App() {
//     const faqArr = [
//       {
//         id: 1,
//         active: true,
//         title: "Why shouldn't we trust atoms?",
//         paragraph: "They make up everything."
//       },
//       {
//         id: 2,
//         active: false,
//         title: "What do you call someone with no body and no nose?",
//         paragraph: "Nobody knows."
//       },
//       {
//         id: 3,
//         active: false,
//         title: "What's the object-oriented way to become wealthy?",
//         paragraph: "Inheritance."
//       },
//       {
//         id: 4,
//         active: false,
//         title: "How many tickles does it take to tickle an octopus?",
//         paragraph: "Ten-tickles!"
//       },
//       {
//         id: 5,
//         active: false,
//         title: "What is: 1 + 1?",
//         paragraph: "Depends on who are you asking."
//       }
//     ];
  
//     const [items, setItems] = useState(faqArr);
  
//     const clickHandler = (id) => {
//       setItems(
//         items.map((item) => {
//           if (item.id === id) {
//             item.active = !item.active;
//           }
//           return item;
//         })
//       );
//     };
  
//     return (
//       <div>
//         <h1>Frequently Asked Questions</h1>
//         <div className="faqs-container">
//           {items.map((faq, i) => (
//             (faq.active && faqArr[i].active === true ?
//               <>
  
//                 <div className={faq.active === true ? "faq active" : "faq"}>
//                   <h3 className="faq-title">{faq.title}</h3>
//                   <p className="faq-text">{faq.paragraph}</p>
//                 </div>
//               </>
//               : <>
  
//                 <div className={faq.active === true ? "faq active" : "faq"}>
//                   <h3 className="faq-title">{faq.title}</h3>
//                   <p className="faq-text">{faq.paragraph}</p>
  
//                   <button className="faq-toggle" onClick={() => clickHandler(faq.id)}>
//                     <FontAwesomeIcon className="chevron" icon={faChevronDown} />
//                     <FontAwesomeIcon className="times" icon={faTimes} />
//                   </button>
  
//                 </div>
//               </>
//             )
  
//           ))}
//         </div>
//       </div>
//     );
//   }
  

// ReactDOM.render(<ReactEditor />, document.getElementById('app'))

