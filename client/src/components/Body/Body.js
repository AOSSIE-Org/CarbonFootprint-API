import React from 'react';
import { Icon } from 'semantic-ui-react'
import Choropleth from "../Choropleth/Choropleth";

class Tooltip extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div style={{width: "100px", height: "100px", background: "#fff", position: "absolute", top: this.props.top, left: this.props.left}}>
                ToolTip
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

    showTooltip(x, y) {
        console.log(x, y);
        this.setState({
            showTooltip: true,
            left: x,
            top: y
        })
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
                    <Choropleth showTooltip={this.showTooltip} hideTooltip={this.hideTooltip} />
                    {this.state.showTooltip && <Tooltip top={this.state.top} left={this.state.left} /> }
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
    }
};
