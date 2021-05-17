import { Paper, Typography, Grid, FilledInput, OutlinedInput, Select, MenuItem, Input, Radio, IconButton, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { useState, useEffect, useContext } from 'react';
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
  // {
  //   value: 'date',
  //   text: 'Date',
  // },
  // {
  //   value: 'time',
  //   text: 'Time',
  // },
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
          onChange={onInputChanged} autoFocus/>
      </Grid>
      <Grid item>
      {showDelete &&
        <IconButton color="default" onClick={onDeleteClicked}><Clear /></IconButton>}
      </Grid>
    </Grid>
  )
}

const ChoiceEdit = ({ choiceType, context, blockIndex }) => {
  const [formData, setFormData] = useContext(context);
  const options = formData.blocks[blockIndex].options;
  const [uniqueKey, setUniqueKey] = useState(options && options.length > 0 ? options.length : 1);
  const [optionData, setOptionData] = useState(options && options.length > 0 ? (
    options.reduce((obj, option) => {
    obj[Object.keys(obj).length] = option;
    return obj;
  }, {})) : 
    { [uniqueKey]: "option 1" }
  );

  const getUniqueKey = () => {
    setUniqueKey(prevState => prevState + 1);
    return uniqueKey + 1;
  }

  const updateFormData = () => {
    const newBlocks = Object.assign([], formData.blocks);
    newBlocks[blockIndex] = { ...newBlocks[blockIndex], options: Object.values(optionData) };
    setFormData({ ...formData, blocks: newBlocks });
  }

  const onAddOptionClicked = (e) => {
    const newOptionData = Object.assign({}, optionData, { 
      [getUniqueKey()]: `option ${Object.keys(optionData).length + 1}` 
    });
    setOptionData(newOptionData);
  }

  const onItemInputChanged = (key, value) => {
    const newOptionData = Object.assign({}, optionData, { [key]: value } );
    setOptionData(newOptionData);
  }

  const onItemDelete = (key) => {
    const newOptionData = Object.assign({}, optionData);
    delete newOptionData[key];
    setOptionData(newOptionData);
  }

  useEffect(() => {
    // console.log(optionData);
    updateFormData();
  }, [optionData]);

  return (
    <Grid container>
      {Object.keys(optionData).map((key, index) => (
        <ChoiceItem 
          choiceType={choiceType}
          inputValue={optionData[key]}
          key={key} 
          uniqueKey={key} 
          index={index+1} 
          showDelete={Object.keys(optionData).length > 1} 
          callOnDelete={onItemDelete}
          callOnChange={onItemInputChanged}
        />
      ))}
      <Grid item xs={12}>
        {renderChoiceIcon(choiceType, Object.keys(optionData).length + 1)}
        <Input placeholder="Add option" onClick={onAddOptionClicked} inputProps={{ 'aria-label': 'add option' }} />
      </Grid>
    </Grid>
  )
}

const renderBlock = (blockType, blockIndex, formContext) => {
  switch(blockType) {
    case 'multipleChoice':
      return <ChoiceEdit choiceType='multipleChoice' context={formContext} blockIndex={blockIndex} />;
    case 'checkboxes':
      return <ChoiceEdit choiceType='checkboxes' context={formContext} blockIndex={blockIndex} />;
    case 'dropdown':
      return <ChoiceEdit choiceType='dropdown' context={formContext} blockIndex={blockIndex} />;
    case 'shortAnswer':
      return <Input placeholder="Answer" disabled />;
    default:
      return <div>Something's wrong...</div>;
  }
};

export default function FormEditBlock({ block, blockIndex, formContext }) {
  const classes = useStyles();
  const [blockType, setBlockType] = useState(block.blockType);
  const [formData, setFormData] = useContext(formContext);

  const handleSelectChange = (e) => {
    const newBlockType = e.target.value;
    setBlockType(newBlockType);
    const newBlocks = Object.assign([], formData.blocks);
    newBlocks[blockIndex] = { ...newBlocks[blockIndex], blockType: newBlockType };
    if (newBlockType === 'shortAnswer') {
      newBlocks[blockIndex].options = [];
    }
    setFormData({ ...formData, blocks: newBlocks });
  }

  const handleInputChange = (e) => {
    const newBlocks = Object.assign([], formData.blocks);
    newBlocks[blockIndex] = { ...newBlocks[blockIndex], [e.target.name]: e.target.value };
    setFormData({ ...formData, blocks: newBlocks });
  }

  return (
    <Paper className={classes.paper} key={block.blockId}>
      <Grid container>
        <Grid item xs={12} className={classes.element}>
          <Grid container justify="space-between">
            <OutlinedInput placeholder="Question" style={{ flexGrow: 1 }}
              defaultValue={block.question}
              name="question"
              onChange={handleInputChange}></OutlinedInput>
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
            defaultValue={block.description}
            name="description"
            onChange={handleInputChange}/>
        </Grid>
        {renderBlock(blockType, blockIndex, formContext)}
      </Grid>
    </Paper>
  );
}