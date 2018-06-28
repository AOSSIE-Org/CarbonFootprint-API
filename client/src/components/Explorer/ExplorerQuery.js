import React, { Component } from 'react';
import { Segment, Form, TextArea } from 'semantic-ui-react';

/* Extended react.Component class as ExplorerQuery */
export default class ExplorerQuery extends Component {

  /**
   * Constructor for the ExplorerQuery class
   * @constructor extends react.Component
   */
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: '',
      query: {}
    };
    this.handleInput = this.handleInput.bind(this);
  }

  /**
   * Function to handle the input.
   * @param {object} e Event Object
   * @param {object} value Value
   */
  handleInput(e, {value}){
    this.setState({query: JSON.parse(value)});
    this.props.queryUpdate(this.state.query);
  }

  /**
   * Inherited function from react.Component to render to DOM object into html
   */
  render() {
    return (
        <Segment style={styles.body}>
          <Form>
            <TextArea autoHeight style={styles.textArea} value={this.props.query} onChange={this.handleInput}/>
          </Form>
        </Segment>
    );
  }
}

const styles = {
  body: {
    backgroundColor: '#F6F7F9',
    minHeight: '100%'
  },
  textArea: {
    minHeight: 500,
    backgroundColor: '#F6F7F9',
    fontSize: '16px',
    color: '#626364',
    border: 'none'
  }
};