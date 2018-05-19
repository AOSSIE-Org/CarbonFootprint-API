import React, { Component } from 'react';
import { Segment, Form, TextArea } from 'semantic-ui-react';

/* Extended react.Component class as ExplorerResponse */
export default class ExplorerResponse extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMessage: '',
            response:''
        };
        //this.finalResponse = this.finalResponse.bind(this);
    }

    render() {

        return (
            <Segment style={styles.body}>

                <Form>
                    <TextArea autoHeight style={styles.textArea} value={JSON.stringify(this.props.response)} />
                </Form>

            </Segment>
        );
    }
}

const styles = {
  body: {
    backgroundColor: 'white',
    minHeight: '100%',
  },
  textArea: {
    minHeight: 500,
    fontSize: '16px',
    border: 'none'
  }
};