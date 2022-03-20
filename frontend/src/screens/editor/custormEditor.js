// import EditorJS from "@editorjs/editorjs";

// function saveSelection(containerEl) {
//   var range = window.getSelection().getRangeAt(0);
//   var preSelectionRange = range.cloneRange();
//   preSelectionRange.selectNodeContents(containerEl);
//   preSelectionRange.setEnd(range.startContainer, range.startOffset);
//   var start = preSelectionRange.toString().length;

//   return {
//     start: start,
//     end: start + range.toString().length
//   };
// }

// function restoreSelection(containerEl, savedSel) {
//   var charIndex = 0,
//     range = document.createRange();
//   range.setStart(containerEl, 0);
//   range.collapse(true);
//   var nodeStack = [containerEl],
//     node,
//     foundStart = false,
//     stop = false;

//   while (!stop && (node = nodeStack.pop())) {
//     if (node.nodeType === 3) {
//       var nextCharIndex = charIndex + node.length;
//       if (
//         !foundStart &&
//         savedSel.start >= charIndex &&
//         savedSel.start <= nextCharIndex
//       ) {
//         range.setStart(node, savedSel.start - charIndex);
//         foundStart = true;
//       }
//       if (
//         foundStart &&
//         savedSel.end >= charIndex &&
//         savedSel.end <= nextCharIndex
//       ) {
//         range.setEnd(node, savedSel.end - charIndex);
//         stop = true;
//       }
//       charIndex = nextCharIndex;
//     } else {
//       var i = node.childNodes.length;
//       while (i--) {
//         nodeStack.push(node.childNodes[i]);
//       }
//     }
//   }

//   var sel = window.getSelection();
//   sel.removeAllRanges();
//   sel.addRange(range);
// }

// class SpanWrap {
//   constructor({ data, api }) {
//     this.data = (data.text && data) || { text: "" };
//     this.api = api;
//     this.isCompositing = false;
//     this.render();
//   }
//   static get toolbox() {
//     return {
//       title: "Image",
//       icon:
//         '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
//     };
//   }

//   _make(tagName, classNames = null, attributes = {}) {
//     const el = document.createElement(tagName);

//     if (Array.isArray(classNames)) {
//       el.classList.add(...classNames);
//     } else if (classNames) {
//       el.classList.add(classNames);
//     }

//     for (const attrName in attributes) {
//       el[attrName] = attributes[attrName];
//     }

//     return el;
//   }

//   save() {
//     return Object.assign(this.data, {
//       text: this._elem.textContent || ""
//     });
//   }

//   render() {
//     const container = this._make("div", null, {
//       contentEditable: !this.readOnly,
//       innerHTML: this.data.text
//     });

//     this._elem = container;
//     this.api.listeners.on(this._elem, "compositionstart", (event) => {
//       this.isCompositing = true;
//     });
//     this.api.listeners.on(this._elem, "compositionend", (event) => {
//       this.isCompositing = false;
//     });
//     this.api.listeners.on(this._elem, "input", (event) => {
//       if (this.isCompositing) return;
//       const target = event.target;
//       const selection = saveSelection(target);
//       this._elem.innerHTML = event.target.textContent.replace(
//         /大太阳/g,
//         '<span style="color:red">大太阳</span>'
//       );
//       restoreSelection(target, selection);
//     });
//     return container;
//   }
// }

// const editor = new EditorJS({
//   /**
//    * Id of Element that should contain Editor instance
//    */
//   holder: "test",
//   tools: {
//     wrapper: SpanWrap
//   },
//   onChange: function () {
//     editor.save().then(console.log);
//   }
// });
