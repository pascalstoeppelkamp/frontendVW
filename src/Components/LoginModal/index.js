import React, { Component } from 'react';
import { Box, Modal } from '@material-ui/core';
import LoginBox from './LoginBox';
const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    outline: 'none',
  },
  loginBox: {
    width: 444,
    margin: 30,
    height: '56%',
    borderRadius: 6,
    backgroundColor: '#fff',
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
        <Box style={styles.container}>
          <Box border={1} style={styles.loginBox}>
            <LoginBox
              Login={this._Login}
              
              closeModal={() => this.props.closeModal()}
            />
          </Box>
        </Box>
      </Modal>
    );
  }
}
