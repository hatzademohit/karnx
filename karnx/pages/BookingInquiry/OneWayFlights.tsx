"use client"
import { CustomDateTimePicker, SwapComp } from "@/components";
import { Box, Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useStep } from '@/app/context/StepProvider';

const OneWayFlights = () => {
  const { airportCity, formData, setFormData } = useStep();

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

  const setAtIndex = (arr: any[], index: number, value: any) => {
    const copy = [...arr];
    copy[index] = value;
    return copy;
  };
  const handleSwapChange = (rowIndex: number, fromCode: string, toCode: string) => {
    setFormData({
      ...formData,
      flightDetails: {
        ...formData.flightDetails,
        departure_location: setAtIndex(formData.flightDetails?.departure_location || [], rowIndex, fromCode),
        arrival_location: setAtIndex(formData.flightDetails?.arrival_location || [], rowIndex, toCode),
      }
    });
  };
  return (
    <Box sx={{ border: '1px solid #E5E7EB', boxShadow: '0px 10px 15px -3px #0000001A', padding: '20px', borderRadius: '10px' }}>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8}>
          <SwapComp
            options={airportOptions}
            defaultFrom={formData.flightDetails?.departure_location?.[0] || ""}
            defaultTo={formData.flightDetails?.arrival_location?.[0] || ""}
            onChange={(fromCode, toCode) => handleSwapChange(0, fromCode, toCode)}
          />
        </Grid>
        <Grid item lg={4} md={4}>
          <CustomDateTimePicker
            datatimelabel="Departure Date & Time"
            value={
              formData.flightDetails?.departure_time?.[0]
                ? dayjs(formData.flightDetails.departure_time[0])
                : null
            }
            onChange={(newValue) => {
              setFormData({
                ...formData,
                flightDetails: {
                  ...formData.flightDetails,
                  departure_time: setAtIndex(
                    formData.flightDetails?.departure_time || [],
                    0,
                    newValue ? dayjs(newValue).toISOString() : null
                  )
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