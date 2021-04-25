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

const useStyles = makeStyles((theme) => ({
    chip: {
        marginTop: "20px",
        marginBottom: "10px"
    },
    table: {
        minWidth: 700,
    },
}));

function createData(name, gender, birthday, category, partner, group, email, phone) {
    return { name, gender, birthday, category, partner, group, email, phone };
}

const rows = [
    createData('test 1', "女", "83-09-28", "單打", "", "A組", "test1@gmail.com", "09-00000000"),
    createData('test 2', "男", "85-01-13", "雙打", "test 3", "A組", "test2@gmail.com", "09-11111111"),
];

function RegistrationStatus() {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h4">報名狀況</Typography>
            <Chip label="報名人數：20" variant="outlined" className={classes.chip} />

            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>姓名</TableCell>
                            <TableCell align="right">生理性別</TableCell>
                            <TableCell align="right">出生日期</TableCell>
                            <TableCell align="right">單/雙打</TableCell>
                            <TableCell align="right">搭檔姓名</TableCell>
                            <TableCell align="right">組別</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">聯絡電話</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default RegistrationStatus;