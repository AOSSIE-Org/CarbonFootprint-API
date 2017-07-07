import React from 'react';
import { Grid, Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export default class Body extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style={styles.body}>
            {this.props.children}
            </div>
        );
    }
}

const styles = {
    body: {
        height: "100%",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
    }
};
