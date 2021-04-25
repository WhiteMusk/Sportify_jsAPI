import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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
            <Typography variant="h4">賽事名稱：XXX</Typography>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {/* <ImageIcon /> */}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="公開狀態" secondary="公開" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {/* <WorkIcon /> */}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="發佈狀態" secondary="已發佈" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {/* <BeachAccessIcon /> */}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="頁面瀏覽次數" secondary="124" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {/* <BeachAccessIcon /> */}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="報名人次" secondary="20" />
            </ListItem>
        </List>
    );
}

export default EventOverview;