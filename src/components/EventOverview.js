import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function EventOverview() {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <Typography variant="h4"><FormattedMessage id="eventOverview.name" />：XXX</Typography>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {/* <ImageIcon /> */}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<FormattedMessage id="eventOverview.public" />} secondary="公開" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {/* <WorkIcon /> */}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<FormattedMessage id="eventOverview.release" />} secondary="已發佈" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {/* <BeachAccessIcon /> */}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<FormattedMessage id="eventOverview.views" />} secondary="124" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {/* <BeachAccessIcon /> */}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<FormattedMessage id="eventOverview.count" />} secondary="20" />
            </ListItem>
        </List>
    );
}

export default EventOverview;