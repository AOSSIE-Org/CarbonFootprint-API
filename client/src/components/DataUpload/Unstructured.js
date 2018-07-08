import React, { Component } from 'react';
import { render } from 'react-dom';
import { Redirect } from 'react-router-dom';
import { Button, Grid, Segment, Divider, Form } from 'semantic-ui-react';
import axios from 'axios'
import ProfileSettings from '../Profile/ProfileSettings';
import ProfilePicture from '../Profile/ProfilePicture';
import Sidebar from '../Profile/Sidebar';

<<<<<<< HEAD
const BASE_URL = (process.env.NODE_ENV == 'production') ? 'https://carbonhub.xyz/v1/' : 'http://localhost:3080/v1/';

=======
/* Extended react.Component class as Unstructured */
>>>>>>> 0c2825a... Added a readme file providing a detailed usage of Data Upload page and added inline comments
export default class Unstructured extends Component {

    /**
* Constructor for the Unstructured class
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
            fileURL: '',
            redirect: false
        }
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    /**
   * Function to handle the upload of the file by calling /suggestedData/upload route
   *  e is the synthetic event
   */
    handleFileUpload(e) {
        e.preventDefault();
        const data = new FormData();
        data.set('file', this.uploadInput.files[0]);
        data.set('filename', this.fileName.value);
        axios.post('suggestedData/upload', data)
            .then((response) => {
                response.json().then((body) => {
                    this.setState({ fileURL: BASE_URL+body.file})
                })
            })
        this.setState({ redirect: true })
    };

    /**
   * Inherited function from react.Component.
   * This method is invoked immediately after a component is mounted
   */
    componentDidMount() {
        this.props.auth.getProfile()
        .then((profile) => {
            this.setState({
                profile: profile,
                profilePicture: profile.picture,
                nickname: profile.nickname,
                email: profile.email,
                userid: profile.sub,
                given_name:profile.given_name,
                family_name:profile.family_name
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    /**
   * Inherited function from react.Component to render to DOM object into html
   */
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
                            {this.state.redirect && <Redirect to='/DataUpload' />}
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