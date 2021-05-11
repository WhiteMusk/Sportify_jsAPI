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
    padding: "2.5em 2em",
    marginTop: "1em"
  },
  element: {
    marginBottom: "1em",
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

const ChoiceItem = ({ choiceType, inputValue, uniqueKey, index, showDelete, callOnDelete, callOnChange }) => {
  const onDeleteClicked = () => {
    callOnDelete(uniqueKey);
  }

  const onInputChanged = (e) => {
    callOnChange(uniqueKey, e.target.value);
  }

  return (
    <Grid container justify="space-between" style={{ marginBottom: "0.5em" }}>
      <Grid item>
        {renderChoiceIcon(choiceType, index)}
        <Input name={`option ${index}`} defaultValue={inputValue} inputProps={{ 'aria-label': 'option' }}
          onChange={onInputChanged} />
      </Grid>
      <Grid item>
      {showDelete &&
        <IconButton color="grey" onClick={onDeleteClicked}><Clear /></IconButton>}
      </Grid>
    </Grid>
  )
}

const ChoiceEdit = ({ choiceType, options }) => {
  const [uniqueKey, setUniqueKey] = useState(options ? options.length : 1);
  const [formData, setFormData] = useState(options ? (
    options.reduce((obj, option) => {
    obj[Object.keys(obj).length] = option;
    return obj;
  }, {})) : 
    { [uniqueKey]: "option 1" }
  );

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
          inputValue={formData[key]}
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

const renderBlock = (blockType, options) => {
  switch(blockType) {
    case 'multipleChoice':
      return <ChoiceEdit choiceType='multipleChoice' options={options} />;
    case 'checkboxes':
      return <ChoiceEdit choiceType='checkboxes' options={options}/>;
    case 'dropdown':
      return <ChoiceEdit choiceType='dropdown' options={options}/>;
    case 'shortAnswer':
      return <Input placeholder="Answer" disabled />;
    default:
      return <div>Something's wrong...</div>;
  }
};

export default function FormEditBlock({ block }) {
  const classes = useStyles();
  const [blockType, setBlockType] = useState(block.blockType);
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
        <Grid item xs={12} className={classes.element}>
          <Grid container justify="space-between">
            <OutlinedInput placeholder="Question" style={{ flexGrow: 1 }}
              defaultValue={block.question}></OutlinedInput>
            <Select
              variant="outlined"
              value={blockType}
              onChange={handleSelectChange}
              style={{ marginLeft: "2em" }}
            >
              {blockTypes.map((type => (
                <MenuItem key={type.value} value={type.value}>{type.text}</MenuItem>
              )))}
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.element}>
          <Input placeholder="description" fullWidth inputProps={{ 'aria-label': 'description' }} 
            defaultValue={block.description}/>
        </Grid>
        {renderBlock(blockType, block.options)}
      </Grid>
    </Paper>
  );
}