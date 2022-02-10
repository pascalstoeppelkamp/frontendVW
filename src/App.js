import React, { Component } from 'react'
import ContainerVerwalter from './Container';
import ContainerUser from './ContainerUser';
import LoginModal from './Components/LoginModal';

import ServerUtils from './utils/ServerUtils';

import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.ServerUtils = new ServerUtils();
    this.state = {
      hideLoginModal: false,
      role: "",
      id: "",
      token: ""
    }
  }

  hideLoginModal = (data) => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + data.token;
    this.setState({ hideLoginModal: true, role: data.userrole, id: data.id, token: data.token })
  }

  _logout = async () => {
    this.setState({ hideLoginModal: false, role: "" });
    await this.ServerUtils.logout();
  }
  render() {
    return (
      <>
        {!this.state.hideLoginModal ? <LoginModal
          _Login={(data) => this.hideLoginModal(data)} /> : null}
        {this.state.role === "verwalter" ? <ContainerVerwalter logout={() => this._logout()} /> : this.state.role === "user" ? <ContainerUser
          logout={() => this._logout()}
          id={this.state.id}
          token={this.state.token} /> : null}
      </>
    )
  }
}
