import React, { Component } from 'react';
import { Segment, Form, TextArea } from 'semantic-ui-react';

export default class ExplorerQuery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: false,
            error: false,
            errorMessage: '',
            query: {}
        };
    }

    render() {

        return (
            <Segment style={styles.body}>

                <Form>
                    <TextArea autoHeight style={styles.textArea}/>
                </Form>

            </Segment>
        );

    }
}

const styles = {
    body: {
        backgroundColor: '#F6F7F9',
        minHeight: "100%"
    },
    textArea: {
        minHeight: 500,
        backgroundColor: '#F6F7F9',
        fontSize: '16px',
        color: "#626364",
        border: 'none'
    }
};