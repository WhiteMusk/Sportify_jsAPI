import { Paper, Typography, Grid, FilledInput, OutlinedInput, Select, MenuItem, Input, Radio, IconButton, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { useState, useEffect } from 'react';
import { Clear } from '@material-ui/icons';

const blockTypes = [
  {
    value: 'shortAnswer',
    text: 'Short answer',
  },
  {
    value: 'multipleChoice',
    text: 'Multiple choice',
  },
  {
    value: 'checkboxes',
    text: 'Checkboxes',
  },
  {
    value: 'dropdown',
    text: 'Dropdown',
  },
  {
    value: 'date',
    text: 'Date',
  },
  {
    value: 'time',
    text: 'Time',
  },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "2em"
  },
  chip: {
    marginTop: "20px",
    marginBottom: "10px"
  },
  table: {
    minWidth: 700,
  },
}));

const renderChoiceIcon = (choiceType, index) => {
  switch(choiceType) {
    case 'multipleChoice':
      return <><Radio hidden disabled/><Radio checked={false} disabled/></>;
    case 'checkboxes':
      return <Checkbox checked={false} disabled />;
    case 'dropdown':
      return <Typography display="inline">{index}. </Typography>
  }
}

const ChoiceItem = ({ choiceType, uniqueKey, index, showDelete, callOnDelete, callOnChange }) => {
  const onDeleteClicked = () => {
    callOnDelete(uniqueKey);
  }

  const onInputChanged = (e) => {
    callOnChange(uniqueKey, e.target.value);
  }

  return (
    <Grid container justify="space-between">
      <Grid item>
        {renderChoiceIcon(choiceType, index)}
        <Input name={`option ${index}`} defaultValue={`option ${index}`} inputProps={{ 'aria-label': 'option' }}
          onChange={onInputChanged} autoFocus />
      </Grid>
      <Grid item>
      {showDelete &&
        <IconButton color="grey" onClick={onDeleteClicked}><Clear /></IconButton>}
      </Grid>
    </Grid>
  )
}

const ChoiceEdit = ({ choiceType }) => {
  const [uniqueKey, setUniqueKey] = useState(1);
  const [formData, setFormData] = useState({ [uniqueKey]: "option 1" });

  const onAddOptionClicked = (e) => {
    const newFormData = Object.assign({}, formData, { 
      [uniqueKey + 1]: `option ${Object.keys(formData).length + 1}` } );
    setUniqueKey(prevState => prevState + 1);
    setFormData(newFormData);
  }

  const onItemInputChanged = (key, value) => {
    const newFormData = Object.assign({}, formData, { [key]: value } );
    setFormData(newFormData);
  }

  const onItemDelete = (key) => {
    const newFormData = Object.assign({}, formData);
    delete newFormData[key];
    setFormData(newFormData);
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Grid container>
      {Object.keys(formData).map((key, index) => (
        <ChoiceItem 
          choiceType={choiceType}
          key={key} 
          uniqueKey={key} 
          index={index+1} 
          showDelete={Object.keys(formData).length > 1} 
          callOnDelete={onItemDelete}
          callOnChange={onItemInputChanged}
        />
      ))}
      <Grid item xs={12}>
        {renderChoiceIcon(choiceType, Object.keys(formData).length + 1)}
        <Input placeholder="Add option" onClick={onAddOptionClicked} inputProps={{ 'aria-label': 'add option' }} />
      </Grid>
    </Grid>
  )
}

const renderBlock = (blockType) => {
  switch(blockType) {
    case 'multipleChoice':
      return <ChoiceEdit choiceType='multipleChoice' />;
    case 'checkboxes':
      return <ChoiceEdit choiceType='checkboxes' />;
    case 'dropdown':
      return <ChoiceEdit choiceType='dropdown' />;
    default:
      return <div>Something's wrong...</div>;
  }
};

export default function FormEditBlock(props) {
  const classes = useStyles();
  const [blockType, setBlockType] = useState("multipleChoice");
  // const [formData, setFormData] = useState();

  const handleSelectChange = (e) => {
    setBlockType(e.target.value);
  }

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
// }

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="space-between">
            <OutlinedInput placeholder="Question"></OutlinedInput>
            <Select
              value={blockType}
              onChange={handleSelectChange}
            >
              {blockTypes.map((type => (
                <MenuItem key={type.value} value={type.value}>{type.text}</MenuItem>
              )))}
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Input placeholder="description" fullWidth inputProps={{ 'aria-label': 'description' }} />
        </Grid>
        {renderBlock(blockType)}
      </Grid>
    </Paper>
  );
}