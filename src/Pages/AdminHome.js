import React, { Component } from 'react';

import Navigation from '../Components/Navigation';
import AdminLogIn from '../Components/AdminLogIn';
import Footer from '../Components/Footer';
import heart from '../Images/app/heart.png';
class Admin extends Component {
  render() {
    return (

      <div className="page-container">
        <Navigation originPage="home"/>

        <div className="body-container">
          <h1>Welcome to Ask Izzy Plus, Infoxchange</h1>
          <div className="homepage-icon">
              <img src={heart} alt="Homepage icon" />
          </div>
          <AdminLogIn />
        </div>

        <Footer />
      </div>
    );
  }
}
export default Admin;