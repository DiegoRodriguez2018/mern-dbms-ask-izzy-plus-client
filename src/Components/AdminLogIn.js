import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import history from "../history";

class AdminLogIn extends Component {
  responseGoogle = response => {
    localStorage.setItem("token", response.tokenId);
    history.push("/admin/dashboard");
  };

  errorGoogle = response => {
    console.log(response);
  };

  redirect = () => {
    history.push('/')
  }

  render() {
    const googleClient = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    return (
      <div className="login-button-container">
        <GoogleLogin
          clientId={googleClient}
          render={renderProps => (
            <button onClick={renderProps.onClick} className="login-button">Login</button>
          )}
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.errorGoogle}
        />
        <div className="toggle-login-container">
          <div className="toggle-login" onClick={this.redirect}>Are you a Service Provider?</div>
        </div>
      </div>
    );
  }
}

export default AdminLogIn;