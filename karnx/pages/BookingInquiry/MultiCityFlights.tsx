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
    <AppendDeleteTable control={control} setValue={setValue} errors={errors} watch={watch} />
  );
};

export default MultiCityFlights;
