import React from 'react';
import { Grid, Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer';

export default class Body extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
                <div style={styles.body}>
            <div style={{padding: "30px", minHeight: "100%"}}>
                {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

const styles = {
    body: {
        height: "auto",
        display: "flex",
        justifyContent: "center",
        overflow: "scroll",
        flexDirection: "column"
    }
};
