import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import Navbar from "../components/Navbar";
import { useMediaQuery } from 'react-responsive'
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    appBarSpacer: theme.mixins.toolbar,
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    root:{
       marginTop: theme.spacing(2),
       marginBottom:theme.spacing(2)
    },
    message:{
        height:400,
    }
}));
function ContactUs()
{
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const classes = useStyles();
    return (
        <>
        <Navbar/>

        <Container maxWidth="sm" className={classes.container}>
        <div className={classes.appBarSpacer} />
        <Paper className={classes.paper} elevation={5}>
        <Typography  variant='h4'>Contact us</Typography>
        <Divider />
        <Typography className={classes.root} variant='h5'>How can we contact you?</Typography>
        <Grid container spacing={3}>
        <Grid item xs={6}>
        <TextField fullWidth label='Name' variant='outlined'/>
        </Grid>
        <Grid item xs={6}>
        <TextField fullWidth label='Email' variant='outlined'/>
        </Grid>
        </Grid>
        <Typography className={classes.root} variant='h5'>What is your message to us?</Typography>
        <Grid container>
        <Grid item xs={12}>
        {isMobile?
        <TextField fullWidth multiline rows={19} className={classes.message} label='Message' variant='outlined'/>:
        <TextField fullWidth multiline rows={20} className={classes.message} label='Message' variant='outlined'/>}
        </Grid>
        </Grid>
        <Button className={classes.root} variant="contained" color="default">Submit</Button>
        </Paper> 
        </Container>
        
        </>
    )

}
export default ContactUs;