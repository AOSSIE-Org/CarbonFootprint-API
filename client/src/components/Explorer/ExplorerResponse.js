import React, { Component } from 'react';
import { Segment, Form, TextArea } from 'semantic-ui-react';

/* Extended react.Component class as ExplorerResponse */
export default class ExplorerResponse extends Component {
  /**
   * Inherited function from react.Component.
   * This method is invoked before rendering when new props or state are being received.
   *
   * @param nextProps the next Props received from Parent
   * @param nextState the next State
   * @returns {boolean} whether should update or not
   */
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.response && Object.keys(nextProps.response).length > 0;
  }

  /**
   * Function to format the JSON
   * @param input the unformatted JSON
   * @param space the space value
   * @returns {string} formatted JSON
   */
  formatJSON(input, space) {
    return (input.length === 0) ? '' : JSON.stringify(input, null, space);
  }

  /**
   * Inherited function from react.Component to render to DOM object into html
   */
  render() {
    // formatting the JSON
    let outputText = this.formatJSON(this.props.response, 4);
    return (
        <Segment style={styles.body} raised>
          <Form>
            <TextArea autoHeight style={styles.textArea} value={outputText} readOnly/>
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
    border: 'none',
    color: 'green'
  }
};