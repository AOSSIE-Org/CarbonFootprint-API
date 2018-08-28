import React, { Component } from 'react';
import { render } from 'react-dom';
import Form from 'react-jsonschema-form';
import { Button, Grid, Segment, Divider } from 'semantic-ui-react';
import axios from 'axios';
import ProfileSettings from '../Profile/ProfileSettings';
import ProfilePicture from '../Profile/ProfilePicture';
import Sidebar from '../Profile/Sidebar';
import schemaArray from './StructuredSchema';
import { Redirect } from 'react-router-dom';
import { json } from 'body-parser';

/* Extended react.Component class as Structured */

export default class Structured extends Component {

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
            step: 0,
            formData: {},
            redirect: false
        }
    }

 /**
   * Function to handle the submission of the form data
   * @param formData form data submitted by users
   */
    handleChange({ formData }) {
        const submitted = formData;
        this.setState({
            step: submitted,
            formData: {
                ...this.state.formData,
                ...formData
            },
        })
        if (typeof submitted != 'number') {
            const element = schemaArray[this.state.step];
<<<<<<< HEAD
            const { email } = this.state;            
=======
            console.log(this.state.email);
            const { email } = this.state;
            console.log(element, formData);
            
>>>>>>> 676c449... Restructured backend to save the approved suggested data directly into the respective raw_data files
            axios.post('/suggestedData', {
                title: element.title,
                data: formData,
                useremail: email
            });
            this.setState({ redirect: true });
        }
    }

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
                            <Form schema={schemaArray[this.state.step]}
                                onSubmit={this.handleChange.bind(this)}
                                formData={this.state.formData} />
                        </Segment>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        );
    }
}
