import * as React from "react";
import { OutlinedInput, InputLabel, SelectChangeEvent, FormControl, Select, MenuItem, ListItemText, Radio, Box, Typography } from "@mui/material";

interface SingleSelectRadioProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  width?: number | string;
  variant?: "outlined" | "filled" | "standard";
  inputLabel?: string;
  size?: "small" | "medium";
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SingleSelectRadio: React.FC<SingleSelectRadioProps> = ({
  label,
  options,
  value,
  onChange,
  width,
  variant = 'outlined',
  inputLabel,
  size
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{width: '100%'}}>
      { inputLabel && <InputLabel sx={{fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333'}}>{inputLabel}</InputLabel> }
      <FormControl variant={variant} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value ?? ""}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
        displayEmpty
        renderValue={(selected) => {
          if (selected === "") {
            return <Typography sx={{color: '#cccccc', fontSize: 'inherit'}}>{`Select ${inputLabel}`}</Typography>;
          }
          return selected;
        }}
      >
        <MenuItem disabled>{`Select ${inputLabel}`}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Radio checked={value === option} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Box>
  );
};

export default SingleSelectRadio;