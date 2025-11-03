'use client'
import * as React from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { InputLabel, Typography, styled, useTheme } from "@mui/material";

interface CustomTimePickerProps {
    timelabel?: string;
    asterisk?: boolean;
    error?: boolean;
    helperText?: string;
    value?: any
    onChange?: any;
    ampm?: boolean;
}

export default function CustomTimePicker({
    timelabel = "Select Time",
    asterisk = false,
    error = false,
    helperText,
    value,
    onChange,
    ampm = false,
}: CustomTimePickerProps) {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {timelabel && (
                <InputLabel sx={{ fontFamily: "poppins-semibold", width: "fit-content", color: "#333333" }}>
                    {timelabel} {asterisk && <Typography component='span' sx={{ color: theme?.common?.redColor }}>*</Typography>}
                </InputLabel>
            )}
            <DemoContainer components={['TimePicker']}>
                <TimePicker
                    value={value}
                    onChange={onChange}
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                    }}
                    ampm={ampm}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    slotProps={{
                        textField: {
                            size: "medium", fullWidth: true, variant: "outlined",
                            error: error, helperText: helperText,
                            onClick: () => setOpen(true)
                        },
                        layout: {
                            sx: {
                                "& .MuiClockNumber-root": {
                                    fontFamily: 'poppins',
                                },
                                "& .MuiClockNumber-root.Mui-selected": {
                                    backgroundColor: theme?.common?.redColor,
                                    color: "#fff",
                                },
                                "& .MuiClockPointer-root": {
                                    backgroundColor: theme?.common?.redColor,
                                    fontFamily: 'poppins',
                                },
                                "& .MuiClockPointer-thumb": {
                                    borderColor: theme?.common?.redColor,
                                    backgroundColor: theme?.common?.redColor,
                                    fontFamily: 'poppins',
                                },
                                "& .MuiClock-pin": {
                                    backgroundColor: theme?.common?.redColor,
                                },
                            },
                        },
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
