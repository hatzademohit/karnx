"use client";
import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import { CustomTextField } from "@/components";

type SwapCompProps = {
  fromLabel?: string;
  fromPlaceholder?: string;
  toLabel?: string;
  toPlaceholder?: string;
  defaultFrom?: string;
  defaultTo?: string;
  onChange?: (from: string, to: string) => void; // callback to parent
};

const SwapComp: React.FC<SwapCompProps> = ({
  fromLabel = "From",
  fromPlaceholder = "Departure airport",
  toLabel = "To",
  toPlaceholder = "Destination airport",
  defaultFrom = "",
  defaultTo = "",
  onChange,
}) => {
  const [fromVal, setFromVal] = useState(defaultFrom);
  const [toVal, setToVal] = useState(defaultTo);

  const handleSwap = () => {
    setFromVal(toVal);
    setToVal(fromVal);
    onChange?.(toVal, fromVal); // notify parent with swapped values
  };

  const handleFromChange = (val: string) => {
    setFromVal(val);
    onChange?.(val, toVal);
  };

  const handleToChange = (val: string) => {
    setToVal(val);
    onChange?.(fromVal, val);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "16px",
        position: "relative",
        "& .MuiInputBase-input": { paddingLeft: "24px" },
      }}
    >
      {/* From Field */}
      <Box sx={{ width: "100%" }}>
        <CustomTextField
          inputLabel={fromLabel}
          placeholder={fromPlaceholder}
          size="medium"
          value={fromVal}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFromChange(e.target.value)
          }
        />
      </Box>

      {/* Swap Button */}
      <Box
        sx={{
          position: "absolute",
          width: "40px",
          height: "40px",
          inset: 0,
          margin: "auto",
          top: "18px",
        }}
      >
        <IconButton
          onClick={handleSwap}
          sx={{
            border: "1px solid #e6e6e6",
            color: "#03045E",
            backgroundColor: "#ffffff",
            zIndex: 9,
            "&:hover": { backgroundColor: "#03045E", color: "#ffffff" },
          }}
        >
          <SwapHorizRoundedIcon />
        </IconButton>
      </Box>

      {/* To Field */}
      <Box sx={{ width: "100%" }}>
        <CustomTextField
          inputLabel={toLabel}
          placeholder={toPlaceholder}
          size="medium"
          value={toVal}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleToChange(e.target.value)
          }
        />
      </Box>
    </Box>
  );
};

export default SwapComp;
