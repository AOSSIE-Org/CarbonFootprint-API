import React, { Component } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import ExplorerRequest from './ExplorerRequest';
import ExplorerQuery from './ExplorerQuery';
import ExplorerResponse from './ExplorerResponse';
import ExplorerParams from './ExplorerParams';
import SnippetModal from './SnippetModal';
import { getKey } from '../Profile/profileController';

/* Extended react.Component class as Explorer */
export default class Explorer extends Component {

  /**
   * Constructor for the Explorer class
   * @constructor extends react.Component
   */
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      url: '',
      method: 'POST',
      query: {},
      params: {}
    };
    this.getDataFromChild = this.getDataFromChild.bind(this);
  }

  /**
   * Inherit function from react.Component to handle after mounting
   * react component
   */
  componentDidMount() {
    getKey().then(data => {
      if (data.success) {
        this.setState({key: data.apikey});
      }
    })
  }

  /**
   * Function to get the data from child components
   * @param name the name of the state
   * @param value the value of the state
   */
  getDataFromChild(name, value){
    this.setState({[name]: value});
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
                  accessKey={this.state.key}
                  url={this.state.url}
                  method={this.state.method}
                  passData={this.getDataFromChild}
              />
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column width={4}>
                <ExplorerParams
                    accessKey={this.state.key}
                    params={this.state.params}
                />
              </Grid.Column>
              <Grid.Column width={7}>
                <ExplorerQuery
                    accessKey={this.state.key}
                    query={this.state.query}
                    passData={this.getDataFromChild}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <ExplorerResponse
                    accessKey={this.state.key}
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