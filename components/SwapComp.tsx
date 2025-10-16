"use client";
import { Box, IconButton } from "@mui/material";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import { SimpleAutoComplete } from "@/components";
import { useAuth } from "@/app/context/AuthContext";

type SwapCompProps = {
  fromLabel?: string;
  fromPlaceholder?: string;
  toLabel?: string;
  toPlaceholder?: string;
  options?: string[];
  fromValue: string;
  toValue: string;
  onFromChange: (val: string) => void;
  onToChange: (val: string) => void;
  onSwap?: (from: string, to: string) => void;
  fromError?: boolean;
  fromHelpertext?: string;
  toError?: boolean;
  toHelpertext?: string;
};

const SwapComp: React.FC<SwapCompProps> = ({
  fromLabel = "From",
  fromPlaceholder = "Departure airport",
  toLabel = "To",
  toPlaceholder = "Destination airport",
  options = [],
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  onSwap,
  fromError,
  fromHelpertext,
  toError,
  toHelpertext
}) => {

  const {theme} = useAuth();
  
  const handleSwap = () => {
    onFromChange(toValue);
    onToChange(fromValue);
    onSwap?.(toValue, fromValue);
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
          value={fromValue}
          onChange={(_: any, val: any) => onFromChange(val ?? "")}
          error={fromError}
          helperText={fromHelpertext}
        />
      </Box>

      {/* Swap Button */}
      <Box
        sx={{
          position: "absolute",
          width: "40px",
          height: "40px",
          margin: "auto",
          top: "28px",
          left: 0,
          right: 0
        }}
      >
        <IconButton
          onClick={handleSwap}
          sx={{
            border: "1px solid #e6e6e6",
            color: theme?.common?.blueColor,
            backgroundColor: "#ffffff",
            zIndex: 9,
            "&:hover": { backgroundColor: theme?.common?.blueColor, color: "#ffffff" },
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
          value={toValue}
          onChange={(_: any, val: any) => onToChange(val ?? "")}
          error={toError}
          helperText={toHelpertext}
        />
      </Box>
    </Box>
  );
};

export default SwapComp;
