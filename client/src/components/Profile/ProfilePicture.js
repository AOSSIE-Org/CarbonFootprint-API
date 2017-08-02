import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default class ProfilePicture extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card>
        <div style={styles.imageText}>
          <img src={this.props.url} style={{ width: '40%' }} />
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
  imageText: {
    display: 'flex',
    placeContent: 'center',
    width: '100%',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '36px',
    background: '#3498db',
    height: '110px',
    lineHeight: '100px'
  }
};
