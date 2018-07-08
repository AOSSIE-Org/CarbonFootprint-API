import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Button, Grid, Segment, Divider } from 'semantic-ui-react';
import ProfileSettings from '../Profile/ProfileSettings';
import ProfilePicture from '../Profile/ProfilePicture';
import Sidebar from '../Profile/Sidebar';
import Structured from './Structured';
import Unstructured from './Unstructured';

/* Extended react.Component class as DataUpload */

export default class DataUpload extends Component {

  /**
* Constructor for the DataUpload class
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
   * Function to handle click of structured data or unstructured data
   * @param compName name of the component
   */
  handleClick(compName, e) {
    this.setState({ render: compName });

  }

  /**
   * Function to render the respective component clicked
   */
  _renderSubComp(){
      switch(this.state.render){
        case 'structured' : return <Redirect to="/structured" />
        case 'unstructured' : return <Redirect to="/unstructured" />
      }
  }

/**
   * Inherited function from react.Component.
   * This method is invoked immediately after a component is mounted
   */
  componentDidMount() {
    this.props.auth.getProfile()
      .then((profile) => {
        this.setState({
          profile: profile,
          profilePicture: profile.picture,
          nickname: profile.nickname,
          email: profile.email,
          userid: profile.sub,
          given_name: profile.given_name,
          family_name: profile.family_name
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
              nickname={this.state.nickname}
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
            <Segment style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button size='massive' color='blue' onClick={this.handleClick.bind(this, 'structured')} >Structured Data</Button>
                <Divider horizontal>OR</Divider>
                <Button size='massive' color='blue' onClick={this.handleClick.bind(this, 'unstructured')} >Unstructured Data</Button>
                {this._renderSubComp()}
              </div>
            </Segment>
          </Grid.Column>

        </Grid.Row>
      </Grid>
    )
  }
}