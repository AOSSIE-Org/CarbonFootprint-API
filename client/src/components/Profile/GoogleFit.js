import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
import { fitData } from './UtilDatafetch';
export default class GoogleFit extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
    const profile = await this.props.auth.getProfile();
    if (profile.sub.substr(0, profile.sub.indexOf('|')) === 'google-oauth2') {
      const data = await fitData(profile.sub);
      console.log(data);
    }
  }

  handleSuccessResponse = async (response) => {
    const { accessToken } = response;
    const options = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    try {
      const result = await axios['post']('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', reqbody, options);
      const fitData = result.data.bucket.map(day => {
        var date = new Date(parseInt(day.startTimeMillis));
        date.toDateString();
        const steps = day.dataset[0].point[0].value[0].intVal;
        const distance = day.dataset[1].point[0].value[0].fpVal;
        return { date, steps, distance };
      });
      console.log(fitData);
    }
    catch (err) {
      console.log(err);
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
const reqbody = {
  "startTimeMillis": new Date().setHours(0, 0, 0, 0) - 86400000 * 7,
  "endTimeMillis": new Date().setHours(0, 0, 0, 0),
  "bucketByTime": { 'durationMillis': 86400000 },
  "aggregateBy": [
    {
      "dataTypeName": "com.google.step_count.delta",
      "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
    },
    {
      "dataTypeName": "com.google.distance.delta",
      "dataSourceId": "derived:com.google.distance.delta:com.google.android.gms:pruned_distance"
    },
  ]
}