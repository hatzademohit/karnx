"use client";
import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import { SimpleAutoComplete } from "@/components";

type SwapCompProps = {
  fromLabel?: string;
  fromPlaceholder?: string;
  toLabel?: string;
  toPlaceholder?: string;
  defaultFrom?: string;
  defaultTo?: string;
  options?: string[];
  onChange?: (from: string, to: string) => void; 
};

const SwapComp: React.FC<SwapCompProps> = ({
  fromLabel = "From",
  fromPlaceholder = "Departure airport",
  toLabel = "To",
  toPlaceholder = "Destination airport",
  defaultFrom = "",
  defaultTo = "",
  options = [],
  onChange,
}) => {
  const [fromVal, setFromVal] = useState<string>(defaultFrom);
  const [toVal, setToVal] = useState<string>(defaultTo);

  const handleSwap = () => {
    setFromVal(toVal);
    setToVal(fromVal);
    onChange?.(toVal, fromVal);
  };

  const handleFromChange = (_: React.SyntheticEvent, val: any | null) => {
    const newVal:any = val?.code ?? "";
    setFromVal(newVal);
    onChange?.(newVal, toVal);
  };

  const handleToChange = (_: React.SyntheticEvent, val: any | null) => {
    const newVal = val?.code ?? "";
    setToVal(newVal);
    onChange?.(fromVal, newVal);
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
        <SimpleAutoComplete
          inputLabel={fromLabel}
          placeholder={fromPlaceholder}
          options={options}
          size="medium"
          value={fromVal}
          onChange={handleFromChange}
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
        <SimpleAutoComplete
          inputLabel={toLabel}
          placeholder={toPlaceholder}
          options={options}
          size="medium"
          value={toVal}
          onChange={handleToChange}
        />
      </Box>
    </Box>
  );
};

export default SwapComp;
