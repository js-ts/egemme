export default class TextColor {
  static get isInline() {
    return true;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;

    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }

  constructor({ api }) {
    this.api = api;
    this.button = null;
    this._state = false;

    this._INTERNAL = {
      showPicker: false
    };

    this.tag = "SPAN";
    this.class = "cdx-color";
  }

  render() {
    this.button = document.createElement("button");
    this.button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48">
      <path d="M0 0h48v48h-48z" fill="none"/>

      <path d="M0 40h48v8h-48z" id="plugin-icon-textColor" fill-opacity="100" />
      <path d="M22 6l-11 28h4.5l2.25-6h12.5l2.25 6h4.5l-11-28h-4zm-2.75 18l4.75-12.67 4.75 12.67h-9.5z"/>
    </svg>
    `;

    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  surround(range) {
    if (this.state) {
      this.unwrap(range);
      return;
    }

    this.wrap(range);
  }

  wrap(range) {
    const selectedText = range.extractContents();
    const mark = document.createElement(this.tag);

    mark.classList.add(this.class);
    mark.appendChild(selectedText);
    range.insertNode(mark);

    this.api.selection.expandToTag(mark);
  }

  unwrap(range) {
    const mark = this.api.selection.findParentTag(this.tag, this.class);
    const text = range.extractContents();

    mark.remove();

    if (this._INTERNAL.showPicker) {
      this.colorPicker.click();
      this._INTERNAL.showPicker = false;
    }

    range.insertNode(text);
  }

  checkState() {
    const mark = this.api.selection.findParentTag(this.tag, this.class);

    this.state = !!mark;

    if (this.state) {
      this.showActions(mark);
    } else {
      this.hideActions();
    }
  }

  renderActions() {
    this.colorPicker = document.createElement("input");
    this.colorPicker.type = "color";
    this.colorPicker.hidden = true;

    return this.colorPicker;
  }

  showActions(mark) {
    const { color } = mark.style;
    this.colorPicker.value = color ? this.convertToHex(color) : "red";

    this.colorPicker.click();
    this._INTERNAL.showPicker = true;

    this.colorPicker.onchange = () => {
      const icon = this.button.querySelector("#plugin-icon-textColor");
      mark.style.color = this.colorPicker.value;
      icon.style.fill = this.colorPicker.value;
    };
  }

  hideActions() {
    this.colorPicker.onchange = null;
  }

  getIconFill() {
    const icon = this.button.querySelector("#plugin-icon-textColor");
    return icon.style.fill || "#000000";
  }

  convertToHex(color) {
    const rgb = color.match(/(\d+)/g);

    let hexr = parseInt(rgb[0]).toString(16);
    let hexg = parseInt(rgb[1]).toString(16);
    let hexb = parseInt(rgb[2]).toString(16);

    hexr = hexr.length === 1 ? "0" + hexr : hexr;
    hexg = hexg.length === 1 ? "0" + hexg : hexg;
    hexb = hexb.length === 1 ? "0" + hexb : hexb;

    return "#" + hexr + hexg + hexb;
  }

  static get sanitize() {
    return {
      span: {
        class: "cdx-color",
        style: {
          color: "red"
        }
      }
    };
  }
}
