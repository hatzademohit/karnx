import { useEffect } from "react";
import * as React from "react";
import { OutlinedInput, InputLabel, SelectChangeEvent, FormControl, Select, MenuItem, ListItemText, Checkbox } from "@mui/material";
import { useResponsive } from "@/karnx/Hooks/useResponsive";

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
  const { isMd } = useResponsive();
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value: selected },
    } = event;
    onChange(typeof selected === "string" ? selected.split(",") : selected);
  };

  return (
    <>
      {inputLabel && <InputLabel sx={{ fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333' }}>{inputLabel}</InputLabel>}
      <FormControl size={isMd ? "small" : size} sx={{ width }}>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple
          value={Array.isArray(value) ? value : []}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => {
            const ids = Array.isArray(selected) ? selected : [];
            const labels = ids.map(id => { const opt = (Array.isArray(options) ? options : []).find(o => String(o?.id) === String(id)); return opt ? String(opt.city_name) : String(id); }); return labels.join(', ');
          }}
          MenuProps={MenuProps}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem key={option?.id} value={option?.id} id={option?.id}>
              <Checkbox checked={(Array.isArray(value) ? value : []).map(String).includes(String(option?.id))} />
              <ListItemText primary={option?.city_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MultiSelectCheckbox;
