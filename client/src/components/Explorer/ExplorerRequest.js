import React, { Component } from 'react';
import {
  Segment,
  Form,
  Header,
  Button,
  Input,
  Divider,
  Message,
  Dropdown
} from 'semantic-ui-react';

/* Extended react.Component class as ExplorerRequest */
export default class ExplorerRequest extends Component {

  /**
   * Constructor for the ExplorerRequest class
   * @constructor extends react.Component
   */
  constructor(props) {
    super(props);
    this.state = {
      key: false,
      error: false,
      errorMessage: '',
      method: 'GET',
      url: ''
    };
    this.getAPIKey = this.getAPIKey.bind(this);
    this.executeQuery = this.executeQuery.bind(this);
  }

  /**
   * Method to retrieve the API Key or generate a new one
   */
  getAPIKey() {};

  /**
   * Method to execute the current query
   */
  executeQuery() {};

  /**
   * Inherit function from react.Component to handle after mounting
   * react component
   */
  componentDidMount() {}

  /**
   * Inherited function from react.Component to render to DOM object into html
   */
  render() {
    return (
        <Segment>
          <Header style={styles.heading} as='h4'>
            <Header.Content>
              API Explorer
            </Header.Content>
          </Header>
          <Divider />
          {this.state.error &&
          <Message warning>
            <Message.Header>
              {this.state.errorMessage}
            </Message.Header>
          </Message>}
          <Form>
            <div style={styles.div}>
              <Form.Group inline style={styles.form}>
                <Input label={{basic: true, content: 'API Key: '}}
                       labelPosition='left'
                       style={styles.inputKey}
                />
              </Form.Group>
              <Button
                  content='Get API Key'
                  onClick={this.getAPIKey}
                  style={styles.button}
                  size='small'
              />
            </div>
            <div style={styles.div}>
              <Form.Group style={styles.form}>
                <Dropdown placeholder='Method'
                          options={options}
                          defaultValue={options[0].value}
                          style={styles.dropdown}
                />
                <Input
                    label={<label style={styles.label}>http://carbonhub.xyz/v1/</label>}
                    style={styles.inputUrl}
                />
              </Form.Group>
              <Button
                  content='RUN'
                  color='blue'
                  onClick={this.executeQuery}
              />
            </div>
          </Form>
        </Segment>
    );
  }
}

const options = [
  {text: 'GET', value: 'get'},
  {text: 'POST', value: 'post'},
  {text: 'PUT', value: 'put'},
  {text: 'DELETE', value: 'delete'}
];

const styles = {
  dropdown: {
    fontWeight: 'bold',
    color: '#2980b9'
  },
  heading: {
    marginLeft: '15px',
    color: '#626364'
  },
  form: {
    marginLeft: '10px'
  },
  button: {
    backgroundColor: '#F6F7F9'
  },
  inputKey: {
    width: '1000px',
    color: '#626364'
  },
  inputUrl: {
    marginLeft: '15px',
    width: '850px'
  },
  div: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  label: {
    backgroundColor: 'white',
    color: '#2980b9',
    marginLeft: '5px',
    marginRight: '5px',
    fontSize: '16px'
  }
};