import createElement from "./createElement";


function createSelect(options, attrs) {
  const $options = options.map(el => createElement("option", el));

  const element = createElement("select", {
    children: $options,
    ...attrs
  });

  return element;
}

const fontsMap = {
  roboto: `Roboto", sans-serif`,
  tnr: `"Times New Roman", Times, serif`,
  courier: `"Courier New", Courier, monospace`,
  opensans: `"Open Sans", sans-serif`,
  ssp: `"Source Sans Pro", sans-serif`
};

export default class FontFamily {
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

    this.tag = "SPAN";
    this.class = "cdx-family";
  }

  render() {
    const icon = createElement("div", {
  innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pen-tool"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`
    });

    this.button = createElement("button", {
      type: "button",
      classList: this.api.styles.inlineToolButton,
      children: [icon]
    });

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
    const wrapper = createElement(this.tag, {
      classList: [this.class],
      children: [selectedText]
    });

    range.insertNode(wrapper);

    this.api.selection.expandToTag(wrapper);
  }

  unwrap(range) {
    const wrapper = this.api.selection.findParentTag(this.tag, this.class);
    const text = range.extractContents();

    wrapper.remove();

    range.insertNode(text);
  }

  checkState() {
    const wrapper = this.api.selection.findParentTag(this.tag, this.class);

    this.state = !!wrapper;

    if (this.state) {
      this.showActions(wrapper);
    } else {
      this.hideActions();
    }
  }

  renderActions() {
    const options = [
      { value: "roboto", innerHTML: "Roboto" },
      {
        value: "tnr",
        innerHTML: "Times New Roman"
      },
      {
        value: "courier",
        innerHTML: "Courier New"
      },
      { value: "opensans", innerHTML: "Open Sans" },
      { value: "ssp", innerHTML: "Source Sans Pro" }
    ];

    this.fontFamily = createSelect(options, {
      hidden: true,
      name: "editorjs-select"
    });

    return this.fontFamily;
  }

  showActions(mark) {
    const { fontFamily } = mark.style;
    this.fontFamily.value =
      Object.keys(fontsMap).find(key => fontsMap[key] === fontFamily) ||
      "roboto";

    this.fontFamily.onchange = () => {
      mark.style.fontFamily = fontsMap[this.fontFamily.value];
    };
    this.fontFamily.hidden = false;
  }

  hideActions() {
    this.fontFamily.onchange = null;
    this.fontFamily.hidden = true;
  }
}
