import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { fitDataDirect, fitDataInDirect } from './UtilDatafetch';
export default class GoogleFit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fitData: '',
      error: ''
    }
  }

  async componentDidMount() {
    const profile = await this.props.auth.getProfile();
    if (profile.sub.substr(0, profile.sub.indexOf('|')) === 'google-oauth2') {
      fitDataDirect(profile.sub)
        .then(fitData => {
          this.setState({
            fitData
          });
        }).catch(error => {
          this.setState({
            error
          });
        });
    }
  }

  handleSuccessResponse = async (response) => {
    const { accessToken } = response;
    try {
      const fitData = await fitDataInDirect(accessToken);
      this.setState({
        fitData
      });
    }
    catch (error) {
      this.setState({
        error
      });
    }
  }

  handleFailureResponse = (response) => {
    console.log('Error', response);
  }

  render() {
    return (
      <div className="google-fit-container">
        <GoogleLogin
          className='google-fit-button'
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          scope={process.env.REACT_APP_GOOGLE_SCOPES}
          onSuccess={this.handleSuccessResponse}
          onFailure={this.handleFailureResponse}
          isSignedIn={false}>
          <span>Connect google fit</span>
        </GoogleLogin>
      </div>
    );
  }
}