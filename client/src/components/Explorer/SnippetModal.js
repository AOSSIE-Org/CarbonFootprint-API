import React, { Component } from 'react';
import { Segment, Form, TextArea, Dropdown, Divider, Button } from 'semantic-ui-react';
import HTTPSnippet from 'httpsnippet';

/* Extended react.Component class as SnippetModal */
export default class SnippetModal extends Component {

  /**
   * Constructor for the SnippetModal class
   * @constructor extends react.Component
   */
  constructor(props) {
    super(props);
    this.state = {
      params: this.props.params,
      method: this.props.method,
      url: this.props.url,
      key: this.props.accessKey,
      language: options[0].value,
      snippet: '',
      textCopied: false
    };
    this.getSnippet = this.getSnippet.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  /**
   * Inherit function from react.Component to handle after mounting
   * react component
   */
  componentDidMount() {
    this.getSnippet(this.state.language);
  }

  /**
   * Function to handle the change in dropdown.
   * @param {object} e Event Object
   * @param {string} value Value of the selected language
   */
  handleChange(e, {value}) {
    this.setState({language: value});
    this.getSnippet(value);
  }

  /**
   * Function to generate snippet as per the target language.
   * @param {string} value Value of the selected language
   */
  getSnippet(value) {
    if (this.state.method && this.state.url && this.state.key) {
      let snippet = new HTTPSnippet({
        method: this.state.method,
        url: this.state.url,
        httpVersion: 'HTTP/1.1',
        headers: [
          {name: 'Content-Type', value: 'application/json'},
          {name: 'access-key', value: this.state.key},
          {name: 'cache-control', value: 'no-cache'}
        ],
        postData: {
          mimeType: 'text/json',
          text: `${JSON.stringify(this.state.params)}`
        }
      });
      this.setState({
        // generates the snippet as per target language and stores in this.state.snippet
        snippet: snippet.convert(value, {
          indent: '\t'
        }),
        textCopied: false
      });
    }
  }

  /**
   * Function to copy the value from snippet area to clipboard
   */
  copyToClipboard() {
    let textField = document.createElement('textarea');
    textField.innerText = this.state.snippet;
    document.body.appendChild(textField);
    textField.focus();
    textField.select();
    document.execCommand('copy');
    textField.remove();
    this.setState({textCopied: true});
    setTimeout(() => {
      this.setState({textCopied: false});
    }, 2500);
  }

  /**
   * Inherited function from react.Component to render to DOM object into html
   */
  render() {
    return (
        <Segment style={styles.body}>
          <div style={styles.div}>
            <Dropdown item scrolling options={options}
                      defaultValue={options[0].value}
                      style={styles.dropdown} onChange={this.handleChange}
            />
            {!this.state.textCopied
                ?
                this.state.snippet && document.queryCommandSupported('copy') &&
                <Button
                    content='Copy to Clipboard'
                    style={styles.buttonCopy}
                    onClick={this.copyToClipboard}
                />
                :
                <Button
                    content='Copied!'
                    style={styles.buttonCopied}
                />}
          </div>
          <Divider/>
          <Form>
                    <TextArea autoHeight style={styles.textArea} readOnly
                              value={this.state.snippet}/>
          </Form>
        </Segment>
    );
  }
}

const options = [
  {text: 'Go', value: 'go'},
  {text: 'Java', value: 'java'},
  {text: 'cURL', value: 'shell'},
  {text: 'Javascript', value: 'javascript'},
  {text: 'Node.js', value: 'node'},
  {text: 'Objective-C', value: 'objc'},
  {text: 'OCaml', value: 'ocaml'},
  {text: 'PHP', value: 'php'},
  {text: 'Python', value: 'python'},
  {text: 'Ruby', value: 'ruby'},
  {text: 'Clojure', value: 'clojure'},
  {text: 'Swift', value: 'swift'},
  {text: 'C#', value: 'csharp'},
  {text: 'C', value: 'c'}
];

const styles = {
  body: {
    backgroundColor: 'white',
    minHeight: '100%',
  },
  textArea: {
    backgroundColor: '#F6F7F9',
    height: 400,
    fontSize: '16px',
    border: 'none',
    color: '#626364'
  },
  dropdown: {
    height: '50px !important',
    fontSize: '16px',
    color: '#2980b9'
  },
  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonCopy: {
    backgroundColor: '#2980b9',
    color: 'white',
    fontSize: '14px',
    width: '200px'
  },
  buttonCopied: {
    backgroundColor: '#10ad21',
    color: 'white',
    fontSize: '14px',
    width: '200px'
  }
};