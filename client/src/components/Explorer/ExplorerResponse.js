import React, { Component } from 'react';
import { Segment, Form, TextArea } from 'semantic-ui-react';

export default class ExplorerResponse extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMessage: '',
            response:''
        };
    }

    render() {

        return (
            <Segment style={styles.body}>

                <Form>
                    <TextArea autoHeight style={styles.textArea} readOnly />
                </Form>

            </Segment>
        );
    }
}

const styles = {
    body: {
        backgroundColor: 'white',
        minHeight: "100%",
    },
    textArea: {
        minHeight: 500,
        fontSize: '16px',
        border: 'none'
    }
};