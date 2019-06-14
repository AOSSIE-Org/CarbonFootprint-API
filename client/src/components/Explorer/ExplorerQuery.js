import React, { Component } from 'react';
import { Segment, Form, TextArea, Message } from 'semantic-ui-react';

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
      query: '{}',
      data: {}
    };
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  /**
   * Inherited function from react.Component.
   * This method is invoked when new props are being received.
   *
   * @param nextProps the next Props received from Parent
   */
  componentWillReceiveProps(nextProps){
    if(nextProps.query && nextProps.query!==`""`) {
      this.setState({
        query: nextProps.query,
        data: JSON.parse(nextProps.query)
      });
    }
  }

  /**
   * Function to handle the change in query.
   * @param {object} event Event Object
   */
  onQueryChange(event){
    let val = event.target.value;
    this.setState({query: val});
    try {
      // Checking if JSON is valid
      let parsedData = JSON.parse(val);
      this.setState({
        error: false,
        errorMessage: '',
        data: parsedData
      });
      this.props.queryUpdate(parsedData);
    } catch (err) {
      // JSON.parse threw an exception
      this.setState({
        error: true,
        errorMessage: err.message
      });
    }
  }

  /**
   * Inherited function from react.Component to render to DOM object into html
   */
  render() {
    return (
        <Segment style={styles.body} raised>
          {this.state.error &&
          <Message negative size='mini'>
            <Message.Header>
              {this.state.errorMessage}
            </Message.Header>
          </Message>}
          <Form>
            <TextArea autoHeight
                      style={styles.textArea}
                      onChange={this.onQueryChange}
                      value={this.state.query}
                      placeholder='Enter the JSON here'
                      autoFocus='true'/>
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
