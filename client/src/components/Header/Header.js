import React from 'react';
import { Icon } from 'semantic-ui-react'

export default class Header extends React.Component {
    render() {
        return  (
            <div style={styles.header}>
                <Icon name='world' size="large" style={{marginRight: "10px"}}/>
                <strong>Carbon Footprint</strong>
            </div>
        );
    }
}
console.log('header.js is transpiled');
const styles = {
    header: {
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        background: '#2980b9',
        boxShadow: "1px 1px 5px #bbb",
        padding: "15px",
        color: "#fff",
        fontSize: "22px"
    }
}
