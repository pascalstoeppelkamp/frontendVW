import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "bootstrap/dist/css/bootstrap.css";

import AllMembers from '../../Pages/AllMembers';
import SchemaForm from '../../Pages/SchemaForm';

import Button from '@material-ui/core/Button';
import Logout from '@material-ui/icons/ExitToApp';
export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            memberData: {}
        }
    }

    handleSelect = (value) => {
        this.setState({ selectedIndex: value, memberData: {} })
    }

    editMember = (value, member) => {
        this.setState({
            selectedIndex: value,
            memberData: member
        });
    }
    render() {
        return (
            <div>
                <Tabs selectedIndex={this.state.selectedIndex} onSelect={this.handleSelect} style={{}}>
                    <TabList style={{ backgroundColor: "lightblue", display: "flex" }}>
                        <Tab tabFor="0" style={{}}>Alle Mitglieder</Tab>
                        <Tab tabFor="1" style={{}}>Mitglied bearbeiten/hinzufügen</Tab>
                        <div style={{
                            justifyContent: 'flex-end',
                            flex: 1,
                            display: 'flex',
                            alignContent:"center"
                        }}>
                            <Button
                            style={{alignSelf:"center",paddingLeft:16}}
                                onClick={() => this.props.logout()}
                                startIcon={<Logout style={{ fontSize: 30, color: 'white' }} />}
                            />
                        </div>
                    </TabList>

                    <TabPanel tabId="0">
                        <AllMembers editMember={(item) => this.editMember(1, item)} />
                    </TabPanel>
                    <TabPanel tabId="1">
                        <SchemaForm memberData={this.state.memberData} />
                    </TabPanel>
                </Tabs>

            </div >
        )
    }
}