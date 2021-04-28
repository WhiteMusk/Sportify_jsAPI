import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/client';
import { Host_RegistrationStatus_QUERY } from '../graphql';

const useStyles = makeStyles((theme) => ({
    chip: {
        marginTop: "20px",
        marginBottom: "10px"
    },
    table: {
        minWidth: 700,
    },
}));

function createData(name, gender, birthday, category, partner, group, email, phone, isPay) {
    return { name, gender, birthday, category, partner, group, email, phone, isPay };
}

const rows = [
    createData('test 1', "女", "83-09-28", "單打", "", "A組", "test1@gmail.com", "09-00000000", false),
    createData('test 2', "男", "85-01-13", "雙打", "test 3", "A組", "test2@gmail.com", "09-11111111", true),
];

function RegistrationStatus(props) {
    const classes = useStyles();

    const { loading, error, data } = useQuery(Host_RegistrationStatus_QUERY, { variables: { event_id: props.eventID } });
    if (error) console.log(error);

    return (
        <>
            {loading ?
                <>
                    <Typography variant="h4"><FormattedMessage id="registrationStatus.title" /></Typography>
                    <Typography><FormattedMessage id="loading" /></Typography>
                </>
                :
                <><Typography variant="h4"><FormattedMessage id="registrationStatus.title" /></Typography>
                    <Chip label={data.eventForms.length} variant="outlined" className={classes.chip} />

                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><FormattedMessage id="registrationStatus.name" /></TableCell>
                                    <TableCell align="right"><FormattedMessage id="registrationStatus.gender" /></TableCell>
                                    <TableCell align="right"><FormattedMessage id="registrationStatus.birthday" /></TableCell>
                                    <TableCell align="right"><FormattedMessage id="registrationStatus.category" /></TableCell>
                                    <TableCell align="right"><FormattedMessage id="registrationStatus.partner" /></TableCell>
                                    <TableCell align="right"><FormattedMessage id="registrationStatus.group" /></TableCell>
                                    <TableCell align="right"><FormattedMessage id="registrationStatus.email" /></TableCell>
                                    <TableCell align="right"><FormattedMessage id="registrationStatus.phone" /></TableCell>
                                    <TableCell align="right"><FormattedMessage id="registrationStatus.fee" /></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.eventForms.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {row.applicant.name}
                                        </TableCell>
                                        <TableCell align="right">{row.applicant.gender}</TableCell>
                                        <TableCell align="right">{row.applicant.birthday}</TableCell>
                                        <TableCell align="right">{row.event_option.category}</TableCell>
                                        <TableCell align="right">{row.event_option.partner}</TableCell>
                                        <TableCell align="right">{row.event_option.group}</TableCell>
                                        <TableCell align="right">{row.applicant.email}</TableCell>
                                        <TableCell align="right">{row.applicant.phone}</TableCell>
                                        <TableCell align="right"><FormattedMessage id="registrationStatus.noFee" /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer></>}
        </>
    );
}

export default RegistrationStatus;