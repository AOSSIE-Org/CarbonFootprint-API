import React from 'react';
import { Icon } from 'semantic-ui-react'

export default class Header extends React.Component {
    render() {
        return (
            <div style={styles.body}>
                <div style={styles.card}></div>
            </div>
        );
    }
}

const styles = {
    body: {
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    card: {
        width: "100%",
        height: "100%",
        background: '#ffffff',
        boxShadow: "1px 1px 5px #bbb",
    }
}
