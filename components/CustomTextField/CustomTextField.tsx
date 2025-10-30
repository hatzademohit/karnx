import React, { forwardRef } from 'react';
import { TextField, FormControl, InputLabel, Box, Typography } from '@mui/material';
import { useAuth } from '@/app/context/AuthContext';

export interface CustomTextFieldProps {
  name?: string;
  type?: string;
  value?: string | string[] | any;
  asterisk?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  // onFocus: (event: React.FocusEvent<HTMLInputElement, Element>)=>void,
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: any;
  maxlength?: any;
  size?: any;
  variant?: any;
  InputLabelProps?: any;
  sx?:{};
  InputProps?: any;
  id?: string;
  inputLabel?: any;
  multiline?: number
}

const CustomTextField = forwardRef<HTMLInputElement, CustomTextFieldProps>(
 ({ name,
  type,
  value,
  asterisk,
  onFocus,
  onChange,
  onBlur,
  error,
  helperText,
  disabled,
  label,
  required,
  placeholder,
  className,
  maxlength,
  size = 'small',
  variant = 'outlined',
  InputLabelProps,
  InputProps,
  id,
  inputLabel,
  multiline,
  ...props
}, ref) => {
  const {theme} = useAuth()
  const displayLabel = asterisk ? `${label} *` : label;
  return (
      <Box sx={{width: '100%'}}>
        { inputLabel && <InputLabel sx={{fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333'}}>{inputLabel} { required === true ? <Typography component='span' sx={{color: theme?.common?.redColor}}>*</Typography> : ''}</InputLabel> }
        <TextField
          fullWidth
          inputRef={ref}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          error={error}
          helperText={helperText}
          disabled={disabled}
          variant={variant}
          {...props}
          label={displayLabel}
          required={required}
          placeholder={ placeholder ? placeholder : `Enter ${inputLabel}`}
          className={className}
          inputProps={{ maxLength: maxlength }}
          size={size}        
          InputLabelProps={{ shrink: InputLabelProps }}
          InputProps={InputProps}
          autoComplete='off'
          id={id}
          // multiline={multiline}
        />
      </Box>
  );
}
)
export { CustomTextField };
