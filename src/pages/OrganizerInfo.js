import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    submitBut: {
        float: "right",
        marginTop: "10px",
        marginBottom: "10px",
        marginRight: "10px",
    },
    form: {
        width: "50%",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

function OrganizerInfo() {
    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.container} alignItems="center" justify="center">
            <Toolbar />
            <form className={classes.form}>
                <Button className={classes.submitBut} variant="contained" color="default"
                    type="submit"
                // onClick={handleSubmit}
                >
                    <FormattedMessage id="organizerInfo.save" />
                </Button>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow key="info1">
                                <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.name" /></TableCell>
                                <TableCell>
                                    <TextField fullWidth label="Name" />
                                </TableCell>
                            </TableRow>
                            <TableRow key="info2">
                                <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.phone" /></TableCell>
                                <TableCell>
                                    <TextField fullWidth label="Phone" />
                                </TableCell>
                            </TableRow>
                            <TableRow key="info3">
                                <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.email" /></TableCell>
                                <TableCell>
                                    <TextField fullWidth label="Email" />
                                </TableCell>
                            </TableRow>
                            <TableRow key="info4">
                                <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.website" /></TableCell>
                                <TableCell>
                                    <TextField fullWidth label="Page" />
                                </TableCell>
                            </TableRow>
                            <TableRow key="info5">
                                <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.bank" /></TableCell>
                                <TableCell>
                                    <TextField fullWidth label="Bank Code" />
                                </TableCell>
                            </TableRow>
                            <TableRow key="info6">
                                <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.bankAccount" /></TableCell>
                                <TableCell>
                                    <TextField fullWidth label="Bank Account" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </Container>
    );
}

export default OrganizerInfo;