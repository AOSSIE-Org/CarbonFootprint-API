import React, { Component } from 'react';
import { Card, Icon, Button, Responsive } from 'semantic-ui-react';
import ProfileEdit from './ProfileEdit';
import { Link } from "react-router-dom";
import './Profile.css'


/* Extended react.Component class as ProfilePicture */

export default class ProfilePicture extends Component {

  /**
   * Constructor for the ProfilePicture class
   * @constructor extends react.Component
   */

  constructor(props) {
    super(props);
    this.state = {
      nickname: ""
    }
  }

  /** 
   * Inherit function from react.Component to handle after mounting
   *   react component
   */

  componentDidUpdate(nextProps) {
    if (nextProps.nickname !== this.state.nickname) {
      this.setState({ nickname: nextProps.nickname });
    }
  }

  /** 
   * Inherited function from react.Component to render to DOM object into html
   */

  render() {
    const { auth } = this.props;
    return (
      <Card fluid raised>
        <div className="profile-picture-image-container">
          <div
            style={{
              width: '40%',
              paddingTop: '40%',
              borderRadius: '50%',
              background: `url(${this.props.profilePicture}) center center / cover`
            }}
          />
        </div>
        <Card.Content className="profile-card-content">
          <Card.Header>
            {this.state.nickname || this.props.nickname} <ProfileEdit auth={auth} profile={this.props.profile} />
          </Card.Header>
          <Card.Meta className="profile-picture-email">
            {this.props.email}
          </Card.Meta>
          <Responsive {...Responsive.onlyMobile}>
            <Card.Meta className="profile-picture-meta">
              <Button as={Link} to="/profile/enter" color="twitter" ref="entryModal">
                <Icon name="add" />
                Today's entry
              </Button>
            </Card.Meta>
          </Responsive>
        </Card.Content>
      </Card>
    );
  }
}

const styles = {
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    background: '#3498db',
    height: '110px'
  }
};
