import { default as React } from 'react';
import ReactDOM from 'react-dom';
import CopytoClipboard from './CopytoClipboard';

export default class Clipboard {

  static get toolbox() {
    return {
      icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>`,
      title: 'Clipboard',
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;
    this.data = {
      events: data.events || [],
    };

    this.CSS = {
      wrapper: 'walkthrough-timeline',
    };

    this.nodes = {
      holder: null,
    };
  }

  render() {
    const rootNode = document.createElement('div');
    rootNode.setAttribute('class', this.CSS.wrapper);
    this.nodes.holder = rootNode;

    const onDataChange = (newData) => {
      this.data = {
        ...newData
      };
    }

    ReactDOM.render(
      (
        <CopytoClipboard
          onDataChange={onDataChange}
          readOnly={this.readOnly}
          data={this.data} />
      ),
      rootNode);

    return this.nodes.holder;
  }

  save() {
    return this.data;
  }
}
