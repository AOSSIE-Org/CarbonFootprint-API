import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-config';
import $ from 'jquery'

/* Auth Class */

export default class Auth {

  /**
   * Constructor for the Auth class
   * @constructor {Auth}
   */

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getMetaProfile = this.getMetaProfile.bind(this);
    this.updateData = this.updateData.bind(this);
    this.auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid email profile'
    });
  }

  // Function to handle login event

  login() {
    this.auth0.authorize();
  }

  /**
   * Function to handle authentication
   */

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/profile');
      } else if (err) {
        history.replace('/profile');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/profile');
  }

  /**
   * Function to logout and remove user session details
   */

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  /**
   * Function to check if any user is authenticated
   */

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

   /* Function to get accessToken */

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      //console.log(new Error('No access token found'));
    }
    return accessToken;
  }

   /* Function to get idtoken */

  getIdToken() {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      console.log(new Error('No id token found'));
      return;
    }
    return idToken;
  }

  /**
   * Function to get user profile details
   * @callback cb
   * @param {new Error} err
   * @param {object} profile
   */

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    if(accessToken){
      this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
    }
    else {
      console.log("accessToken not found");
      cb(true,{});
    }
  }

  /**
   * Function to get user_metadata from auth0
   * @param {string} userId
   * @callback cb
   */

  getMetaProfile(userId,cb){
    let accessToken = this.getIdToken(),
    url = AUTH_CONFIG.apiEndpoint + userId;
    //console.log("userId",userId);
    if(accessToken){
      let response = $.ajax({
            type: 'GET',
            url: url,
            headers:{
                'Authorization':'Bearer '+accessToken
            },
            dataType: "text",
            success: function(result) {
                //console.log("metaprofile",result);
                this.metaUserProfile = JSON.parse(result)["user_metadata"];
                cb(false,result);
            },
            error:function(err){
                cb(err);
            }
        });
        //console.log("hey",response);
    }
    else cb(true,{});
  }

  /**
   * Function to update edited data to user_metadata
   * @param {string} clientId
   * @param {object} data
   * @callback cb
   */

  updateData(clientId,data,cb) {
    let accessToken = this.getIdToken(),
            url = AUTH_CONFIG.apiEndpoint+clientId;
        //console.log(data);
        //console.log(clientId);
        let response = $.ajax({
            type: 'PATCH',
            url: url,
            data:data,
            headers:{
                'Authorization':'Bearer '+accessToken
            },
            dataType: "text",
            success: function(result) {
                console.log("data saved successfully");
                cb(false,result);
            },
            error:function(err){
                cb(err);
            }
        });
  }

}
