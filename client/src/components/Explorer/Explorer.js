import React, { Component } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';
import ExplorerRequest from './ExplorerRequest';
import ExplorerQuery from './ExplorerQuery';
import ExplorerResponse from './ExplorerResponse';
import ExplorerParams from './ExplorerParams';
import { Link } from 'react-router-dom';
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
      query: '',
      response: '',
      params: []
    };

    this.queryUpdate = this.queryUpdate.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleURL = this.handleURL.bind(this);
    this.paramsUpdate = this.paramsUpdate.bind(this);
  }

  /**
   * Function to handle the URL
   * @param URL the updated URL
   */
  handleURL(URL) {
    this.setState({url: URL});
  }

  /**
   * Function to handle the Response
   * @param receivedResponse the response for the query
   */
  handleResponse(receivedResponse) {
    this.setState({response: receivedResponse});
  }

  /**
   * Function to update the query
   * @param updatedQuery the updated Query
   */
  queryUpdate(updatedQuery) {
    this.setState({query: updatedQuery});
  }


  /**
   * Function to update the params
   * @param updatedParams the updated Params
   */
  paramsUpdate(updatedParams) {
    this.setState({params: updatedParams});
  }

  /**
   * Inherited function from react.Component to render to DOM object into html
   */
  render() {
    return (
        <div>
          <Grid centered textAlign="left">
            <Grid.Row columns={1}>
              <ExplorerRequest
                  key={this.state.key}
                  handleURL={this.handleURL}
                  method={this.state.method}
                  handleResponse={this.handleResponse}
                  query={this.state.query}
                  paramsUpdate={this.paramsUpdate}
              />
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column width={4}>
                <ExplorerParams
                    query={this.state.query}
                    url={this.state.url}
                    queryUpdate={this.queryUpdate}
                    params={this.state.params}
                />
              </Grid.Column>
              <Grid.Column width={7}>
                <ExplorerQuery
                    queryUpdate={this.queryUpdate}
                    query={JSON.stringify(this.state.query)}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <ExplorerResponse
                    response={this.state.response}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br />
          <div style={styles.div}>
            <Modal trigger={<Button style={styles.button}> Get Code </Button>} closeIcon>
              <Modal.Header>Generate Code</Modal.Header>
              <Modal.Content>
                <SnippetModal
                    url={this.state.url}
                    method={this.state.method}
                    query={JSON.stringify(this.state.query)}
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