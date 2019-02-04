import React, { Component } from 'react';
import axios from 'axios';

// COMPONENTS
// import User from './User';
// import Organisation from './Organisation';
import Navigation from './Navigation';
import Footer from './Footer';
import AdminLogOut from './AdminLogOut';

import '../stylesheets/AdminDashboard.css';
const jwtDecode = require('jwt-decode');

class AdminDashboard extends Component {
  state = {
    adminUser: {},
    newUser: {
      email: "",
      organisation:""
    },
    organisations: [],
    users: []
  }

  componentDidMount() {
    console.log("AdminDashboard Component did mount");
    this.getAdminUserData();
    this.getOrganisationData();
    this.getAllUsersData();
  }

  getAdminUserData = (e) => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const {given_name,family_name} = decoded;
    const adminName = given_name;
    const adminLastName = family_name;
    this.setState({adminName,adminLastName})

    if (token) {
      // console.log(token);
      const baseURL = process.env.REACT_APP_BASE_URL;
      const url = `${baseURL}/protected/getAdminUserData`;
      // Sending the token in the headers to the server:
      const options = {
        headers: { token }
      }
      // The server will send back res.data containing { user } and { organisation } objects
      axios.get(url, options)
        .then(res => { 
          // console.log(res.data);
          const { adminUser, message } = res.data; 
          this.setState({ adminUser, message });
        })
    } else {
      console.log("doesnt exists");
      this.setState({ error: "token error" })
    }
  }

  getOrganisationData = (e) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const url = `${baseURL}/protected/organisations`; 
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        token
      }
    }
    axios.get(url, config)
      .then(res => {
        const organisations = [];
        for (let i=0; i<res.data.length; i++) {
          const organisation = {name: "", _id: ""};
          organisation.name = res.data[i].name
          organisation._id = res.data[i]._id
          organisations.push(organisation)
        }
        this.setState({ organisations })
      })
  }

  getAllUsersData = () => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const url = `${baseURL}/protected/users`; 
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        token
      }
    }
    axios.get(url, config)
      .then(res => {
        const users = res.data
        this.setState({ users })
  })
}

  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    const { newUser } = this.state;
    newUser[id]= value; 
    this.setState({ newUser });
  }

  deleteOneUser = (e) => {
    e.preventDefault();
    console.log("Delete one user request triggered.");
    console.log(e.currentTarget.id)
    const user_id = e.currentTarget.id
    const baseURL = process.env.REACT_APP_BASE_URL;
    const url = `${baseURL}/protected/delete/user/${user_id}`;
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        token
      }
    }
    axios.delete(url, config)
    .then(res => this.updateUser(res.data))
  }

  submitForm = (e) => {
    e.preventDefault();
    const baseURL = process.env.REACT_APP_BASE_URL;
    const url = `${baseURL}/protected/create/user`; 
    const { newUser } = this.state;
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        token
      }
    }

    axios.post(url, newUser, config)
      .then(res => this.updateUser(res.data))
  }

  updateUser = (newData) => {
    this.setState({ users: newData })
  }

  render() {
    const { adminUser, users } = this.state;
    if (adminUser && users) {
      const { email } = adminUser;
      const { organisations, adminName, adminLastName } = this.state;
      // const userData = this.displayAllUsers(users);
      return (
        <div className="page-container">
          {/* <nav>
            <AdminLogOut />
          </nav> */}

          <Navigation originPage='dashboard'/>

          <div className="body-container">
            <div className="admin-container">
              <h3>You are now logged in as: </h3>
                <p>email: {email}</p>
                <p>First Name: {adminName}</p>
                <p>Last Name: {adminLastName}</p>
            </div>

            <div className="add-user-container">
              <form id="link_user_organisation" className="add-user-form">
                <h3>Add New User</h3>
                <label> New User Email: </label>
                  <input type="text" id="email" onChange={this.handleInputChange}></input>
                  <br></br>
                <label> New User Organisation: </label>
                  <select id="organisation" onChange={this.handleInputChange}>
                  <option key="" value="1234567890">Testing Organisation Name</option>
                  {organisations.map(organisation => {
                    return <option key={organisation._id} value={organisation._id}>{organisation.name}</option>
                  })
                }
                  </select>
                  <br></br>
                  <button onClick={this.submitForm} className="create-user-button">Submit</button>
              </form>
            </div>

            <div className="all-users-container">
              <h3>All users</h3>
              {users.map(user => {
                return (
                  <React.Fragment key={`fragment of`+ user._id}>
                    <span key={`info of`+user._id}>{user.email} | {user.organisation}</span>
                    <button key={user._id} id={user._id} onClick={this.deleteOneUser}>Delete</button>
                    <br></br>
                  </React.Fragment>
                )
              })}
              </div>
          </div>
          <Footer/>
      </div>

      );
    } else {
      return (
        <React.Fragment>
          <nav>
            <AdminLogOut />
          </nav>
          <h3> {this.state.message} </h3>
        </React.Fragment>
      );
    }
    }
  }
export default AdminDashboard;