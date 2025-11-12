import * as React from "react";
import { OutlinedInput, InputLabel, SelectChangeEvent, FormControl, Select, MenuItem, ListItemText, Checkbox } from "@mui/material";

interface MultiSelectCheckboxProps {
  label?: string;
  options: any;
  value: any;
  onChange: (value: any) => void;
  width?: number | string;
  size?: any;
  disabled?: boolean;
  inputLabel?: string;
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

const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({
  label = "Select Options",
  options,
  value,
  onChange,
  width = 300,
  size = 'medium',
  disabled = false,
  inputLabel = '',
}) => {
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value: selected },
    } = event;
    onChange(typeof selected === "string" ? selected.split(",") : selected);
  };

  return (
    <>
    { inputLabel && <InputLabel sx={{fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333'}}>{inputLabel}</InputLabel> }
    <FormControl size={size} sx={{ width }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox size="small" checked={value.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </>
  );
};

export default MultiSelectCheckbox;
