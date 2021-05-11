import { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { useQuery, useMutation } from '@apollo/client';

import { Container, Typography, Paper, Input, Button, IconButton, Grid } from '@material-ui/core';
import { AddCircleOutline, DeleteOutline } from '@material-ui/icons';

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

// TODO: generate uniqueKey for each block data
export default function FormEdit(props) {
  const classes = useStyles();
  const [formData, setFormData] = useState({ "blocks": [
    {
      "id": "someUniqueIdMaybe",
      "blockType": "multipleChoice",
      "question": "test Question #1",
      "description": "some description",
      "fields": ["male", "female", "other"]
    },
    {
      "id": "someUniqueIdMaybe2",
      "blockType": "checkboxes",
      "question": "test Question #2",
      "description": "some description",
      "fields": ["male", "female", "other"]
    },
    {
      "id": "someUniqueIdMaybe3",
      "blockType": "dropdown",
      "question": "test Question #3",
      "description": "some description",
      "fields": ["male", "female", "other"]
    },
    {
      "id": "someUniqueIdMaybe4",
      "blockType": "shortAnswer",
      "question": "test Question #4",
      "description": "some description",
    }
  ] });

  const handleAddBlockClick = (_, index) => {
    const newFormData = Object.assign({}, formData);
    newFormData.blocks.splice(index + 1, 0, { "blockType": "multipleChoice" });
    setFormData(newFormData);
  }

  const handleDeleteClick = (_, index) => {
    const newFormData = Object.assign({}, formData);
    newFormData.blocks.splice(index, 1);
    setFormData(newFormData);
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
      {formData.blocks.map((block, index) => (
        <>
          <FormEditBlock key={block.id} block={block} />
          <Grid container alignItems="center" justify="center">
            {/* <Grid item xs={4}><hr /></Grid> */}
            <Grid item>
              <IconButton onClick={(e) => handleAddBlockClick(e, index)}>
                <AddCircleOutline /></IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={(e) => handleDeleteClick(e, index)}>
                <DeleteOutline /></IconButton>
            </Grid>
            {/* <Grid item xs={4}><hr /></Grid> */}
          </Grid>
        </>
      ))}
    </Container>

  );
}