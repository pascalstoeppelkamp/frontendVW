import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { Component } from 'react';

export default class index extends Component {
    render() {
        return <div>
            <ToastContainer position='top-left' />
        </div>;
    }
}
