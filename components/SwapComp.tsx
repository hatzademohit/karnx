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
  fromOptions?: string[];
  toOptions?: string[];
  fromValue: string;
  toValue: string;
  onFromChange: (val: string) => void;
  onToChange: (val: string) => void;
  onSwap?: (from: string, to: string) => void;
  fromError?: boolean;
  fromHelpertext?: string;
  toError?: boolean;
  toHelpertext?: string;
  disabled?: boolean;
  formDisabled?: boolean;
  swapButtonDisabled?: boolean;
};

const SwapComp: React.FC<SwapCompProps> = ({
  fromLabel = "Start From",
  fromPlaceholder = "Departure airport",
  toLabel = "To",
  toPlaceholder = "Destination airport",
  options = [],
  fromOptions = [],
  toOptions = [],
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  onSwap,
  fromError,
  fromHelpertext,
  toError,
  toHelpertext,
  disabled = false,
  formDisabled = false,
  swapButtonDisabled = false
}) => {

  const { theme } = useAuth();

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
      <Box sx={{ width: "100%" }} className='from-flied'>
        <SimpleAutoComplete
          inputLabel={fromLabel}
          placeholder={fromPlaceholder}
          options={fromOptions || options}
          size="medium"
          value={fromValue}
          onChange={(_: any, val: any) => onFromChange(val ?? "")}
          error={fromError}
          helperText={fromHelpertext}
          disabled={disabled || formDisabled}
        />
      </Box>

      {/* Swap Button */}
      {!swapButtonDisabled &&
        <Box
          className="btn-swap"
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
            disabled={disabled}
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
      }
      {/* To Field */}
      <Box sx={{ width: "100%" }}>
        <SimpleAutoComplete
          inputLabel={toLabel}
          placeholder={toPlaceholder}
          options={toOptions || options}
          size="medium"
          value={toValue}
          onChange={(_: any, val: any) => onToChange(val ?? "")}
          error={toError}
          helperText={toHelpertext}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

export default SwapComp;
