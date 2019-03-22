import React, { Component } from 'react';
import { Icon, Menu, Card } from 'semantic-ui-react';
import Explorer from '../Explorer/Explorer';
import DataUpload from '../DataUpload/DataUpload';
import DataVerify from '../DataUpload/DataVerify';
import {Link} from 'react-router-dom';

/* Extended react.Component class as Sidebar */

export default class Sidebar extends Component {

  /**
   * Constructor for the Sidebar class
   * @constructor extends react.Component
   */

  constructor() {
    super();
    this.state = { activeItem: '' };
    this.handleItemClick = this.handleItemClick.bind(this);
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
      <Menu fluid vertical style={ styles.cardMargin }>
        <Menu.Item
          name="inbox"
          active={activeItem === 'inbox'}
          onClick={this.handleItemClick}
        >
          <Link to= '/profile'>
            <span>
              <Icon name="home" /> Account
            </span>
          </Link>
        </Menu.Item>
        
        <Menu.Item
          name="transport"
          active={activeItem === 'transport'}
          onClick={this.handleItemClick}
        >
          <Link to= '/TransportComparer'>
            <span>
              <Icon name="train" /> Transport Comparer
            </span>
          </Link>
        </Menu.Item>

        <Menu.Item
          name="updates"
          active={activeItem === 'updates'}
          onClick={() => window.open('http://docs.carbonhub.org', '_blank')}
        >
        <Link to= {"/DataUpload"}>
          <span>
            <Icon name= "file" /> Data Upload
          </span>
        </Link>
        </Menu.Item>

        <Menu.Item
          name= "explorer"
          active= {activeItem === 'explorer'}
        >
        <Link to = {"/explorer"}>
          <span>
            <Icon name="edit" /> API Explorer
          </span>
        </Link>
        </Menu.Item>

        <Menu.Item
          name= "Data Upload"
          active= {activeItem === 'Data Upload'}
        >
        <Link to= {"/DataUpload"}>
          <span>
            <Icon name= "file" /> Data Upload
          </span>
        </Link>
        </Menu.Item>

        <Menu.Item
          name= "Verify Data"
          active= {activeItem === 'Verify Data'}
        >
        <Link to= {"/dataVerify"}>
          <span>
            <Icon name= "file" /> Verify Data
          </span>
        </Link>
        </Menu.Item>

      </Menu>
    );
  }
}

const styles = {
  cardMargin: {
    marginBottom: "15px"
  }
}