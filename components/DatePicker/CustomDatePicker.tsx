'use client'
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { InputLabel, Typography, useTheme } from "@mui/material";

interface CustomDatePickerProps {
    label?: string;
    datelabel?: string;
    value?: Dayjs | null;
    onChange?: (newValue: any | null) => void;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    disabled?: boolean;
    name?: string;
    required?: boolean;
    asterisk?: boolean;
    error?: boolean;
    helperText?: string;
}

export default function CustomDatePicker({
    label,
    datelabel = "Select Date",
    value,
    onChange,
    minDate,
    maxDate,
    disabled = false,
    name,
    required = false,
    asterisk = false,
    error = false,
    helperText,
}: CustomDatePickerProps) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {datelabel && (
                <InputLabel
                    sx={{
                        fontFamily: "poppins-semibold",
                        width: "fit-content",
                        color: "#333333",
                        mb: 0.5,
                    }}
                >
                    {datelabel}{" "}
                    {(required || asterisk) && (
                        <Typography
                            component="span"
                            sx={{ color: theme?.common?.redColor }}
                        >
                            *
                        </Typography>
                    )}
                </InputLabel>
            )}

            <DatePicker
                label={label}
                value={
                    value && typeof value === "object" && "isValid" in value ? value : null
                }
                onChange={(newValue) =>{
                    const timeOnly = newValue ? dayjs(newValue) : "";
                    onChange(timeOnly);
                }}
                disabled={disabled}
                minDate={minDate}
                maxDate={maxDate}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                format="DD/MM/YYYY"
                slotProps={{
                    textField: {
                        name,
                        size: "medium",
                        fullWidth: true,
                        variant: "outlined",
                        error: error,
                        helperText: helperText,
                        onClick: () => setOpen(true),
                        inputProps: {
                            style: { fontFamily: "poppins" },
                        },
                    },
                }}
                sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                        borderColor: theme?.common?.redColor,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: theme?.common?.redColor,
                    },
                }}
            />
        </LocalizationProvider>
    );
}
