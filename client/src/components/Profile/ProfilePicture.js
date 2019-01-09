import React, { Component } from 'react';
import { Card, Icon, Button, Responsive } from 'semantic-ui-react';
import ProfileEdit from './ProfileEdit';
import { Link } from "react-router-dom";


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
          <Card.Meta style={{
            display: "inline-flex",
            overflowX: "hidden",
            width: "100%"
          }}>
            {this.props.email}
          </Card.Meta>
          <Responsive {...Responsive.onlyMobile}>
            <Card.Meta style={{ textAlign: "center", marginTop: "10px" }}>
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
