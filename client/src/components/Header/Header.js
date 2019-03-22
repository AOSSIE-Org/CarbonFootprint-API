import React from 'react';
import { Dropdown, Icon, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
      <div style={styles.header}>
        <Link to="/" style={styles.logo}>
          <Icon name="world" size="large" style={{ marginRight: '10px' }} />
          <strong>Carbon Footprint</strong>
        </Link>
        {!isAuthenticated() &&
          <span style={styles.menuItem} onClick={() => this.login()}>
            Login
          </span>}
        {isAuthenticated() &&
          <Dropdown
            icon={null}
            style={styles.menuItem}
            trigger={
              <span>
                <Responsive minWidth={500}>
                  <img src={this.state.profile.picture} style={{borderRadius:'50%',height:'20px',marginRight:'5px'}} />
                  {this.state.profile.nickname}
                </Responsive>
                <Responsive maxWidth={499}>
                  <Icon name="ellipsis vertical" size="large" />
                </Responsive>
              </span>
            }
          >
            <Dropdown.Menu style={{ right: 0, top: '120%', left: 'initial' }}>
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

const styles = {
  header: {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#2980b9',
    boxShadow: '1px 1px 5px #bbb',
    padding: '15px 25px',
    color: '#fff',
    fontSize: '22px'
  },
  menuItem: {
    fontSize: '15px',
    cursor: 'pointer'
  },
  logo: {
    color: 'white'
  },
  user: {
    fontSize : '22px'
  }
};
