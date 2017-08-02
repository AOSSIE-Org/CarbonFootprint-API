import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ProfilePicture from './ProfilePicture';
import ProfileSettings from './ProfileSettings';
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
            <ProfilePicture
              name={localStorage.getItem('email').match((/([\w.]+)@/))[1]}
              email={localStorage.getItem('email')}
            />
            <Sidebar />
          </Grid.Column>

          <Grid.Column width={10}>
            <ProfileSettings />
          </Grid.Column>

        </Grid.Row>
      </Grid>
    );
  }
}
