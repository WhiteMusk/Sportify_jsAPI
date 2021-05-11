import { Container, Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
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
  table: {
    minWidth: 700,
  },
}));

export default function FormEdit(props) {
  const classes = useStyles();
  const [formData, setFormData] = useState({ "blocks": [0, 1, 2] });

  return (
    <Container maxWidth="md">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4"><FormattedMessage id="formEdit.title" /></Typography>
        <Button variant="contained">儲存</Button>
      </div>
      {/* <Typography><FormattedMessage id="loading" /></Typography> */}
      {formData.blocks.map((block) => (
        <FormEditBlock block={block} />
      ))}
    </Container>

  );
}