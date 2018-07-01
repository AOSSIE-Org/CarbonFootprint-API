import React, { Component } from 'react'
import { Button, Image, List } from 'semantic-ui-react'

export default class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <List divided verticalAlign='middle'>
                <List.Item>
                    <List.Content floated='right'>
                        <Button>Approve</Button>
                        <Button>Reject</Button>
                    </List.Content>
                    <List.Content>
                        <List.Header>{this.props.title}</List.Header>
                        <List.Description>{this.props.data}</List.Description>
                    </List.Content>
                </List.Item>
            </List>
        )
    }
}
