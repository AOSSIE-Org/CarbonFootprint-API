import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import ExplorerRequest from './ExplorerRequest';
import ExplorerQuery from './ExplorerQuery';
import ExplorerResponse from './ExplorerResponse';
import ExplorerParams from './ExplorerParams';

export default class Explorer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: false,
            url: '',
            method: 'GET',
            query: {},
            params: []
        };

        this.getCode = this.getCode.bind(this);
        this.runInPostman = this.runInPostman.bind(this);
    }

    componentDidMount() {

    }

    getCode(){
        alert('getCode');
    }

    runInPostman(){
        alert('run in postman')
    }

    render() {
        return (
            <div>

                <Grid centered textAlign="left">
                    <Grid.Row columns={1}>
                        <ExplorerRequest
                            key={this.state.key}
                            url={this.state.url}
                            method={this.state.method}
                        />
                    </Grid.Row>

                    <Grid.Row columns={3}>

                        <Grid.Column width={4}>
                            <ExplorerParams
                                key={this.state.key}
                                params={this.state.params}
                            />
                        </Grid.Column>

                        <Grid.Column width={7}>
                            <ExplorerQuery
                                key={this.state.key}
                                query={this.state.query}
                            />
                        </Grid.Column>

                        <Grid.Column width={5}>
                            <ExplorerResponse
                                key={this.state.key}
                                query={this.state.query}
                            />
                        </Grid.Column>

                    </Grid.Row>

                </Grid>

                <br/>

                <div style={styles.div}>
                    <Button
                        content='</> Get Code'
                        style={styles.button}
                        onClick={this.getCode}
                    />

                    <Button
                        content='Run in Postman'
                        style={styles.button}
                        onClick={this.runInPostman}
                    />
                </div>
            </div>
        );
    }
}

const styles = {
    button: {
        backgroundColor: '#2980b9',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px'
    },
    div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
};