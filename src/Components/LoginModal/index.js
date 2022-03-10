import React, { Component } from 'react';
import { Box, Modal, Paper } from '@material-ui/core';
import LoginBox from './LoginBox';
const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",

  },
  loginBox: {
    borderRadius: 1,
    boxShadow: 10,
    padding: 20,
    minWidth: '25%',
    borderRadius: 20
  },
};
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _Login = (data) => {
    this.props._Login(data);
  };

  render() {
    return (
      <Modal open={true} onClose={() => this.props.closeModal()}>
        <Box
          style={styles.container}>
          <Paper elevation={10} style={styles.loginBox}>
            <LoginBox
              Login={this._Login}

              closeModal={() => this.props.closeModal()}
            />
          </Paper>
        </Box>
      </Modal>
    );
  }
}
