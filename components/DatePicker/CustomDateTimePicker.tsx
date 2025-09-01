'use client'
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Dayjs } from "dayjs";
import { InputLabel, styled } from "@mui/material";

interface CustomDateTimePickerProps {
  label?: string;
  datatimelabel?: string;
  value?: Dayjs | null;
  onChange?: (newValue: Dayjs | null) => void;
  withClock?: boolean; // toggle clock view
  minDateTime?: Dayjs;
  maxDateTime?: Dayjs;
  disabled?: boolean;
}

// ✅ Styled wrapper that enforces highlight on selected values
const ClockWrapper = styled("div")(() => ({
  "& .MuiClockNumber-root.Mui-selected": {
    backgroundColor: "#BC0019 !important",
    color: "#fff !important",
  },
  "& .MuiClockPointer-root": {
    backgroundColor: "#BC0019", // line color
  },
  "& .MuiClockPointer-thumb": {
    borderColor: "#BC0019",     // outline
    backgroundColor: "#BC0019", // pointer dot
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
}: CustomDateTimePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {datatimelabel && (
        <InputLabel sx={{ fontFamily: "poppins-semibold", width: "fit-content", color: "#333333" }}>
          {datatimelabel}
        </InputLabel>
      )}
      <DateTimePicker
        label={label}
        value={value}
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
          textField: { size: "medium", fullWidth: true, variant: "outlined" },
		  layout: {
			sx: {
				"& .MuiClockNumber-root": {
					fontFamily: 'poppins',
				},
				"& .MuiClockNumber-root.Mui-selected": {
					backgroundColor: "#BC0019",
					color: "#fff",
				},
					"& .MuiClockPointer-root": {
					backgroundColor: "#BC0019", 
					fontFamily: 'poppins',
				},
				"& .MuiClockPointer-thumb": {
					borderColor: "#BC0019",
					backgroundColor: "#BC0019",
					fontFamily: 'poppins',
				},
				"& .MuiClock-pin": {
					backgroundColor: "#BC0019",
				},
			},
		},
        }}
      />
    </LocalizationProvider>
  );
}
