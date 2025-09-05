"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, FormControl, InputLabel, Typography } from "@mui/material";

export interface SimpleAutoCompleteProps {
  variant?: any;
  label?: string;
  children?: any;
  name?: string;
  size?: any;
  value?: any;
  placeholder?: string;
  onChange?: any;
  style?: any;
  options?: any[];
  disableClearable?: boolean;
  arrowTooltipText?: string;
  inputLabel?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

const SimpleAutoComplete: React.FC<SimpleAutoCompleteProps> = ({
  variant,
  label,
  size,
  value,
  onChange,
  style,
  options = [],
  disableClearable,
  arrowTooltipText = "Open/Close dropdown",
  inputLabel,
  placeholder = `Select ${inputLabel}`,
  required = false,
  name,
  error,
  helperText
}) => {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Box sx={{ width: "100%" }}>
      {inputLabel && (
        <InputLabel
          sx={{
            fontFamily: "poppins-semibold",
            width: "fit-content",
            color: "#333333",
          }}
        >
          {inputLabel} { required === true ? <Typography component='span' sx={{color: '#BC0019'}}>*</Typography> : ''}
        </InputLabel>
      )}
      <FormControl fullWidth>
        <Autocomplete
          value={value}
          onChange={onChange}
          inputValue={value?.code ? value?.code : inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={options}
          size={size}
          sx={style}
          disableClearable={disableClearable}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option?.label ?? ""
          }
          isOptionEqualToValue={(option, val) =>
            typeof option === "string" || typeof val === "string"
              ? option === val
              : option.code === val.code
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant={variant}
              placeholder={placeholder}
              required={required}
              name={name}
              error={error}
              helperText={helperText}
            />
          )}
          slotProps={{
            popupIndicator: {
              title: arrowTooltipText,
            },
          }}
        />
      </FormControl>
    </Box>
  );
};

export default SimpleAutoComplete;
