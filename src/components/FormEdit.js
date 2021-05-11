import { Container, Typography, Paper, Input } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import FormEditBlock from './FormEditBlock';

const useStyles = makeStyles((theme) => ({
  chip: {
    marginTop: "20px",
    marginBottom: "10px"
  },
  paper: {
    padding: "2em",
    marginBottom: "1em"
  },
  title: {
    fontSize: "2em",
    marginBottom: "0.5em"
  }
}));

export default function FormEdit(props) {
  const classes = useStyles();
  const [formData, setFormData] = useState({ "blocks": [0, 1, 2] });

  return (
    <Container maxWidth="md">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {/* <Typography variant="h4"><FormattedMessage id="formEdit.title" /></Typography> */}
        <Button variant="contained">儲存</Button>
      </div>
      {/* <Typography><FormattedMessage id="loading" /></Typography> */}
      <Paper className={classes.paper}>
        <Typography className={classes.title}>比賽標題＋報名表(標題直接帶入，不開放編輯)</Typography>
        <Input placeholder="Form description" fullWidth multiline />
      </Paper>
      {formData.blocks.map((block) => (
        <FormEditBlock block={block} />
      ))}
    </Container>

  );
}