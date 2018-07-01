import React, { Component } from 'react';
import { Button, Grid, Segment, Divider, List } from 'semantic-ui-react';
import ProfileSettings from '../Profile/ProfileSettings';
import ProfilePicture from '../Profile/ProfilePicture';
import Sidebar from '../Profile/Sidebar';
import axios from 'axios';
import ListItems from './ListItems';

/* Extended react.Component class as Profile */

export default class DataVerify extends Component {

    /**
  * Constructor for the DataUpload class
  * @constructor extends react.Component
  */

    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            profilePicture: '',
            nickname: '',
            email: '',
            userid: '',
            given_name: '',
            family_name: '',
            data: []
        }
    }

    componentDidMount() {
        this.props.auth.getProfile((err, profile) => {
            if (!err) {
                this.setState({
                    profile: profile,
                    profilePicture: profile.picture,
                    nickname: profile.nickname,
                    email: profile.email,
                    userid: profile.sub,
                    given_name: profile.given_name,
                    family_name: profile.family_name
                });
            }
        });
        axios.get('/suggestedData/approveData').then(response => {
            this.setState({ data: response.data });
        })
    }
    render() {
        const { data } = this.state;

        return (
            <Grid centered textAlign="left">
                <Grid.Row>

                    <Grid.Column width={3}>
                        <ProfilePicture
                            profilePicture={this.state.profilePicture}
                            nickname={this.state.nickname}
                            email={this.state.email}
                            auth={this.props.auth}
                            profile={this.state.profile}
                        />
                        <Sidebar />
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <Segment style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <List>
                                {console.log(data)}
                                {data && data.map(d =>
                                    <List.Item key={d._id}>
                                        <List.Content floated='right'>
                                            <Button>Approve</Button>
                                            <Button>Reject</Button>
                                        </List.Content>
                                        <List.Content>
                                            <List.Header>{d.title}</List.Header>
                                            <table>
                                                {Object.keys(d.data).map(key => (
                                                    <tr key={key}>
                                                        <td>{key}</td>
                                                        <td>{d.data[key]}</td>
                                                    </tr>
                                                ))}
                                            </table>
                                        </List.Content>
                                    </List.Item>
                                )}
                            </List>
                        </Segment>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }
}