import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EventBasicInfo from './EventBasicInfo';
import RichTextEditor from './RichTextEditor';

const useStyles = makeStyles({

});

function EventInfo() {
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState(1);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    }

    return (
        <>
            <Paper square>
                <Tabs
                    value={currentTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleTabChange}
                >
                    <Tab label="基本資訊" value={1} />
                    <Tab label="賽事資訊(簡章)" value={2} />
                    <Tab label="報名資訊" value={3} />
                    <Tab label="交通資訊" value={4} />
                    <Tab label="獎項" value={5} />
                </Tabs>

                {currentTab === 1 ?
                    <EventBasicInfo /> :
                    <RichTextEditor tab={currentTab} />
                }
            </Paper>
        </>
    );
}

export default EventInfo;