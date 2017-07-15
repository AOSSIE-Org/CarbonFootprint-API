import React from 'react';

import Header from './components/Header/Header';
import Body from "./components/Body/Body";

export default class App extends React.Component {
    render() {
        return (
            <div style={styles.app}>
                <Header />
                <Body />
            </div>
        );
    }
}

const styles = {
    app: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "stretch",
        alignItems: "stretch",
        flexDirection: "column",

    }
};