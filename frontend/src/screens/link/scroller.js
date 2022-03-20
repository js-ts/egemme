import React, { useRef, MutableRefObject } from "react";

import "./styles.css";



export default function Scroller({
  children, //HERE we need to tell React explicitly that we want the child components
  setSection //this is the mutator method we set earlier
}) {
   function renderChildren() {
    let sectionIndex = 0;
    return React.Children.map(children, (child) => {
      //for each child component...
      // const sectionRef = useRef(); //create a ref to this specific section

      // let args = {
      //   //THESE args pass in refs nessecary for tracking of the section
      //   boundingRef: scrollerEle,
      //   sectionRef: sectionRef,
      //   sectionIndex: sectionIndex,
      //   setSection: setSection
      // };
      // // sectionPositionHook(args);

      sectionIndex += 1;
      return (
        <div key={sectionIndex - 1}>
          {child}
        </div>
      );
    });
  }
  return (
    <div className="scroller">
      {renderChildren()}
    </div>
  );
}
