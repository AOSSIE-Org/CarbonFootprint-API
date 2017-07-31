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
    this.state = {
      key: false,
      requestsAllowed: '-',
      requestsLeft: '-',
      timeLeft: '-'
    };
    this.createAccessKey = this.createAccessKey.bind(this);
    this.deleteAccessKey = this.deleteAccessKey.bind(this);
  }

  timeLeftToReset(time) {
    console.log(time);
    const timeLeft = (new Date(time) - new Date()) / 1000; // convert to seconds
    return timeLeft >= 3600
      ? `${Math.floor(timeLeft / 3600)} H`
      : `${Math.ceil(timeLeft / 60)} M`;
  }
  componentDidMount() {
    getKey().then(data => {
      console.log(data);
      if (data.success) {
        this.setState({
          key: data.apikey,
          requestsAllowed: data.requests.allowed,
          requestsLeft: data.requests.left,
          timeLeft: this.timeLeftToReset(data.requests.resetTime)
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
          key: data.apikey,
          requestsAllowed: data.requests.allowed,
          requestsLeft: data.requests.left,
          timeLeft: this.timeLeftToReset(data.requests.resetTime)
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
          key: false,
          requestsAllowed: '-',
          requestsLeft: '-',
          timeLeft: '-'
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
              <Statistic
                size="mini"
                value={this.state.requestsAllowed}
                label="Requests Allowed"
              />
            </Grid.Column>
            <Grid.Column>
              <Statistic
                size="mini"
                value={this.state.requestsLeft}
                label="Requests Left"
              />
            </Grid.Column>
            <Grid.Column>
              <Statistic
                size="mini"
                value={this.state.timeLeft}
                label="Time to reset"
              />
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
