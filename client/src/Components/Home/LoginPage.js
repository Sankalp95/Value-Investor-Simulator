import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  nameChange(event) {
    this.setState({ name: event.target. value })
  }

  emailChange(event) {
    this.setState({ email: event.target. value })
  }

  passwordChange(event) {
    this.setState({ password: event.target. value })
  }
  render() {
    return(
      <div className = 'loginContainer'>
        <Grid direction = 'column' style={{display:'flex'}} >
          <TextField 
            id="standard-basic" 
            className = 'loginField_item' 
            label="Email Address" 
            onChange = {this.emailChange} 
          />
          <TextField 
            id="standard-password-input" 
            className = 'loginField_item' 
            label="Password"
            onChange = {this.passwordChange}
            type="password"
            autoComplete="current-password"
          />
          <Button 
            variant="contained" 
            color="primary" 
            className = 'loginButton' 
            onClick = {() => this.props.submitLogin(this.state.name, this.state.email, this.state.password)}
          >
            Login
          </Button>
        </Grid>
      </div>
    );
  }
};

export default LoginPage;