// import ReactDOM from "react-dom";
import React, { useState } from "react";

import EditorJs from "react-editor-js";

import { EDITOR_JS_TOOLS } from "./constants";

const ReactEditor = () => {
  const [readOnly, setreadOnly] = useState(true)
  const instanceRef = React.useRef(null);
  const data = {
    time: 1556098174501,
    blocks: [
      {
        type: "header",
        data: {
          text: "",
          level: 2
        }
      },
      {
        type: "paragraph",
        data: {
          text:
            ""
        }
      }
    ],
    version: "2.12.4"
  }
  async function handleSave() {
    const savedData = await instanceRef.current.save();

    console.log("savedData", savedData);
  }

  return (
<>
<button onClick={()=>setreadOnly(!readOnly)}>RO</button>
{readOnly ? 
(<>
 <EditorJs
   enableReInitialize={true}
   readOnly={readOnly}
   tools={EDITOR_JS_TOOLS}
   data={data}
   instanceRef={instance => (instanceRef.current = instance)}
   i18n={{
     messages: {}
   }}
 />
 </>):(
   <>
    <button onClick={handleSave}>Save!</button>
     <EditorJs
     tools={EDITOR_JS_TOOLS}
     data={data}
     instanceRef={instance => (instanceRef.current = instance)}
     i18n={{
       messages: {}
     }}
     />
   </>
 )
 }
</> 
  );
};

export default ReactEditor

{/* <>
<button onClick={()=>setreadOnly(!readOnly)}>RO</button>
{readOnly ? 
(<>
 <EditorJs
   enableReInitialize={true}
   readOnly={readOnly}
   tools={EDITOR_JS_TOOLS}
   data={data}
   instanceRef={instance => (instanceRef.current = instance)}
   i18n={{
     messages: {}
   }}
 />
 </>):(
   <>
    <button onClick={handleSave}>Save!</button>
     <EditorJs
     enableReInitialize={true}
     readOnly={readOnly}
     tools={EDITOR_JS_TOOLS}
     data={data}
   
     i18n={{
       messages: {}
     }}
     />
   </>
 )
 }
</> */}