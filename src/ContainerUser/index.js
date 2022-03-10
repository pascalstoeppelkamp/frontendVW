import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Logout from '@material-ui/icons/ExitToApp';
import PaymentIcon from '@mui/icons-material/Payment';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import ServerUtils from '../utils/ServerUtils';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fulldata: {}
    }
    this.ServerUtils = new ServerUtils();
  }
  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    await axios.get('http://localhost:5001/api/v1/auth/me', {
    }).then(result => this.setState({ fulldata: result.data.data })).catch(e => alert(JSON.stringify(e)))
  }

  _setData = () => {
    let { fulldata } = this.state;
    let { Vorname, Nachname, Email, Wohnort, Tel_NR, Beruf } = fulldata;
    let shownData = [{
      name: "Vorname",
      value: Vorname,
    },
    {
      name: "Nachname",
      value: Nachname,
    },
    {
      name: "E-Mail",
      value: Email,
    },
    {
      name: "Wohnort",
      value: Wohnort,
    },
    {
      name: "Telefon Nummer",
      value: Tel_NR,
    },
    {
      name: "Beruf",
      value: Beruf,
    }]
    let arr = [];
    for (let item in shownData) {
      arr.push(
        <p><b>{shownData[item].name}</b>: {shownData[item].value}</p>
      )
    }
    return arr;
  }

  payPremium = async () => {
    await this.ServerUtils.payPremium().then((result) => {
      if (result.data.data.hasPremium) {
        let tempFullData = this.state.fulldata;
        tempFullData.hasPremium = result.data.data.hasPremium
        this.setState({ fulldata: tempFullData })
      }
    });
  }

  _getPremiumInfo = () => {
    let { fulldata } = this.state;
    if (fulldata.hasPremium) {
      return <p style={{ color: "green" }}> Premium wurde bezahlt</p>
    }
    else {
      return <Paper style={{ display: "flex", justifyContent: "space-around", alignContent: "center" }}><p style={{ marginBottom: 0, color: "red", alignSelf: "center" }}> Premium wurde noch nicht bezahlt</p>

        <Tooltip title="Jetzt bezahlen">
          <IconButton onClick={() => this.payPremium()}>
            <PaymentIcon style={{ fontSize: 30, color: 'black' }} />
          </IconButton>
        </Tooltip>
      </Paper>
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <div style={{ width: '800', height: '100%', alignContent: "center", display: "flex", alignItems: "center", justifyContent: "flex-start", margin: 10 }}>
          <Paper style={{ width: 400, height: 600, padding: 15 }}>
            {this._setData()}
            {this._getPremiumInfo()}
          </Paper>
        </div>
      </div>
    )
  }
}
