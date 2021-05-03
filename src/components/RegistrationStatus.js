import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { useQuery, useMutation } from '@apollo/client';
import { Host_RegistrationStatus_QUERY, Host_SetPaidStatus_MUTATION } from '../graphql';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    chip: {
        marginTop: "20px",
        marginBottom: "10px"
    },
    table: {
        minWidth: 700,
    },
}));

function RegistrationStatus(props) {
    const classes = useStyles();
    const [success, setSuccess] = useState(false);

    const handleClose = () => {
        setSuccess(false);
    }

    const { loading, error, data, refetch } = useQuery(Host_RegistrationStatus_QUERY, { variables: { event_id: props.eventID } });
    if (error) console.log(error);

    const [setPaid] = useMutation(Host_SetPaidStatus_MUTATION);

    const handlePaid = async (index) => {
        var isPaid = false;

        if (!data.eventForms[index].applicant.paid)
            isPaid = true;

        var isSuccess = true;
        try {
            await setPaid({
                variables: {
                    _id: data.eventForms[index]._id,
                    applicant: {
                        paid: isPaid
                    },
                }
            })
        } catch (e) {
            console.log(e.networkError.result.errors); // here you can see your network
            isSuccess = false;
        }

        if (isSuccess) {
            setSuccess(true);
            refetch();
        }
    }

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
                                    <TableCell align="right">學號</TableCell>
                                    <TableCell align="right">系級</TableCell>
                                    <TableCell align="right"><FormattedMessage id="registrationStatus.email" /></TableCell>
                                    <TableCell align="right"><FormattedMessage id="registrationStatus.phone" /></TableCell>
                                    <TableCell align="right">得知比賽資訊來源</TableCell>
                                    <TableCell align="right">歷屆最佳成績</TableCell>
                                    <TableCell align="right">匯款帳號末五碼</TableCell>
                                    <TableCell align="right">大約匯款時間</TableCell>
                                    <TableCell align="right">匯款人姓名</TableCell>
                                    <TableCell align="right"><FormattedMessage id="registrationStatus.fee" /></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.eventForms.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {row.applicant.name}
                                        </TableCell>
                                        <TableCell align="right">{row.applicant.studentID}</TableCell>
                                        <TableCell align="right">{row.applicant.department}</TableCell>
                                        <TableCell align="right">{row.applicant.email}</TableCell>
                                        <TableCell align="right">{row.applicant.phone}</TableCell>
                                        <TableCell align="right">
                                            {row.applicant.information === "others" ? row.applicant.otherInformation :
                                                (row.applicant.information === "fb" ? "台大校網粉專 FB" : "朋友告知 Friends")
                                            }</TableCell>
                                        <TableCell align="right">{row.applicant.notableResult}</TableCell>
                                        <TableCell align="right">{row.applicant.lastFiveDigit}</TableCell>
                                        <TableCell align="right">{row.applicant.transactionTime}</TableCell>
                                        <TableCell align="right">{row.applicant.transactionName}</TableCell>
                                        <TableCell align="right">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={row.applicant.paid}
                                                        onChange={() => handlePaid(index)}
                                                        color="primary"
                                                    />
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer></>}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                message="繳費狀態設定成功"
                action={
                    <>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            Close
                        </Button>
                    </>
                }
            />
        </>
    );
}

export default RegistrationStatus;