import React from 'react';
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  login() {
    this.props.auth.login();
  }
  logout() {
    this.props.auth.logout();
  }
    render() {
        const { isAuthenticated } = this.props.auth;
        return  (
            <div style={styles.header}>
              <Link to="/" style={{flex: 1}}>
                <Icon name='world' size="large" style={{marginRight: "10px"}}/>
                <strong>Carbon Footprint</strong>
                </Link>
                {!isAuthenticated() && <span style={styles.menuItem} onClick={() => this.login()}> Login </span>}
                {isAuthenticated() && <span style={styles.menuItem} onClick={() => this.logout()}> Logout </span>}
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
        background: '#2980b9',
        boxShadow: "1px 1px 5px #bbb",
        padding: "15px 25px",
        color: "#fff",
        fontSize: "22px"
    },
    menuItem: {
      fontSize: "18px",
      cursor: "pointer"
    }
}
