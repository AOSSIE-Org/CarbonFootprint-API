import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ProfilePicture from './ProfilePicture';
import ProfileSettings from './ProfileSettings';
import Sidebar from './Sidebar';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: '',
      name: '',
      email: ''
    }
    this.props.auth.getProfile((err, profile) => {
      console.log(profile)
      if(!err){
        this.setState({
          profilePicture: profile.picture,
          name: profile.email,
          email: profile.email
        })
      }
    })
  }

  render() {
    return (
      <Grid centered textAlign="left">
        <Grid.Row>

          <Grid.Column width={3}>
            <ProfilePicture
              url={'https://image.flaticon.com/icons/svg/149/149071.svg'}
              name={this.state.name.match(/([\w.]*)@?/)[1]}
              email={this.state.email}
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
