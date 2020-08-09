import React from 'react';
import { Button, Grid, Segment, Input, Icon } from 'semantic-ui-react';


export default class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            data: {}
        }
    }
    handleChange(event) {
        this.setState({ name: event.target.value });
    }
    handleClick() {
        this.props.auth.getListOfUsers(this.state.name)
            .then(data => {
                this.setState({ data: data });
            })
        console.log(this.state);
    }
    render() {
        return (
            <div>
                <Grid>
                    <Grid.Row centered colums={3}>
                        <Grid.Column>
                            <Input
                                icon={<Icon name='search' inverted circular link onClick={() => { this.handleClick() }} />}
                                placeholder='Search...'
                                onChange={(e) => { this.handleChange(e) }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid>
                    <Grid.Row centered colums={3}>
                        {this.state.data.length ? this.state.data.map(d => <Segment>
                            NickName : {d.nickname}
                        </Segment>) : (<Segment></Segment>)}
                    </Grid.Row>
                </Grid>
            </div>

        )
    }


}
