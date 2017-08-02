import React, { Component } from 'react';
import { Icon, Menu, Card } from 'semantic-ui-react';

export default class Sidebar extends Component {
  constructor() {
    super();
    this.state = { activeItem: 'inbox' };
    this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu vertical>
        <Menu.Item
          name="inbox"
          active={activeItem === 'inbox'}
          onClick={this.handleItemClick}
        >
          <span>
            <Icon name="home" /> Account
          </span>
        </Menu.Item>

        <Menu.Item
          name="spam"
          active={activeItem === 'spam'}
          onClick={this.handleItemClick}
        >
          <span>
            <Icon name="user" /> Edit Profile
          </span>
        </Menu.Item>

        <Menu.Item
          name="updates"
          active={activeItem === 'updates'}
          onClick={() => window.location = 'http://docs.carbonhub.xyz'}
        >
          <span>
            <Icon name="newspaper" /> Documentation
          </span>
        </Menu.Item>
      </Menu>
    );
  }
}
