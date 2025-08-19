import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

export interface SelectProps {
    variant?: any;
    label?: string;
    children?: any;
    name?: string;
    size?: any;
    value?: any;
    helperText?: string;
    onChange?:any
    style?: any;
    required?: boolean;
    error?: boolean;
}

const SingleSelect: React.FC<SelectProps> = ({
    variant,
    label, 
    children,
    name,
    size,
    value,
    helperText,
    onChange,
    style,
    required,
    error
}) => {

  return (
        <FormControl required={required} variant={variant ? variant : 'filled'} fullWidth size={size} 
            sx={{
                ...(size === 'small' ? { height: '49px' } : ''),
                ...(helperText?.length >= 0 ? {height: '60px'} : '')
            }}
        >
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Age"
                name={name}
                onChange={onChange}
                displayEmpty
                sx={ style }
                error={error}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 250,
                        },
                    },
                }}
            >
                {children}
            </Select>
            <FormHelperText> { helperText } </FormHelperText>
        </FormControl>
  );
}

export default SingleSelect;