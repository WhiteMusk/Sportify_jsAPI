import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react'
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
import { useQuery, useMutation } from '@apollo/client';
import { Host_QUERY, Edit_Host_MUTATION } from '../graphql';
import Navbar from "../components/Navbar";

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

function OrganizerInfo(props) {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [page, setPage] = useState("");
    const [bankCode, setBankCode] = useState("");
    const [bankAccount, setBankAccount] = useState("");

    const { loading, error, data, refetch } = useQuery(Host_QUERY, { variables: { host_id: props.match.params.hostID } });
    if (error) console.log(error);

    useEffect(() => {
        if (!loading) {
            setName(data.host.name);
            setEmail(data.host.email);
            if (data.host.phone !== null)
                setPhone(data.host.phone);
            if (data.host.page !== null)
                setPage(data.host.page);
            if (data.host.bankCode !== null)
                setBankCode(data.host.bankCode);
            if (data.host.bankAccount !== null)
                setBankAccount(data.host.bankAccount);
        }
    },
        [data],
    );

    const [editHost] = useMutation(Edit_Host_MUTATION);

    const handleSubmit = async (event) => {
        event.preventDefault();

        var isSuccess = true;
        try {
            await editHost({
                variables: {
                    _id: props.match.params.hostID,
                    name: name,
                    phone: phone,
                    email: email,
                    page: page,
                    bank_code: bankCode,
                    bank_account: bankAccount
                }
            })
        } catch (e) {
            console.log(e.networkError.result.errors); // here you can see your network
            isSuccess = false;
        }

        if (isSuccess) {
            alert("編輯成功！");
            refetch();
        } else {
            alert("編輯失敗！請再試一次");
        }
    }

    return (
        <>
        <Navbar/>
        <Container maxWidth="md" className={classes.container} alignItems="center" justify="center">
            <Toolbar />
            <form className={classes.form}>
                <Button className={classes.submitBut} variant="contained" color="default"
                    type="submit"
                    onClick={handleSubmit}
                >
                    <FormattedMessage id="organizerInfo.save" />
                </Button>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow key="info1">
                                <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.name" /></TableCell>
                                <TableCell>
                                    <TextField fullWidth label="Name"
                                        value={name}
                                        onInput={e => setName(e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow key="info2">
                                <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.phone" /></TableCell>
                                <TableCell>
                                    <TextField fullWidth label="Phone"
                                        value={phone}
                                        onInput={e => setPhone(e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow key="info3">
                                <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.email" /></TableCell>
                                <TableCell>
                                    <TextField fullWidth label="Email"
                                        value={email}
                                        onInput={e => setEmail(e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow key="info4">
                                <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.website" /></TableCell>
                                <TableCell>
                                    <TextField fullWidth label="Page"
                                        value={page}
                                        onInput={e => setPage(e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow key="info5">
                                <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.bank" /></TableCell>
                                <TableCell>
                                    <TextField fullWidth label="Bank Code"
                                        value={bankCode}
                                        onInput={e => setBankCode(e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow key="info6">
                                <TableCell component="th" scope="row" align="center"><FormattedMessage id="organizerInfo.bankAccount" /></TableCell>
                                <TableCell>
                                    <TextField fullWidth label="Bank Account"
                                        value={bankAccount}
                                        onInput={e => setBankAccount(e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </Container>
        </>
    );
}

export default OrganizerInfo;