import React, { Component } from "react";
import Overview from './Overview.js';
import LoginPage from './LoginPage.js';
import UserInformation from './UserInformation.js';
import axios from 'axios';

export default class HomePage extends Component{
  constructor() {
      super();
      this.state = {
        selectedEquity: null,
        showRegister: false,
        showLogin: false,
        loggedInUserCreds: null,
      };

      // Fixing the context.
      this.handleLogin = this.handleLogin.bind(this);
      this.submitLogin = this.submitLogin.bind(this);
  };

  /**
   * Handler when the user attempts to login.
   */
  submitLogin(name, email, password) {
    let requestBody = {
      name,
      email,
      password
    };
    axios.post('http://localhost:8080/api/auth/login', requestBody)
    .then(response => {
      this.setState({
        loggedInUserCreds: response.data,
        showLogin: false
      });
    }).catch(err => {
      console.log(err);
    });
  };

  /**
   * Shows the modal for the login window.
   */
  handleLogin() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  };

  /***
   * Handler when the user attempts to sign up.
   */
  handleSignup() { };

  render() {
    return(
      <div>
        {/* Overview on what this page is + sign up buttons. */}
        <Overview handleLogin = {this.handleLogin} handleSignup = {this.handleSignup} />

        {/* Login Page */}
        {this.state.showLogin && !this.state.loggedInUserCreds && <LoginPage submitLogin = {this.submitLogin} />}

        {/* User Information page. */}
        {this.state.loggedInUserCreds && <UserInformation userInfo = {this.state.loggedInUserCreds}></UserInformation>}
      </div>
    )
  };
};