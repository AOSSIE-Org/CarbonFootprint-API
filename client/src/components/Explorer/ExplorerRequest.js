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
      key: this.props.accessKey,
      error: false,
      errorMessage: '',
      method: this.props.method,
      url: this.props.url
    };
    this.executeQuery = this.executeQuery.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Inherit function from react.Component handle props from parent
   * react component
   */
  componentWillReceiveProps(nextProps){
    this.setState({key: nextProps.accessKey});
  }

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
   * Function to handle the change in textboxes.
   * @param {object} event Event Object
   * @param {object} data Data Object
   */
  handleChange (event, data) {
    let value = event.target.value || data.value;
    let key = event.target.name || data.name;
    this.setState({[key]: value});
    this.props.passData(key, value);
  }

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
                <Input name='key'
                       value={this.state.key}
                       label={{basic: true, content: 'API Key: '}}
                       labelPosition='left'
                       style={styles.inputKey}
                       onChange={this.handleChange}
                />
              </Form.Group>
            </div>
            <div style={styles.div}>
              <Form.Group style={styles.form}>
                <Dropdown name='method'
                          placeholder='Method'
                          options={options}
                          defaultValue={options[1].value}
                          style={styles.dropdown}
                          onChange={this.handleChange}
                />
                <Input name='url'
                       value={this.state.url}
                       label={<label style={styles.label}>http://carbonhub.xyz/v1/</label>}
                       style={styles.inputUrl}
                       onChange={this.handleChange}
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