import * as React from "react";
import { OutlinedInput, InputLabel, SelectChangeEvent, FormControl, Select, MenuItem, ListItemText, Radio } from "@mui/material";

interface SingleSelectRadioProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  width?: number | string;
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
  width = 300,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
        renderValue={(selected) => selected}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Radio checked={value === option} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SingleSelectRadio;