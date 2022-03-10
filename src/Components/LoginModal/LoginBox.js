import React, { Component } from 'react';
import { Box, TextField, Button, CircularProgress } from '@material-ui/core';
import ServerUtils from '../../utils/ServerUtils';
import { withStyles } from '@material-ui/core/styles';

import { IconButton } from '@mui/material';

import Login from '@mui/icons-material/Login';

const styles = (theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  loginContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 20

  },
  username: {
    padding: 5
  },
  password: {
    padding: 5
  },
  loginBtn: {
   width:50
  },
  loginBtnBox: {
    margin: 5
  },
  errorMsg: {
    color: 'red',
    fontSize: 23,
    paddingTop: 20,

  },
  progressBar: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    zIndex: 1,
  },
  close: {
    position: 'absolute',

    alignSelf: 'flex-end',
  },
});

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.ServerUtils = new ServerUtils();
    this.state = {
      username: '',
      password: '',
      error: null,
      isLoading: false,
    };
  }

  Login = async () => {
    let { username, password } = this.state;
    let data = {};
    let body = {
      email: username,
      password: password,
    };
    this.setState({ isLoading: true });
    await this.ServerUtils.login(body).then((result) => {
      data = result;
    });
    if (data?.data?.success) {
      this.setState({ error: null, isLoading: false });
      this.props.Login(data.data);
    } else {
      this.setState({ error: data.response.data.error, isLoading: false });
    }
  };

  render() {
    let { error, isLoading } = this.state;
    let { classes } = this.props;
    return (
      <Box className={classes.container}>

        {isLoading ? (
          <CircularProgress disableShrink className={classes.progressBar} />
        ) : null}

        <Box className={classes.loginContainer}>
          <TextField
            className={classes.username}
            variant="filled"
            onChange={(username) =>
              this.setState({ username: username.target.value })
            }
            label="Email"
          />
          <TextField
            className={classes.password}
            variant="filled"
            type="password"
            onChange={(password) =>
              this.setState({ password: password.target.value })
            }
            label="password"
          />
         
            <IconButton  onClick={this.Login} className={classes.loginBtn}>
              <Login />
            </IconButton>
        
          {error ? <p className={classes.errorMsg}>{error}</p> : null}
        </Box>
      </Box>
    );
  }
}
export default withStyles(styles)(LoginBox);
