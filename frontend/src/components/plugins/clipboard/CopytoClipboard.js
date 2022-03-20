/* eslint-disable react-hooks/exhaustive-deps */
// import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';
import React,{useState} from 'react';

// const DEFAULT_INITIAL_DATA = () => {
//   return {
//     events: [
//       {
//         "data": "Data"
//       }
//     ],
//   }
// }

// const useStyles = makeStyles(theme => ({
//   root: {
//     paddingTop: '8px',
//     backgroundColor: '#efefef',
//   },
//   timelinedot: {
//     boxShadow: 'none',
//     marginTop: '20px',
//   },
//   time: {
//     flex: '0.2',
//     padding: '8px',
//     marginTop: '6px',
//     textOverflow: 'ellipsis',
//   },
//   oppositeInButton: {
//     flex: '0.14',
//   },
//   addButton: {
//     boxShadow: 'none',
//     paddingLeft: '14px',
//     paddingRight: '14px'
//   },
//   description: {
//     padding: '8px',
//     width: '400px',
//     textOverflow: 'ellipsis',
//   },
//   addButtonText: {
//     color: '#FFFFFF',
//     fontSize: '1.3rem',
//   }
// }));

const Clipboard = (props) => {
  const [value,setValue]=useState(props.value===''? '':props.value)
  
  const updateTimelineData = (newData) => {
    setValue(newData);
    if (props.onDataChange) {
      // Inform editorjs about data change
      props.onDataChange(newData);
    }
  }

  const copyToClipboard = () => {
    const element = document.querySelector(".ClipApp input");
    element.select();
    element.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    
  };
  const onValueChange=(newData)=>{
    updateTimelineData(newData);
  }

  return (
    <div className="ClipApp" style={{display: 'flex',flexDirection: 'row'}}>
      <input type="text" onChange={(e)=>onValueChange(e.target.value)} disabled={props.readOnly} value={value} style={{width: '95%'}}/>
      <button onClick={copyToClipboard} ><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg></button>
    </div>
  );
}

export default Clipboard;