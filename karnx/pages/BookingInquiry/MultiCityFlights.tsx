"use client";
import { Box } from "@mui/material";
import { AppendDeleteTable } from "@/karnx/pages/BookingInquiry";

interface MultiCityFlightsProps {
  control: any;
  setValue: any;
  errors: any;
  watch?: any;
}

const MultiCityFlights = ({ control, setValue, errors, watch }: MultiCityFlightsProps) => {
  return (
    <Box
      sx={{
        border: "1px solid #E5E7EB",
        boxShadow: "0px 10px 15px -3px #0000001A",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <AppendDeleteTable control={control} setValue={setValue} errors={errors} watch={watch} />
    </Box>
  );
};

export default MultiCityFlights;
