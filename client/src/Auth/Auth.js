import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-config';
import $ from 'jquery'
import { sendMessage, sendMessageExtra } from '../Sentry/logger';

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
    this.auth0.authorize({
      // connection: 'google-oauth2',
      connection_scope: 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.reproductive_health.read'
    });
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
        sendMessageExtra('Error in authentication', err.error);
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
    return new Promise((resolve, reject) => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        sendMessage('No access token found');
        reject(new Error('No access token found'));
      }
      resolve(accessToken);
    });
  }

  /* Function to get idtoken */

  getIdToken() {
    return new Promise((resolve, reject) => {
      const idToken = localStorage.getItem('id_token');
      if (!idToken) {
        sendMessage('No id token found');
        reject(new Error('No id token found'));
      }
      resolve(idToken);
    });
  }

  /**
   * Function that returns promise to get user profile details
   */

  getProfile() {
    return new Promise((resolve, reject) => {
      this.getAccessToken()
        .then((accessToken) => {
          this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
              this.userProfile = profile;
            }
            return resolve(profile);
          });
        })
        .catch((err) => {
          sendMessageExtra('Error while getting profile', err);
          return reject(err);
        });
    });
  };

  /**
   * Function that returns promise to get user_metadata from auth0
   * @param {string} userId
   */

  getMetaProfile(userId) {
    return new Promise((resolve, reject) => {
      this.getIdToken()
        .then((idToken) => {
          let url = AUTH_CONFIG.apiEndpoint + userId;

          $.ajax({
            type: 'GET',
            url: url,
            headers: {
              'Authorization': 'Bearer ' + idToken
            },
            dataType: "text",
            success: result => {
              this.metaUserProfile = JSON.parse(result)["user_metadata"];
              return resolve(result);
            },
            error: err => {
              sendMessageExtra('Error in AJAX call for getting MetaProfileData', err);
              return reject(err);
            }
          });
        })
        .catch(err => {
          sendMessageExtra('Error while getting meta profile data', err);
          reject(err);
        });
    });
  }

  /**
   * Function that returns promise to update edited data to user_metadata
   * @param {string} clientId
   * @param {object} data
   */

  updateData(clientId, data) {
    return new Promise((resolve, reject) => {
      this.getIdToken()
        .then((idToken) => {
          let url = AUTH_CONFIG.apiEndpoint + clientId;
          $.ajax({
            type: 'PATCH',
            url: url,
            data: data,
            headers: {
              'Authorization': 'Bearer ' + idToken
            },
            dataType: "text",
            success: result => {
              console.log("data saved successfully");
              resolve(result);
            },
            error: err => {
              sendMessageExtra('Error in AJAX call for update data', err);
              reject(err);
            }
          });
        })
        .catch(err => {
          sendMessageExtra('Error while updating data', err);
          reject(err);
        });
    });
  }
}
