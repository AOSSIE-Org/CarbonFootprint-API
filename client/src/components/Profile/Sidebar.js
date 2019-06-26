import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
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
          as={Link}
          to="/profile"
          link={true}
        >
          <span style={{ color: '#4183c4' }}>
            <Icon name="home" /> Account
          </span>
        </Menu.Item>
        
        <Menu.Item
          name="transport"
          active={activeItem === 'transport'}
          onClick={this.handleItemClick}
          as={Link}
          to="/TransportComparer"
          link={true}
        >
          <span style={{ color: '#4183c4' }}>
            <Icon name="train" /> Transport Comparer
          </span>
        </Menu.Item>

        <Menu.Item
          name="updates"
          active={activeItem === 'updates'}
        >
        <a href="http://docs.carbonhub.org" target="_blank" rel="noopener noreferrer">
          <span>
            <Icon name="newspaper" /> API Documentation
          </span>
        </a>
        </Menu.Item>

        <Menu.Item
          name= "Data Upload"
          active= {activeItem === 'Data Upload'}
        >
        <Link to= {"/DataUpload"}>
          <span>
            <Icon name= "upload" /> Data Upload
          </span>
        </Link>
        </Menu.Item>

        <Menu.Item
          name= "Swagger Docs"
          active= {activeItem === 'Data Upload'}
        >
        <a href="/api/docs" target="_blank" rel="noopener noreferrer">
          <span>
            <Icon name="wpforms" /> Swagger Documentation
          </span>
        </a>
        </Menu.Item>


        <Menu.Item
          name= "Verify Data"
          active= {activeItem === 'Verify Data'}
        >
        <Link to= {"/dataVerify"}>
          <span>
            <Icon name= "check circle" /> Verify Data
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