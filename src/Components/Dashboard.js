import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// COMPONENTS
import User from './User';
import Organisation from './Organisation';
import Sites from './Sites';
import Services from './Services';
import Navigation from './Navigation';
import Footer from './Footer';
const jwtDecode = require('jwt-decode');

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    const isGuestUser = localStorage.getItem('isGuestUser');
    if (isGuestUser === 'true') {
      this.getGuestUserData();
    } else {
      this.getUserData();
    }
  }

  updateOrganisation = newData => {
    this.setState({
      organisation: newData
    });
  };

  getUserData = e => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    const { given_name, family_name } = decoded;
    this.setState({ given_name, family_name });
    if (token) {
      const baseURL = process.env.REACT_APP_BASE_URL;
      const url = `${baseURL}/protected/getUserData`;
      const options = {
        headers: { token }
      };
      axios.get(url, options).then(res => {
        const { organisation, user, message } = res.data;
        this.setState({
          organisation,
          user,
          message
        });
        console.log('DASHBOARD this.state', ': ', this.state);
      });
    } else {
      this.setState({ error: 'token error' });
    }
  };

  getGuestUserData = () => {
    this.setState({ message: 'Loading...' });
    const baseURL = process.env.REACT_APP_BASE_URL;
    const url = `${baseURL}/protected/getUserData`;
    // Sending the token in the headers to the server:
    const token = 'guest_user';
    const given_name = 'guest_user';
    const family_name = 'guest_user';
    this.setState({ given_name, family_name });

    const options = {
      headers: { token }
    };

    axios
      .get(url, options)
      .then(res => {
        this.setState({ message: 'Guest Session' });

        console.log('res.data', ': ', res.data);
        const { organisation, user } = res.data;
        this.setState({
          organisation,
          user
        });
        console.log('DASHBOARD this.state', ': ', this.state);
      })
      .catch(err => {
        this.setState({ message: err.message });
      });
  };

  render() {
    const { organisation, user, given_name, family_name } = this.state;
    if (organisation) {
      return (
        <div className='page-container'>
          <Navigation originPage='dashboard' />

          <div className='body-container'>
            <Tabs defaultIndex={0}>
              <TabList>
                <Tab>User Profile</Tab>
                <Tab>Organisation</Tab>
                <Tab>Sites</Tab>
                <Tab>Services</Tab>
              </TabList>

              <TabPanel>
                <User
                  user={user}
                  organisation={organisation}
                  given_name={given_name}
                  family_name={family_name}
                />
              </TabPanel>

              <TabPanel>
                <Organisation
                  organisation={organisation}
                  updateOrganisation={this.updateOrganisation}
                />
              </TabPanel>

              <TabPanel>
                <Sites
                  organisation={organisation}
                  updateOrganisation={this.updateOrganisation}
                />
              </TabPanel>

              <TabPanel>
                <Services
                  organisation={organisation}
                  updateOrganisation={this.updateOrganisation}
                />
              </TabPanel>
            </Tabs>
          </div>
          <Footer />
        </div>
      );
    } else {
      return (
        <div className='page-container'>
          <Navigation originPage='dashboard' />
          <div className='body-container'>
            <h3> {this.state.message} </h3>
          </div>
          <Footer />
        </div>
      );
    }
  }
}
export default Dashboard;
