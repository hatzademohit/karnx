"use client"
import { CustomDateTimePicker, SwapComp } from "@/components";
import { Box, Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useStep } from '@/app/context/StepProvider';
const RoundTripFlights = () =>{

    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const { airportCity, formData, setFormData } = useStep();
      // Sync local state with context state, use context as the single source of truth
      
      const departureTime = formData?.flightDetails?.departure_time[0]
        ? dayjs(formData.flightDetails.departure_time[0])
        : dayjs();

      const arrivalTime = formData.flightDetails?.departure_time[1]
        ? dayjs(formData.flightDetails.departure_time[1])
        : dayjs();
    
      // Defensive mapping for options
      const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map(airport => ({
        label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
        id: airport.id,
        code: airport.code,
      }));

    return(
       <Box sx={{border: '1px solid #E5E7EB', boxShadow: '0px 10px 15px -3px #0000001A', padding: '20px', borderRadius: '10px'}}>
            <Grid container spacing={2}>
                <Grid item lg={8} md={8}>
                    <SwapComp
                        options={airportOptions}
                        defaultFrom={formData?.flightDetails?.departure_location}
                        defaultTo={formData.flightDetails?.arrival_location}
                        onChange={(fromCode: string, toCode: string) => {
                        setFormData({
                            ...formData,
                            flightDetails: {
                            ...formData.flightDetails,
                            departure_location: [
                                ...(formData.flightDetails?.departure_location || []),
                                fromCode
                            ],
                            arrival_location: [
                                ...(formData.flightDetails?.arrival_location || []),
                                toCode
                            ],
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
                                departure_time: newValue ? dayjs(newValue).toISOString() : null,
                            }
                            });
                        }}
                        withClock
                    />
                </Grid>
                <Grid item lg={8} md={8}>
                    <SwapComp
                        options={airportOptions}
                        defaultFrom={formData.flightDetails?.departure_location}
                        defaultTo={formData.flightDetails?.arrival_location}
                        onChange={(fromCode: string, toCode: string) => {
                        setFormData({
                            ...formData,
                            flightDetails: {
                            ...formData.flightDetails,
                            departure_location: [fromCode],
                            arrival_location: [toCode],
                            }
                        });
                        }}
                    />
                </Grid>
                <Grid item lg={4} md={4}>
                    <CustomDateTimePicker
                        datatimelabel="Return Date & Time"
                        value={arrivalTime}
                        onChange={(newValue) => {
                            setFormData({
                            ...formData,
                            flightDetails: {
                                ...formData.flightDetails,
                                departure_time: newValue ? dayjs(newValue).toISOString() : null,
                            }
                            });
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default RoundTripFlights;