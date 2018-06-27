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
      key: false,
      error: false,
      errorMessage: '',
      quer: {}
    };
    this.handleInput = this.handleInput.bind(this);
  }

  // /**
  //  * Function to handle the change in textboxes.
  //  * @param {object} event Event Object
  //  */
  // handleChange (event) {
  //   this.setState({ [event.target.name]: event.target.value });
  //   this.props.passData(event.target.name, event.target.value);
  // }

  handleInput(e, {value}){
    this.setState({quer: JSON.parse(value)});
    this.props.queryUpdate(this.state.quer);
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