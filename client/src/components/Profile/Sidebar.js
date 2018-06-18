import React, { Component } from 'react';
import { Icon, Menu, Card } from 'semantic-ui-react';

/* Extended react.Component class as Sidebar */

export default class Sidebar extends Component {

  /**
   * Constructor for the Sidebar class
   * @constructor extends react.Component
   */

  constructor() {
    super();
    this.state = { activeItem: 'inbox' };
    this.handleItemClick.bind(this);
  }

  /* Function to handle click event on menu item */

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  /** 
   * Inherited function from react.Component to render to DOM object into html
   */

  render() {
    const { activeItem } = this.state;
    return (
      <Menu fluid vertical>
        <Menu.Item
          name="inbox"
          active={activeItem === 'inbox'}
          onClick={this.handleItemClick}
        >
          <span>
            <Icon name="home" /> Account
          </span>
        </Menu.Item>

        {/*<Menu.Item
          name="spam"
          active={activeItem === 'spam'}
          onClick={this.handleItemClick}
        >
          <span>
            <Icon name="user" /> Edit Profile
          </span>
        </Menu.Item>*/}

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
