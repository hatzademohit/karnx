"use client"
import { CustomDateTimePicker, SwapComp } from "@/components";
import { Box, Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useStep } from '@/app/context/StepProvider';
import { useEffect } from "react";

const OneWayFlights = () => {
  const { airportCity, formData, setFormData } = useStep();

  useEffect(() =>{
    console.log(formData, 'formData')
  }, [formData])

  const departureTime = Array.isArray(formData?.flightDetails?.departure_time) && formData.flightDetails.departure_time[0]
    ? dayjs(formData.flightDetails.departure_time[0])
    : dayjs();

  // Defensive mapping for options
  const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map(airport => ({
    label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
    id: airport.id,
    code: airport.code,
  }));

  // Ensure defaultFrom and defaultTo are arrays, passing the 0th element or undefined
  const defaultFrom = Array.isArray(formData.flightDetails?.departure_location)
    ? formData.flightDetails.departure_location[0]
    : formData.flightDetails?.departure_location;

  const defaultTo = Array.isArray(formData.flightDetails?.arrival_location)
    ? formData.flightDetails.arrival_location[0]
    : formData.flightDetails?.arrival_location;

  return (
    <Box sx={{ border: '1px solid #E5E7EB', boxShadow: '0px 10px 15px -3px #0000001A', padding: '20px', borderRadius: '10px' }}>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8}>
          <SwapComp
            options={airportOptions}
            defaultFrom={defaultFrom}
            defaultTo={defaultTo}
            onChange={(fromCode: string, toCode: string) => {
              setFormData({
                ...formData,
                flightDetails: {
                  ...formData.flightDetails, // keep existing details if any
                  departure_location:[fromCode],
                  arrival_location: [toCode],
                }
              });
            }}
          />
        </Grid>
        <Grid item lg={4} md={4}>
          <CustomDateTimePicker
            datatimelabel="Departure Date & Time"
            value={departureTime}
            onChange={(newValue) => {
              setFormData({
                ...formData,
                flightDetails: {
                  ...formData.flightDetails,
                  departure_time: newValue ? [dayjs(newValue).toISOString()] : [],
                }
              });
            }}
            withClock
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OneWayFlights;