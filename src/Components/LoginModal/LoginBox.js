import React, { Component } from 'react';
import { Box, TextField, Button, CircularProgress } from '@material-ui/core';
import ServerUtils from '../../utils/ServerUtils';
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  loginContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1.5,
    marginTop: 20,
  },
  username: {
    marginLeft: 30,
    marginRight: 30,
  },
  password: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
  },
  loginBtn: {
    width: '100%',
    height: 30,
  },
  loginBtnBox: {
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
  },
  errorMsg: {
    fontFamily: 'sans-serif',
    color: 'red',
    fontSize: 23,
    paddingTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  progressBar: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    zIndex: 1,
  },
  close: {
    position: 'absolute',
    margin: 5,
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
        <Button
          className={classes.close}
          onClick={() => this.props.closeModal()}
        >
          X
        </Button>
        {isLoading ? (
          <CircularProgress disableShrink className={classes.progressBar} />
        ) : null}
        <Box style={{ marginLeft: 30 }}>
          <p
            style={{
              fontFamily: 'IBM Plex Sans Arabic',
              fontSize: 23,
              paddingTop: 20,
            }}
          >
            Anmeldung
          </p>
        </Box>
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
          <Box
            borderColor="primary.main"
            border={1}
            className={classes.loginBtnBox}
          >
            <Button onClick={this.Login} className={classes.loginBtn}>
              Anmelden
            </Button>
          </Box>
          {error ? <p className={classes.errorMsg}>{error}</p> : null}
        </Box>
      </Box>
    );
  }
}
export default withStyles(styles)(LoginBox);
