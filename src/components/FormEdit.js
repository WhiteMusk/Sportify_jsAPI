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
import { useState, useEffect } from 'react';
import FormEditBlock from './FormEditBlock';

const useStyles = makeStyles((theme) => ({
    chip: {
        marginTop: "20px",
        marginBottom: "10px"
    },
    table: {
        minWidth: 700,
    },
}));

export default function FormEdit(props) {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h4"><FormattedMessage id="formEdit.title" /></Typography>
            {/* <Typography><FormattedMessage id="loading" /></Typography> */}
            <FormEditBlock />
        </>  
    
    );
}