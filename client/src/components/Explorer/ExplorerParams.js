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
            checkedParams:[]
        };
    }

    render() {

        return (
            <Segment style={styles.body}>

                {this.state.params.map(param => (
                    <div>
                        <Checkbox label={param} />
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