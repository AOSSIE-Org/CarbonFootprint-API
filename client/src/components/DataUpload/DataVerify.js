import React, { Component } from 'react';
import { Button, Grid, Segment, Divider, List } from 'semantic-ui-react';
import ProfileSettings from '../Profile/ProfileSettings';
import ProfilePicture from '../Profile/ProfilePicture';
import Sidebar from '../Profile/Sidebar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
            data: [],
            redirect: false
        }
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
    }

    handleApprove(id) {
        axios.post('/suggestedData/approveData', { data_id: id });
        window.location.reload();
    }

    handleReject(id) {
        axios.post('/suggestedData/rejectData', { data_id: id });
        window.location.reload();
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
        axios.get('/suggestedData/fetchData').then(response => {
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
                                {data.length ? data.map(d =>
                                    <List.Item key={d._id}>
                                        <List.Content>
                                            <List.Header>{d.title}</List.Header>
                                            <br />
                                            <table style={styles.table} >
                                                {Object.keys(d.data).map(key => (
                                                    <tr key={key}>
                                                        <td style={styles.td} >{key}</td>
                                                        <td style={{ paddingLeft: 0 }} >{d.data[key]}</td>
                                                    </tr>
                                                ))}
                                            </table>
                                        </List.Content>
                                        <br />
                                        <List.Content >
                                            <Button style={{ backgroundColor: 'green' }} onClick={() => this.handleApprove(d._id)} >Approve</Button>
                                            <Button style={{ backgroundColor: 'red' }} onClick={() => this.handleReject(d._id)} >Reject</Button>
                                        </List.Content>
                                    </List.Item>
                                ) :
                                    <List.Header>No data available for approval</List.Header>
                                }
                            </List>
                        </Segment>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }
}
const styles = {
    td: { 
        paddingLeft: '20px', 
        paddingRight: '20px' 
    }
}