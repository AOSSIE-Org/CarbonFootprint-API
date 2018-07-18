import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import ProfileEdit from './ProfileEdit'


/* Extended react.Component class as ProfilePicture */

export default class ProfilePicture extends Component {

  /**
   * Constructor for the ProfilePicture class
   * @constructor extends react.Component
   */

  constructor(props){
    super(props);
    this.state = {
      nickname:""
    }
  }

  /** 
   * Inherit function from react.Component to handle after mounting
   *   react component
   */

  componentWillReceiveProps(nextProps){
    if(nextProps.nickname != this.state.nickname){
      this.setState({nickname:nextProps.nickname});
    }
  }

  /** 
   * Inherited function from react.Component to render to DOM object into html
   */

  render() {
     const { auth } = this.props;
    return (
      <Card fluid raised>
        <div style={styles.imageContainer}>
          <div
            style={{
              width: '40%',
              paddingTop: '40%',
              borderRadius: '50%',
              background: `url(${this.props.profilePicture}) center center / cover`
            }}
          />
        </div>
        <Card.Content style={{fontSize:'15px', wordWrap:'break-word'}}>
          <Card.Header>
            {this.state.nickname || this.props.nickname} <ProfileEdit auth={auth} profile={this.props.profile} />
          </Card.Header>
          <Card.Meta>
            {this.props.email}
          </Card.Meta>
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
