import React, { Component } from 'react';

// COMPONENTS
import Navigation from '../Components/Navigation';
import Login from '../Components/Authentication/Login';
import Footer from '../Components/Footer';
import hands from '../Images/app/hands.png';

class Home extends Component {
  render() {
    return (
      <div className='page-container'>
        <Navigation originPage='home' />
        <div className='body-container'>
          <div className='root-container'>
            <h1 className='home-headline'>Welcome to Ask Izzy Plus, User</h1>
            <div className='homepage-icon'>
              <img src={hands} alt='Homepage icon' />
            </div>
            <Login />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
