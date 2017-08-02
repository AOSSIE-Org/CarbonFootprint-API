import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default class ProfilePicture extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card>
        <div style={styles.imageContainer}>
          <div
            style={{
              width: '40%',
              paddingTop: '40%',
              borderRadius: '50%',
              background: `url(${this.props.url}) center center / cover`
            }}
          />
        </div>
        <Card.Content>
          <Card.Header>
            {this.props.name}
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
