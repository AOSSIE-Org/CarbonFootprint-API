import React, { Component } from 'react';
import axios from 'axios';
import ProfilePicture from '../Profile/ProfilePicture';
import Sidebar from '../Profile/Sidebar';
import { Button, Grid, Segment, List } from 'semantic-ui-react';
import { API_URL_SERVER } from '../../config/config';
import './DataUpload.css'

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
        axios.get(`${API_URL_SERVER}/suggestedData/fetchData`).then(response => {
            this.setState({ data: response.data });
        });
    }

    /**
   * Function to handle the approval of the data by calling /suggestedData/approveData route
   * @param id database ID of the object for reference
   */
    handleApprove(id) {
        axios.post(`${API_URL_SERVER}/suggestedData/approveData`, { data_id: id });
        window.location.reload();
    }

    /**
   * Function to handle the rejection of the data 
   * @param id database ID of the object for reference
   */
    handleReject(id) {
        axios.post(`${API_URL_SERVER}/suggestedData/rejectData`, { data_id: id });
        window.location.reload();
    }

    /**
   * Inherited function from react.Component to render to DOM object into html
   */
    render() {
        const { data } = this.state;

        return (
            <Grid className="verify-grid" >
                <Grid.Row>

                    <Grid.Column mobile={16} tablet={3} computer={3}>
                        <ProfilePicture
                            profilePicture={this.state.profilePicture}
                            nickname={this.state.nickname}
                            email={this.state.email}
                            auth={this.props.auth}
                            profile={this.state.profile}
                        />
                        <Sidebar />
                    </Grid.Column>

                    <Grid.Column mobile={16} tablet={10} computer={10}>
                        <Segment className="data-segment">
                            <List>
                                {data.length ? data.map(d =>
                                    <List.Item key={d._id}>
                                        <List.Content>
                                            {console.log(d)}
                                            <List.Header>Suggestion from - {d.createdby}</List.Header>
                                            <br />
                                            <List.Header>Route - {d.title}</List.Header>
                                            <br />
                                            <table>
                                                <tbody>
                                                    {Object.keys(d.data).map(key => (
                                                        <tr key={key}>
                                                            <td className="verify-td-key" >{key}</td>
                                                            <td className="verify-td-data" >{d.data[key]}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </List.Content>
                                        <br />
                                        <List.Content >
                                            <Button className="verify-approve" onClick={() => this.handleApprove(d._id)} >Approve</Button>
                                            <Button className="verify-reject" onClick={() => this.handleReject(d._id)} >Reject</Button>
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