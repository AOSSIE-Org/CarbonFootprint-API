import React from 'react';
import { Dropdown, Icon, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Header.css'

export default class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {profile:{}};
    this.props.auth.getProfile()
        .then((profile) => {
            this.setState({
                profile:profile
            });
        })
        .catch((err) => {
            console.log(err);
        });
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="header-div1">
        <Link to="/" className="header-logo">
          <Icon name="world" size="large" className="header-img-logo" />
          <strong>Carbon Footprint</strong>
        </Link>
        {!isAuthenticated() &&
          <span className="header-menu-item" onClick={() => this.login()}>
            Login
          </span>}
        {isAuthenticated() &&
          <Dropdown
            icon={null}
            className="header-menu-item"
            trigger={
              <span>
                <Responsive minWidth={500}>
                  <img alt="profile" src={this.state.profile.picture} className="header-img" />
                  {this.state.profile.nickname}
                </Responsive>
                <Responsive maxWidth={499}>
                  <Icon name="ellipsis vertical" size="large" />
                </Responsive>
              </span>
            }
          >
            <Dropdown.Menu className="header-dropdown-menu">
              <Dropdown.Item>
                <Link to="/profile">My Account</Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.logout()}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>}
      </div>
    );
  }
}

