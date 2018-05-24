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
        const newQuery = this.props.query;
        console.log(newQuery);
        const key = Object.keys(newQuery);
        newQuery[value] ='';
        this.props.queryUpdate(newQuery);
    }

    render() {
        const query = this.props.query;        
        const keys = Object.keys(query);
        var check;
        return (
            <Segment style={styles.body}>
                {keys.map(key =>
                    <div>
                        {check = query[key]?true:false}
                        <Checkbox label={key} value={key} checked={check} onClick={this.handleChange} />
                        <br/>
                    </div>
                )}
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