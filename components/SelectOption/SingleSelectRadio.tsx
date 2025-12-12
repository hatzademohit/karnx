import * as React from "react";
import { OutlinedInput, InputLabel, SelectChangeEvent, FormControl, Select, MenuItem, ListItemText, Radio, Box, Typography, FormHelperText } from "@mui/material";
import { useResponsive } from "@/karnx/Hooks/useResponsive";

interface OptionItem {
  value: string | number;
  label: string;
}

interface SingleSelectRadioProps {
  label?: string;
  options: OptionItem[] | string[];
  value: string | number;
  onChange: (value: string | number) => void;
  width?: number | string;
  variant?: "outlined" | "filled" | "standard";
  inputLabel?: string;
  size?: "small" | "medium";
  error?: boolean;
  helperText?: string;
  asterisk?: boolean;
  className?: string;
  id?: string;
  menuClassName?: string;
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
  size,
  error = false,
  helperText,
  asterisk = false,
  className,
  id,
  menuClassName
}) => {
  const { isMd } = useResponsive();
  const normalizedOptions: OptionItem[] = Array.isArray(options)
    ? (typeof options[0] === 'string'
      ? (options as string[]).map((s) => ({ value: s, label: s }))
      : (options as OptionItem[]))
    : [];

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ width: '100%' }} className={className}>
      {inputLabel && <InputLabel sx={{ fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333', mb: '4px' }}>{inputLabel}</InputLabel>}
      <FormControl variant={variant} fullWidth>
        <InputLabel shrink={false}>{label}</InputLabel>
        <Select
          id={id}
          value={(value ?? "") as any}
          onChange={handleChange}
          input={<OutlinedInput label={label} error={error} size={isMd ? "small" : size} />}
          MenuProps={{
            PaperProps: {
              id: id,
              className: menuClassName,
            },
          }}
          displayEmpty
          renderValue={(selected) => {
            if (selected === "" || selected === undefined || selected === null) {
              return <Typography sx={{ color: '#cccccc', fontSize: 'inherit' }}>{`Select ${inputLabel}`}</Typography>;
            }
            const found = normalizedOptions.find(o => o.value === selected);
            return found ? found.label : String(selected);
          }}
        >
          <MenuItem disabled>{`Select ${inputLabel}`}</MenuItem>
          {normalizedOptions.map((option) => (
            <MenuItem key={String(option.value)} value={option.value as any}>
              <Radio checked={value === option.value} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText error>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default SingleSelectRadio;