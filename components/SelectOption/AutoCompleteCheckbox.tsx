import React, { FC, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  Autocomplete,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export interface AutoCompleteOption {
  id: string | number;
  title: string; // shown in the input and list
  [key: string]: any;
}

interface AutoCompleteCheckboxProps {
  options: AutoCompleteOption[];
  value: AutoCompleteOption[]; // controlled selected values
  onChange: (value: AutoCompleteOption[]) => void; // returns selected full option objects
  width?: number | string;
  size?: "small" | "medium";
  disabled?: boolean;
  inputLabel?: string;
  placeholder?: string;
  label?: string; // TextField label
  limitTags?: number;
}

const AutoCompleteCheckbox: React.FC<AutoCompleteCheckboxProps> = ({
  inputLabel = "Select Options",
  options = [],
  value,
  onChange,
  width = '100%',
  size = 'small',
  disabled,
  placeholder = 'Select...',
  label = 'Select',
  limitTags = 2,
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // support both controlled and uncontrolled usage
  const [internalValue, setInternalValue] = useState<AutoCompleteOption[]>(value ?? []);
  const selected = value ?? internalValue;

  useEffect(() => {
    if (value) setInternalValue(value);
  }, [value]);

  const handleChange = (_: any, newValue: AutoCompleteOption[]) => {
    // Log selected ids to console
    if (onChange) onChange(newValue);
    else setInternalValue(newValue);
  };

  return (
    <>
      {inputLabel && (
        <InputLabel sx={{ fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333' }}>
          {inputLabel}
        </InputLabel>
      )}
      <FormControl fullWidth sx={{ width, '& .MuiInputBase-sizeSmall': { paddingBlock: '3.3px !important' } }}>
        <Autocomplete
          multiple
          disabled={disabled}
          size={size}
          options={options}
          value={selected}
          limitTags={limitTags}
          onChange={handleChange}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          isOptionEqualToValue={(opt, val) => opt.id === val.id}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <MenuItem key={option.id} value={option.id} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  sx={{ marginRight: '8px' }}
                  checked={selected}
                />
                {option.title}
              </MenuItem>
            );
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder={placeholder} />
          )}
        />
      </FormControl>
    </>
  );
};

export default AutoCompleteCheckbox;
