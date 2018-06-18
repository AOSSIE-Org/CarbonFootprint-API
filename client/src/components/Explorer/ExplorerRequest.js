import React, { Component } from 'react';
import {
  Segment,
  Form,
  Header,
  Button,
  Input,
  Divider,
  Message,
  Responsive,
  Grid
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
        <Responsive as={Segment} raised>
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
          <Grid textAlign='left'>
            <Grid.Row>
              <Grid.Column width={12} mobile={16} tablet={12} computer={12}>
                <Input
                    label={{basic: true, content: 'API Key: '}}
                    labelPosition='left'
                    style={styles.inputKey}
                    fluid
                />
              </Grid.Column>
              <Grid.Column width={4} mobile={16} tablet={4} computer={4}>
                <Button
                    content='Get API Key'
                    onClick={this.getAPIKey}
                    style={styles.buttonGetKey}
                    size='small'
                    fluid
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3} mobile={16} tablet={3} computer={3}>
                <Form.Dropdown
                    placeholder='Method'
                    options={options}
                    defaultValue={options[0].value}
                    style={styles.dropdown}
                    selection
                    className='label'
                />
              </Grid.Column>
              <Grid.Column width={9} mobile={16} tablet={10} computer={9}>
                <Input
                    label={{basic: true, content: 'http://carbonhub.xyz/v1/'}}
                    labelPosition='left'
                    style={styles.inputUrl}
                    fluid
                />
              </Grid.Column>
              <Grid.Column width={4} mobile={16} tablet={3} computer={4}>
                <Button
                    content='RUN'
                    onClick={this.executeQuery}
                    size='small'
                    primary
                    style={styles.buttonRun}
                    fluid
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
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
  buttonGetKey: {
    backgroundColor: '#F6F7F9',
    height: '38px'
  },
  buttonRun: {
    height: '38px'
  },
  inputKey: {
    color: '#626364'
  },
  label: {
    backgroundColor: 'white',
    color: '#2980b9',
    marginLeft: '5px',
    marginRight: '5px',
    fontSize: '16px'
  }
};