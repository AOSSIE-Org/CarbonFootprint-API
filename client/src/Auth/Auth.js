import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-config';
import $ from 'jquery'

export default class Auth {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getMetaProfile = this.getMetaProfile.bind(this);
    this.handleAPIKey = this.handleAPIKey.bind(this);
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

  login() {
    this.auth0.authorize();
  }

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

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      //console.log(new Error('No access token found'));
    }
    return accessToken;
  }

  getIdToken() {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      console.log(new Error('No id token found'));
      return;
    }
    return idToken;
  }

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

  getMetaProfile(userId,cb){
    let accessToken = this.getIdToken(),
    url = AUTH_CONFIG.apiEndpoint + userId;
    console.log("userId",userId);
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
        console.log("hey",response);
    }
    else cb(true,{});
  }

  handleAPIKey(type,cb) {
    let idtoken = this.getIdToken();
        console.log(idtoken);
          let response = $.ajax({
                url:"/auth/key",
                type: type,
                headers :{
                    "Content-Type":"application/json",
                    "authorization":"Bearer "+idtoken
                },
                dataType: "text",
                success: function(resultData) {
                    resultData = JSON.parse(resultData);
                    cb(false,resultData);
                },
                error: function(err){
                    throw new Error(err);
                    cb(err);
                }
            });
        //console.log("the response",response);
  }

  updateData(clientId,data,cb) {
    let accessToken = this.getIdToken(),
            url = AUTH_CONFIG.apiEndpoint+clientId;
        console.log(data);
        console.log(clientId);
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
