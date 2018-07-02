import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Grid, Segment, Divider, Form } from 'semantic-ui-react';
import ProfileSettings from '../Profile/ProfileSettings';
import ProfilePicture from '../Profile/ProfilePicture';
import Sidebar from '../Profile/Sidebar';
import axios from 'axios'

export default class Unstructured extends Component {
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
            fileURL: ''
        }
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    handleFileUpload(e) {
        e.preventDefault();
        const data = new FormData();
        data.set('file', this.uploadInput.files[0]);
        data.set('filename', this.fileName.value);
        console.log(Array.from(data.keys()));        
        axios.post('suggestedData/upload',  data)
        .then((response) => {
            response.json().then((body) => {
                this.setState({ fileURL: `http://localhost:3080/${body.file}` })
            })
        })
        window.location.reload();
    };

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
    }

    render() {
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
                            <Form onSubmit={this.handleFileUpload}>
                                <Form.Field>
                                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                                </Form.Field>
                                <Form.Field>
                                    <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                                </Form.Field>
                                <br />
                                <Form.Field>
                                    <Button type='submit'>Upload</Button>
                                </Form.Field>
                            </Form>
                        </Segment>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        );
    }
}