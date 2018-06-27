import React, { Component } from 'react';
import { Grid, Button, Modal, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import ExplorerRequest from './ExplorerRequest';
import ExplorerQuery from './ExplorerQuery';
import ExplorerResponse from './ExplorerResponse';
import ExplorerParams from './ExplorerParams';
import SnippetModal from './SnippetModal';

/* Extended react.Component class as Explorer */
export default class Explorer extends Component {

  /**
   * Constructor for the Explorer class
   * @constructor extends react.Component
   */
  constructor(props) {
    super(props);
    this.state = {
      key: false,
      url: '',
      method: 'POST',
      query: {},
      params: {},
      response: ''
    };

    // this.getDataFromChild = this.getDataFromChild.bind(this);

    this.queryUpdate = this.queryUpdate.bind(this);
    this.runInPostman = this.runInPostman.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleURL = this.handleURL.bind(this);
  }

  /**
   * Inherit function from react.Component to handle after mounting
   * react component
   */
  componentDidMount() {}

  handleURL(URL){
    this.setState({url: URL});
  }

  handleResponse(receivedRes){
    this.setState({response: receivedRes});
  }

  queryUpdate(updatedQuery) {
    this.setState({query: updatedQuery});
  }

  /**
   * Inherited function from react.Component to render to DOM object into html
   */
  render() {
    return (
        <div>
          <Grid centered textAlign='left'>
            <Grid.Row columns={1}>
              <ExplorerRequest
                  key={this.state.key}
                  {/*url={this.state.url}*/}
                  method={this.state.method}
                  handleURL={this.handleURL}
                  handleResponse = {this.handleResponse}
                  query = {this.state.query}
                  {/*passData={this.getDataFromChild}*/}
              />
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column width={4}>
                <ExplorerParams
                    key={this.state.key}
                    {/*params={this.state.params}*/}
                    query = {this.state.query}
                    url = {this.state.url}
                    queryUpdate = {this.queryUpdate}
                />
              </Grid.Column>
              <Grid.Column width={7}>
                <ExplorerQuery
                    key={this.state.key}
                    {/*query={this.state.query}*/}
                    params = {this.state.params}
                    queryUpdate ={this.queryUpdate}
                    url = {this.state.url}
                    query={JSON.stringify(this.state.query)}
                    {/*passData={this.getDataFromChild}*/}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <ExplorerResponse
                    key={this.state.key}
                    query={this.state.query}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br/>
          <div style={styles.div}>
            <Modal trigger={<Button style={styles.button}> Get Code </Button>} closeIcon>
              <Modal.Header>Generate Code</Modal.Header>
              <Modal.Content>
                <SnippetModal
                    accessKey={this.state.key}
                    url={this.state.url}
                    method={this.state.method}
                    query={this.state.query}
                />
              </Modal.Content>
            </Modal>
            <Link to='https://app.getpostman.com/run-collection/9f30a9efdc0b87ca59af' target="_blank">
              <Button
                  content='Run in Postman'
                  style={styles.button}
              />
            </Link>
          </div>
        </div>
    );
  }
}

const styles = {
  button: {
    backgroundColor: '#2980b9',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};