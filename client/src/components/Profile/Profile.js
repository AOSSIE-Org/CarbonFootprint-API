import React, { Component } from 'react';
import {
  Grid,
  Input,
  Header,
  Statistic,
  Segment,
  Button,
  Divider,
  Icon
} from 'semantic-ui-react';
import ProfilePicture from './ProfilePicture';
import Sidebar from './Sidebar';

export default class Profile extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Grid centered textAlign="left">
        <Grid.Row>
          <Grid.Column width={3}>
            <ProfilePicture name="Rohit Gupta" email="carbonfootprint@gmail.com"/>
            <Sidebar />
          </Grid.Column>

          <Grid.Column width={10}>
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
                      value="1000"
                      label="Requests Allowed"
                    />
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
                fluid
                action={<Button primary>GET API KEY</Button>}
                placeholder="Generate an API access key here"
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
