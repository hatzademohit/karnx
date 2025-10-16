import React, { useState } from "react";
import { TextField, Popover, Box, Button } from "@mui/material";
import { DateRange, Range } from "react-date-range";
import { format } from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAuth } from "@/app/context/AuthContext";

interface DateRangePickerInputProps {
  label?: string;
  value?: { startDate: Date | null; endDate: Date | null };
  onChange?: (range: { startDate: Date; endDate: Date }) => void;
  disabled?: boolean;
}

const DateRangePickerInput: React.FC<DateRangePickerInputProps> = ({
  label,
  value,
  onChange,
  disabled = false,
}) => {
  const { theme } = useAuth()
  const [range, setRange] = useState<Range[]>([
    {
      startDate: value?.startDate || new Date(),
      endDate: value?.endDate || new Date(),
      key: "selection",
    },
  ]);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (onChange && range[0].startDate && range[0].endDate) {
      onChange({ startDate: range[0].startDate, endDate: range[0].endDate });
    }
  };

  // Sync internal state if value changes externally
  React.useEffect(() => {
    if (value?.startDate && value?.endDate) {
      setRange([{ startDate: value.startDate, endDate: value.endDate, key: "selection" }]);
    }
  }, [value]);

  const open = Boolean(anchorEl);

  const formattedValue =
    range[0].startDate && range[0].endDate
      ? `${format(range[0].startDate, "dd/MM/yyyy")} - ${format(
          range[0].endDate,
          "dd/MM/yyyy"
        )}`
      : "";

  return (
    <Box className="date-range-picker">
      <TextField
        label={label}
        value={formattedValue}
        onClick={handleOpen}
        fullWidth
        size="small"
        InputProps={{ readOnly: true }}
        disabled={disabled}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box p={2}>
          <DateRange
            ranges={range}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            rangeColors={[theme?.common?.blueColor]}
          />
          <Box textAlign="right">
            <Button sx={{backgroundColor: theme?.common?.blueColor}} variant="contained" size="small" onClick={handleClose}>
              OK
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default DateRangePickerInput;
