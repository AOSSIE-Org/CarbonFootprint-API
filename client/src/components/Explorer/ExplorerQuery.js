import React, { Component } from 'react';
import { Segment, Form, TextArea, Message } from 'semantic-ui-react';

/* Extended react.Component class as ExplorerQuery */
export default class ExplorerQuery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key: false,
      error: false,
      errorMessage: '',
      query: '{}',
      data: {}
    };
    this.handleInput = this.handleInput.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  handleInput(e, {value}) {
    this.setState({query: JSON.parse(value)});
    this.props.queryUpdate(this.state.query);
  }

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
    } catch (err) {
      // JSON.parse threw an exception
      this.setState({
        error: true,
        errorMessage: err.message
      });
    }
  }

  render() {
    return (
        <Segment style={styles.body}>
          {this.state.error &&
          <Message negative size='tiny'>
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
                      autofocus='true'/>
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

