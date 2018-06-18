import React, { Component } from 'react';
import { Segment, Form, TextArea } from 'semantic-ui-react';

/* Extended react.Component class as ExplorerResponse */
export default class ExplorerResponse extends Component {

  /**
   * Constructor for the ExplorerResponse class
   * @constructor extends react.Component
   */
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: '',
      response: ''
    };
  }

  /**
   * Inherited function from react.Component to render to DOM object into html
   */
  render() {
    return (
        <Segment style={styles.body} raised>
          <Form>
            <TextArea autoHeight style={styles.textArea} readOnly/>
          </Form>
        </Segment>
    );
  }
}

const styles = {
  body: {
    backgroundColor: 'white',
    minHeight: '100%',
  },
  textArea: {
    minHeight: 500,
    fontSize: '16px',
    border: 'none'
  }
};