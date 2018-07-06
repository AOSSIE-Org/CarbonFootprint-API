import React, { Component } from 'react';
import axios from 'axios';
import ProfileSettings from '../Profile/ProfileSettings';
import ProfilePicture from '../Profile/ProfilePicture';
import Sidebar from '../Profile/Sidebar';
<<<<<<< HEAD
<<<<<<< HEAD
import { Redirect } from 'react-router-dom';
import { Button, Grid, Segment, Divider, List, Card } from 'semantic-ui-react';
=======
import axios from 'axios';
import { Redirect } from 'react-router-dom';
>>>>>>> 155bd2d... Updated Data Upload page (for suggesting data) and Data verify page (for verifying the suggested data)
=======
import { Redirect } from 'react-router-dom';
import { Button, Grid, Segment, Divider, List } from 'semantic-ui-react';
>>>>>>> 676c449... Restructured backend to save the approved suggested data directly into the respective raw_data files

/* Extended react.Component class as DataVerify */

export default class DataVerify extends Component {

    /**
  * Constructor for the DataVerify class
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
<<<<<<< HEAD
    
    componentDidMount() {
        this.props.auth.getProfile()
            .then((profile) => {
                this.setState({
                    profile: profile,
                    profilePicture: profile.picture,
                    nickname: profile.nickname,
                    email: profile.email,
                    userid: profile.sub,
                    given_name: profile.given_name,
                    family_name: profile.family_name
                });
            })
            .catch((err) => {
                console.log(err);
            });
            axios.get('/suggestedData/fetchData').then(response => {
                this.setState({ data: response.data });
            });
=======

    handleApprove(id) {
        axios.post('/suggestedData/approveData', { data_id: id });
        window.location.reload();
    }

    handleReject(id) {
        axios.post('/suggestedData/rejectData', { data_id: id });
        window.location.reload();
>>>>>>> 155bd2d... Updated Data Upload page (for suggesting data) and Data verify page (for verifying the suggested data)
    }

<<<<<<< HEAD
    /**
   * Inherited function from react.Component.
   * This method is invoked immediately after a component is mounted
   */
    componentDidMount() {
        this.props.auth.getProfile()
            .then((profile) => {
=======
    componentWillMount() {
        this.props.auth.getProfile((err, profile) => {
            if (!err) {
>>>>>>> 676c449... Restructured backend to save the approved suggested data directly into the respective raw_data files
                this.setState({
                    profile: profile,
                    profilePicture: profile.picture,
                    nickname: profile.nickname,
                    email: profile.email,
                    userid: profile.sub,
                    given_name: profile.given_name,
                    family_name: profile.family_name
                });
<<<<<<< HEAD
            })
            .catch((err) => {
                console.log(err);
            });
            axios.get('/suggestedData/fetchData').then(response => {
                this.setState({ data: response.data });
            });
    }

    /**
   * Function to handle the approval of the data by calling /suggestedData/approveData route
   * @param id database ID of the object for reference
   */
    handleApprove(id) {
        axios.post('/suggestedData/approveData', { data_id: id });
        window.location.reload();
    }

    /**
   * Function to handle the rejection of the data 
   * @param id database ID of the object for reference
   */
    handleReject(id) {
        axios.post('/suggestedData/rejectData', { data_id: id });
        window.location.reload();
=======
            }
        });
        axios.get('/suggestedData/fetchData').then(response => {
            this.setState({ data: response.data });
        })
>>>>>>> 155bd2d... Updated Data Upload page (for suggesting data) and Data verify page (for verifying the suggested data)
    }

    /**
   * Inherited function from react.Component to render to DOM object into html
   */
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
<<<<<<< HEAD
                                {data.length ? data.map(d =>
                                    <List.Item key={d._id}>
                                        <List.Content>
                                            {console.log(d)}
                                            <List.Header>Suggestion from - {d.createdby}</List.Header>
                                            <br />
                                            <List.Header>Route - {d.title}</List.Header>
=======
                                {console.log(data)}
                                {data.length ? data.map(d =>
                                    <List.Item key={d._id}>
                                        <List.Content>
                                            <List.Header>{d.title}</List.Header>
>>>>>>> 155bd2d... Updated Data Upload page (for suggesting data) and Data verify page (for verifying the suggested data)
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
<<<<<<< HEAD
    td: {
        paddingLeft: '20px',
        paddingRight: '20px'
=======
    td: { 
        paddingLeft: '20px', 
        paddingRight: '20px' 
>>>>>>> 155bd2d... Updated Data Upload page (for suggesting data) and Data verify page (for verifying the suggested data)
    }
}