import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EventBasicInfo from './EventBasicInfo';
import RichTextEditor from './RichTextEditor';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles({

});

function EventInfo(props) {
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
                    <Tab label={<FormattedMessage id="eventInfo.basic" />} value={1} />
                    <Tab label={<FormattedMessage id="eventInfo.brief" />} value={2} />
                    <Tab label={<FormattedMessage id="eventInfo.registraion" />} value={3} />
                    <Tab label={<FormattedMessage id="eventInfo.traffic" />} value={4} />
                    <Tab label={<FormattedMessage id="eventInfo.prize" />} value={5} />
                </Tabs>

                {currentTab === 1 ?
                    <EventBasicInfo eventID={props.eventID} /> :
                    <RichTextEditor tab={currentTab} eventID={props.eventID} />
                }
            </Paper>
        </>
    );
}

export default EventInfo;