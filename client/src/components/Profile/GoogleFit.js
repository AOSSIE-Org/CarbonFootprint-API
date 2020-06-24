import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'

export default class GoogleFit extends Component {

  handleSuccessResponse = async (response) => {
    const { accessToken, tokenId, profileObj } = response;
    const options = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
    const result = await axios['post']('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', reqbody, options);
    console.log(result.data);
  }

  handleFailureResponse = (response) => {
    console.log(response);
  }

  render() {
    return (
      <div className="google-fit-container">
        <GoogleLogin
          className='google-fit-button'
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          scope={process.env.REACT_APP_GOOGLE_SCOPES}
          onSuccess={this.handleSuccessResponse}
          onFailure={this.handleFailureResponse}>
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
    {
      "dataTypeName": "com.google.calories.expended",
      "dataSourceId": "derived:com.google.calories.expended:com.google.android.gms:from_activities"
    },
    {
      "dataTypeName": "com.google.speed",
      "dataSourceId": "derived:com.google.speed:com.google.android.gms:from_distance<-merge_distance_delta"
    },
    {
      "dataTypeName": "com.google.activity.segment",
      "dataSourceId": "derived:com.google.activity.segment:com.google.android.gms:merge_activity_segments"
    }
  ]
}