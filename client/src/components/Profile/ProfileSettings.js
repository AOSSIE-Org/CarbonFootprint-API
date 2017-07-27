import React, { Component } from 'react';
import {
  Grid,
  Header,
  Input,
  Segment,
  Button,
  Icon,
  Divider,
  Statistic
} from 'semantic-ui-react';

import { getKey, createKey, deleteKey } from './profileController';

export default class Sidebar extends Component {
  constructor() {
    super();
    this.state = { key: false };
    this.createAccessKey = this.createAccessKey.bind(this);
    this.deleteAccessKey = this.deleteAccessKey.bind(this);
  }

  componentDidMount() {
    getKey().then(data => {
      console.log(data);
      if (data.success) {
        this.setState({
          key: data.apikey
        });
      }
    });
  }

  createAccessKey() {
    // const self = this;
    createKey().then(data => {
      console.log(data);
      if (data.success) {
        this.setState({
          key: data.apikey
        });
      }
    });
  }

  deleteAccessKey() {
    const self = this;
    deleteKey().then(data => {
      console.log(data);
      if (data.success) {
        this.setState({
          key: false
        });
      }
    });
  }

  render() {
    return (
      <Segment>
        <Header as="h3">
          <Icon name="settings" />
          <Header.Content>
            Account Settings
            <Header.Subheader>Manage your preferences</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Grid divided textAlign="center" columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Statistic size="mini" value="1000" label="Requests Allowed" />
            </Grid.Column>
            <Grid.Column>
              <Statistic size="mini" value="670" label="Requests Left" />
            </Grid.Column>
            <Grid.Column>
              <Statistic size="mini" value="5H" label="Time to reset" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Input
          disabled
          fluid
          action={
            !this.state.key
              ? <Button primary onClick={this.createAccessKey}>
                  CREATE API KEY
                </Button>
              : <Button onClick={this.deleteAccessKey} color="red">
                  DELETE KEY
                </Button>
          }
          placeholder="Generate an API access key here"
          value={this.state.key || ''}
          style={{ opacity: 1 }}
        />
      </Segment>
    );
  }
}
