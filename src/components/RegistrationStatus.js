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

function RegistrationStatus() {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h4"><FormattedMessage id="registrationStatus.title" /></Typography>
            <Chip label={<FormattedMessage id="registrationStatus.count" />} variant="outlined" className={classes.chip} />

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
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.gender}</TableCell>
                                <TableCell align="right">{row.birthday}</TableCell>
                                <TableCell align="right">{row.category}</TableCell>
                                <TableCell align="right">{row.partner}</TableCell>
                                <TableCell align="right">{row.group}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                {row.isPay === true ? <TableCell align="right"><FormattedMessage id="registrationStatus.isFee" /></TableCell> : <TableCell align="right"><FormattedMessage id="registrationStatus.noFee" /></TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default RegistrationStatus;