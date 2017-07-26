import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default class ProfilePicture extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const shortName = this.props.name.split(' ').map(x => x[0]);
    return (
      <Card>
        <div style={styles.imageText}>
          {shortName}
        </div>
        <Card.Content>
          <Card.Header>
            {this.props.name}
          </Card.Header>
          <Card.Meta>{this.props.email}</Card.Meta>
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
    background: '#017d89',
    height: '100px',
    lineHeight: '100px'
  }
};
