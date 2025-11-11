import * as React from "react";
import { OutlinedInput, InputLabel, SelectChangeEvent, FormControl, Select, MenuItem, ListItemText, Checkbox } from "@mui/material";

interface MultiSelectCheckboxProps {
  label?: string;
  options: any;
  value: any;
  onChange: (value: any) => void;
  width?: number | string;
  size?: any;
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
  size = 'medium'
}) => {
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value: selected },
    } = event;
    onChange(typeof selected === "string" ? selected.split(",") : selected);
  };

  return (
    <FormControl size={size} sx={{ m: 1, width }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox size="small" checked={value.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectCheckbox;
