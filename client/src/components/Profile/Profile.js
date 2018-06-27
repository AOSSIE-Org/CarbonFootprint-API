import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ProfilePicture from './ProfilePicture';
import ProfileSettings from './ProfileSettings';
import Sidebar from './Sidebar';

/* Extended react.Component class as Profile */

export default class Profile extends Component {

  /**
   * Constructor for the Profile class
   * @constructor extends react.Component
   */

  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      profilePicture: '',
      nickname: '',
      email: '',
      userid: '',
      given_name: '',
      family_name: ''
    }
  }

  /** 
   * Inherit function from react.Component to handle after mounting
   *   react component
   */

  componentDidMount(){
      this.props.auth.getProfile()
          .then((profile) => {
              this.setState({
                  profile: profile,
                  profilePicture: profile.picture,
                  nickname: profile.nickname,
                  email: profile.email,
                  userid: profile.sub,
                  given_name:profile.given_name,
                  family_name:profile.family_name
              });
          })
          .catch((err) => {
              console.log(err);
          });
  }

  /** 
   * Inherited function from react.Component to render to DOM object into html
   */

  render() {
    return (
      <Grid centered textAlign="left">
        <Grid.Row>

          <Grid.Column width={3}>
            <ProfilePicture
              profilePicture={this.state.profilePicture}
              nickname={this.state.nickname }
              email={this.state.email}
              auth={this.props.auth}
              profile={this.state.profile}
            />
            <Sidebar />
          </Grid.Column>

          <Grid.Column width={10}>
            <ProfileSettings
              auth={this.props.auth}
              />
          </Grid.Column>

        </Grid.Row>
      </Grid>
    );
  }
}
