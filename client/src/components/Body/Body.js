import React from 'react';
import { Icon } from 'semantic-ui-react'
import Choropleth from "../Choropleth/Choropleth";

class Tooltip extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div style={{minWidth: "250px", padding: "30px", background: "#efefef", position: "absolute", bottom: "15px", left: "15px"}}>
                <div><strong>Country</strong>: {this.props.data.name}</div>
                <div><strong>CO<sub>2</sub></strong>: {this.props.data.CO2} {this.props.data.unit}</div>
                <div><strong>CH<sub>4</sub></strong>: {this.props.data.CH4} {this.props.data.unit}</div>
                <div><strong>N<sub>2</sub>O</strong>: {this.props.data.N2O} {this.props.data.unit}</div>
            </div>
        )
    }
}

export default class Body extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showTooltip: false
        }
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    showTooltip(data){
        if(data){
            this.setState({
                showTooltip: true,
                tooltipData: data
            })
        }
    };

    hideTooltip() {
        this.setState({
            showTooltip: false
        });
    };

    render() {
        return (
            <div style={styles.body}>
                <div style={styles.card}>
                    <iframe src="./graphs/percapita.html" width="100%" height="100%" style={{"border": "none"}}></iframe>
                </div>
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
        height: "100%",
        position: "relative"
    },
    card: {
        width: "100%",
        height: "100%",
        background: '#fff',
        backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGElEQVQYV2NkYGCQYmBgeMYABYwwBvECAD1WAQVZi1QaAAAAAElFTkSuQmCC)",
        backgroundRepeat: "repeat",
        backgroundSize: "7px",
        boxShadow: "1px 1px 5px #bbb",
        position: "relative"
    }
};
