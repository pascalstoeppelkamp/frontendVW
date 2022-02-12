import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Logout from '@material-ui/icons/ExitToApp';

import axios from 'axios';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fulldata: {}
    }
  }
  componentDidMount() {
    /*  alert(this.props.id); */
    this.getData()
  }

  getData = async () => {
    await axios.get('http://localhost:5001/api/v1/auth/me', {
    }).then(result => this.setState({ fulldata: result.data.data })).catch(e => alert(JSON.stringify(e)))
  }

  _setData = () => {
    let { fulldata } = this.state;
    let arr = [];
    for (let item in fulldata) {
      if (item !== "_id" && item !== "__v" && item !== "id" && item !== "createdAt") {
        arr.push(
          <p><b>{item}</b>: {fulldata[item]}</p>
        )
      }
    }
    return arr;
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <div style={{ height: 60, width: '100%', backgroundColor: "lightblue", display: "flex" }}>
          <p style={{ color: "white", fontSize: 28, marginBottom: 0, alignSelf: "center", paddingLeft: 5 }}>Sportverein Osnabrück  </p>
          <Button
            style={{ alignSelf: "center", paddingLeft: 16 }}
            onClick={() => this.props.logout()}
            startIcon={<Logout style={{ fontSize: 30, color: 'white' }} />}
          />
        </div>
        <div style={{ width: '800', height: '100%', alignContent: "center", display: "flex", alignItems: "center", justifyContent: "flex-start", margin: 10 }}>
          <div style={{ width: 400, height: 600, backgroundColor: "lightgrey" }}>
            {this._setData()}
          </div>
        </div>
      </div>
    )
  }
}
