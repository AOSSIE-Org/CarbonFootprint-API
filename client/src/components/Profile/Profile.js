import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ProfilePicture from './ProfilePicture';
import ProfileSettings from './ProfileSettings';
import Sidebar from './Sidebar';
import DailyEmission from './DailyEmission';
import { setUserName } from '../../Sentry/logger'
import GoogleFit from './GoogleFit';
import './Profile.css'

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
    };
  }

  /**
   * Inherit function from react.Component to handle after mounting
   *   react component
   */

  componentDidMount() {
    this.props.auth
      .getProfile()
      .then(profile => {
        this.setState({
          profile: profile,
          profilePicture: profile.picture,
          nickname: profile.nickname,
          email: profile.email,
          userid: profile.sub,
          given_name: profile.given_name,
          family_name: profile.family_name
        });
        setUserName(profile.nickname);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Inherited function from react.Component to render to DOM object into html
   */

  render() {
    return (
      <Grid className="chartwidth profile-home-grid">
        <Grid.Row>
          <Grid.Column mobile={16} tablet={3} computer={3}>
            <ProfilePicture
              profilePicture={this.state.profilePicture}
              nickname={this.state.nickname}
              email={this.state.email}
              auth={this.props.auth}
              profile={this.state.profile}
            />
            <Sidebar />
            <GoogleFit auth={this.props.auth} />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={10} computer={10}>
            <ProfileSettings auth={this.props.auth} />
            <DailyEmission />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
