import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText, MenuItem, Typography } from '@mui/material';

export interface SelectProps {
    variant?: any;
    label?: string;
    children?: any;
    name?: string;
    size?: any;
    value?: any;
    helperText?: string;
    onChange?: any
    style?: any;
    required?: boolean;
    error?: boolean;
    inputLabel?: string;
    disabled?: boolean;
    className?: string;
}

const SingleSelect: React.FC<SelectProps> = ({
    variant = 'outlined',
    label,
    children,
    name,
    size,
    value,
    helperText,
    onChange,
    style,
    required,
    error,
    inputLabel,
    disabled = false,
    className,
}) => {

    return (
        <>

            {inputLabel && <InputLabel sx={{ fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333' }}>{inputLabel}</InputLabel>}
            <FormControl fullWidth size={size} variant={variant} className={className}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    displayEmpty
                    label={label}
                    name={name}
                    onChange={onChange}
                    sx={style}
                    error={error}
                    disabled={disabled}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 250,
                            },
                        },
                    }}
                    renderValue={(selected) => {
                        if (!selected) {
                            return <Typography sx={{ fontSize: '12px' }}>{`Select ${inputLabel}`}</Typography>;
                        }
                        return selected;
                    }}
                >
                    <MenuItem value="" disabled> {`Select ${inputLabel}`}</MenuItem>
                    {children}
                </Select>
                <FormHelperText sx={{ color: '#d32f2f', margin: '2px' }}> {helperText} </FormHelperText>
            </FormControl>
        </>
    );
}

export default SingleSelect;