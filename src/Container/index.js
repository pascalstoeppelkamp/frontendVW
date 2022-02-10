import React, { Component } from 'react'
import Tabs from '../Components/Tabs';
import FlashMessage from '../Components/FlashMessage';
export default class index extends Component {
    render() {
        return (
            <div >
                <FlashMessage />
                <Tabs logout={this.props.logout} />
            </div>
        )
    }
}
