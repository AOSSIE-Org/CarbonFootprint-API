import React from 'react';
//import ReactDOM from 'react-dom';
import registerServiceWorker from '../registerServiceWorker';
import Header from './Header/Header';
import Body from "./Body/Body";
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
console.log('index.js is transpiled');

const styles = {
    app: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "stretch",
        alignItems: "stretch",
        flexDirection: "column"
    }
};
