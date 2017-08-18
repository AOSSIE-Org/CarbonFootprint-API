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
   * Enherit function from react.Component to handle after mounting
   *   react component
   */

  componentDidMount(){
    this.props.auth.getProfile((err, profile) => {
      if(!err){
        this.props.auth.getMetaProfile(profile.sub,(err,metaProfile)=>{
          if(!err){
            metaProfile = JSON.parse(metaProfile);
            this.setState({nickname:metaProfile["user_metadata"].nickname});
          }
        });
      }
    });
  }

  /** 
   * Enherited function from react.Component to render to DOM object into html
   */

  render() {
     const { auth } = this.props;
    return (
      <Card>
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
        <Card.Content style={{fontSize:'15px'}}>
          <Card.Header>
            {this.state.nickname || this.props.nickname} <ProfileEdit auth={auth} />
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
