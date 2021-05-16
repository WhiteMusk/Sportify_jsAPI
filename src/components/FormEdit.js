import { useState, useEffect, createContext } from 'react';
import { gql } from '@apollo/client';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { useQuery, useMutation } from '@apollo/client';

import { Container, Typography, Paper, Input, Button, IconButton, Grid } from '@material-ui/core';
import { AddCircleOutline, DeleteOutline } from '@material-ui/icons';

import FormEditBlock from './FormEditBlock';

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: "580px"
  },
  paper: {
    padding: "2em",
    marginBottom: "1em"
  },
  title: {
    fontSize: "2em",
    marginBottom: "0.5em"
  },
  saveButton: {
    height: "3em"
  }
}));

const FormContext = createContext(null);

export default function FormEdit(props) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_EVENT_FORM_QUERY, { variables: { eventId: props.eventID } });
  const [formData, setFormData] = useState();
  const [uniqueKey, setUniqueKey] = useState(1);
  // const [formData, setFormData] = useState({ "blocks": [
  //   {
  //     "id": "someUniqueIdMaybe",
  //     "blockType": "multipleChoice",
  //     "question": "test Question #1",
  //     "description": "some description",
  //     "options": ["male", "female", "other"]
  //   },
  //   {
  //     "id": "someUniqueIdMaybe2",
  //     "blockType": "checkboxes",
  //     "question": "test Question #2",
  //     "description": "some description",
  //     "options": ["male", "female", "other"]
  //   },
  //   {
  //     "id": "someUniqueIdMaybe3",
  //     "blockType": "dropdown",
  //     "question": "test Question #3",
  //     "description": "some description",
  //     "options": ["male", "female", "other"]
  //   },
  //   {
  //     "id": "someUniqueIdMaybe4",
  //     "blockType": "shortAnswer",
  //     "question": "test Question #4",
  //     "description": "some description",
  //   }
  // ] });

  const getUniqueKey = () => {
    setUniqueKey(prevState => prevState + 1);
    return uniqueKey;
  }

  const handleAddBlockClick = (_, index) => {
    const newFormData = Object.assign({}, formData);
    newFormData.blocks.splice(index + 1, 0, { 
      "blockType": "multipleChoice",
      "blockId": getUniqueKey()
    });
    setFormData(newFormData);
  }

  const handleDeleteClick = (_, index) => {
    const newFormData = Object.assign({}, formData);
    newFormData.blocks.splice(index, 1);
    setFormData(newFormData);
  }

  const handleSaveClick = (e) => {
    e.preventDefault();
    
  }

  useEffect(() => {
    console.log(formData);
    // console.log(uniqueKey);
  }, [formData]);

  useEffect(() => {
    console.log(data);
    if (data) {
      let form = data.getEvent.form;
      if (!form.blocks.length) { 
        // Set default form block if there is no form data
        form = { "blocks": [{ 
          "blockType": "multipleChoice", 
          "blockId": getUniqueKey() }]};
        setFormData(form);
      } else {
        const newFormData = Object.assign({}, form);
        newFormData.blocks.map((block, index) => {
          return { ...block, [index]: index }
        });
        setFormData(newFormData);
        setUniqueKey(form.blocks.length);
      }
    }
  }, [data]);

  return (
    <Container className={classes.container} maxWidth="md">
      {loading ? <Typography><FormattedMessage id="loading" /></Typography> : (
        <>
          <Paper className={classes.paper}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography className={classes.title}>{data.getEvent.title}報名表</Typography>
              <Button className={classes.saveButton} variant="contained"
                onSubmit={handleSaveClick}>儲存</Button>
            </div>
            <Input placeholder="Form description" fullWidth multiline 
              defaultValue={data.getEvent.form.description} />
          </Paper>
          { formData && formData.blocks.length ? (
            formData.blocks.map((block, index) => (
            <>
              <FormContext.Provider value={[formData, setFormData]}>
                <FormEditBlock 
                  key={block.blockId} 
                  block={block} 
                  blockIndex={index}
                  formContext={FormContext}
                />
              </FormContext.Provider>
              <Grid container alignItems="center" justify="center">
                <Grid item>
                  <IconButton onClick={(e) => handleAddBlockClick(e, index)}>
                    <AddCircleOutline /></IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={(e) => handleDeleteClick(e, index)}>
                    <DeleteOutline /></IconButton>
                </Grid>
              </Grid>
            </>))) : ( // Show AddBlock icon when no block is present
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <IconButton onClick={(e) => handleAddBlockClick(e, 0)}>
                  <AddCircleOutline /></IconButton>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Container>
  );
}

const GET_EVENT_FORM_QUERY = gql`
  query ($eventId: String!) {
    getEvent(eventId: $eventId) {
      title
      form {
        description
        blocks {
          blockType
          question
          description
          options
        }
      }
    }
  }
`;