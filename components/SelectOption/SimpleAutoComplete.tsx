import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, FormControl, InputLabel } from '@mui/material';

export interface SimpleAutoCompleteProps{
    variant?: any;
    label?: string;
    children?: any;
    name?: string;
    size?: any;
    value?: any;
    placeholder?: string;
    onChange?:any
    style?: any;
    options?: any;
    disableClearable?: boolean;
    arrowTooltipText?: string;
    inputLabel?: string;
}

// const options = ['Option 1', 'Option 2'];

const SimpleAutoComplete:React.FC<SimpleAutoCompleteProps> = ({
    variant,
    label, 
    size,
    value,
    placeholder,
    onChange,
    style,
    options,
    disableClearable,
    arrowTooltipText = "Open/Close dropdown",
    inputLabel
}) => {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Box sx={{width: '100%'}}>
      { inputLabel && <InputLabel sx={{fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333'}}>{inputLabel}</InputLabel> }
      <FormControl fullWidth>
        <Autocomplete
          value={value}
          onChange={onChange}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          size={size}
          sx={style}
          disableClearable={disableClearable}
          renderInput={(params) => <TextField {...params} label={label} variant={variant} placeholder={placeholder} />}
          slotProps={{
            popupIndicator: {
              title: arrowTooltipText, // <-- Your custom tooltip text here
            },
          }}
        />
      </FormControl>
    </Box>
  );
}

export default SimpleAutoComplete;