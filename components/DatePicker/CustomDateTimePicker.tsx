'use client'
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Dayjs } from "dayjs";
import { InputLabel, styled, Typography, useTheme } from "@mui/material";

interface CustomDateTimePickerProps {
  label?: string;
  datatimelabel?: string;
  value?: Dayjs | null;
  onChange?: (newValue: Dayjs | null) => void;
  withClock?: boolean; // toggle clock view
  minDateTime?: Dayjs;
  maxDateTime?: Dayjs;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

// ✅ Styled wrapper that enforces highlight on selected values
const ClockWrapper = styled("div")(({ theme }) => ({
  "& .MuiClockNumber-root.Mui-selected": {
    backgroundColor: "#BC0019 !important",
    color: "#fff !important",
  },
  "& .MuiClockPointer-root": {
    backgroundColor: theme?.common?.redColor, // line color
  },
  "& .MuiClockPointer-thumb": {
    borderColor: theme?.common?.redColor,     // outline
    backgroundColor: theme?.common?.redColor, // pointer dot
  },
}));

export default function CustomDateTimePicker({
  label,
  datatimelabel = "Select Date & Time",
  value,
  onChange,
  withClock = true,
  minDateTime,
  maxDateTime,
  disabled = false,
  name, 
  required = false,
  error = false,
  helperText
}: CustomDateTimePickerProps) {

const theme = useTheme()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {datatimelabel && (
        <InputLabel sx={{ fontFamily: "poppins-semibold", width: "fit-content", color: "#333333" }}>
          {datatimelabel} { required === true ? <Typography component='span' sx={{color: theme?.common?.redColor}}>*</Typography> : ''}
        </InputLabel>
      )}
      <DateTimePicker
        label={label}
        // value={value}
        onChange={onChange}
        disabled={disabled}
        minDateTime={minDateTime}
        maxDateTime={maxDateTime}
        viewRenderers={
          withClock
            ? {
                hours: (params) => (
                  <ClockWrapper>{renderTimeViewClock(params)}</ClockWrapper>
                ),
                minutes: (params) => (
                  <ClockWrapper>{renderTimeViewClock(params)}</ClockWrapper>
                ),
                seconds: (params) => (
                  <ClockWrapper>{renderTimeViewClock(params)}</ClockWrapper>
                ),
              }
            : {
                hours: null,
                minutes: null,
                seconds: null,
              }
        }
        slotProps={{
          textField: { 
            size: "medium", fullWidth: true, variant: "outlined",
            error: error,  helperText: helperText,
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
    </LocalizationProvider>
  );
}
