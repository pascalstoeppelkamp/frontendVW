import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import AllMembers from '../../Pages/AllMembers';

export default class index extends React.Component {
    render() {
        return (
            <div>
                <Tabs style={{}}>
                    <TabList style={{ backgroundColor: "lightblue" }}>
                        <Tab style={{  }}>Alle Mitglieder</Tab>
                        <Tab style={{  }}>Mitglied hinzufügen</Tab>
                    </TabList>

                    <TabPanel>
                        <AllMembers />
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs>

            </div>
        )
    }
}