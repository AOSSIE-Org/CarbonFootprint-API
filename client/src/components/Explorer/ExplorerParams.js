import React, { Component } from 'react';
import { Segment, Checkbox } from 'semantic-ui-react';

export default class ExplorerParams extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMessage: '',
            response:'',
            params:['item', 'region', 'unit', 'quantity'],
            checkedParams: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, {value}){
        if(!this.state.checkedParams){   
        this.setState({checkedParams: value});
        }else{
            this.state.checkedParams[value] = '';
        }
        this.props.queryUpdate(this.state.checkedParams);
    }

    render() {

        return (
            <Segment style={styles.body}>

                {this.state.params.map(param => (
                    <div>
                        <Checkbox label={param} value={param} checked={this.state.checkedParams==={param}} onChange={this.handleChange} />
                        <br/>
                    </div>
                ))}

            </Segment>
        );
    }
}

const styles = {
    body: {
        backgroundColor: 'white',
        minHeight: "100%",
    }
};