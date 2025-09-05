"use client"
import { CustomDateTimePicker, SwapComp } from "@/components";
import { Box, Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useStep } from '@/app/context/StepProvider';
const RoundTripFlights = () => {

    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const { airportCity, formData, setFormData, stepsError } = useStep();

    // Defensive mapping for options
    const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map(airport => ({
        label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
        id: airport.id,
        code: airport.code,
    }));
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
              <Grid size={{ lg: 8, md: 8, sm: 12, xs: 12 }}>
                    <SwapComp
                        options={airportOptions}
                        defaultFrom={formData.flightDetails?.departure_location?.[0] || ""}
                        defaultTo={formData.flightDetails?.arrival_location?.[0] || ""}
                        onChange={(fromCode, toCode) => handleSwapChange(0, fromCode, toCode)}
                        fromError={stepsError.departure_location && true}
                        fromHelpertext={stepsError.departure_location}
                        toError={stepsError.arrival_location && true}
                        toHelpertext={stepsError.arrival_location}
                    />
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 12, xs: 12 }}>
                    <CustomDateTimePicker
                        datatimelabel="Departure Date & Time"
                        required={true}
                        value={
                            formData.flightDetails?.departure_time?.[0]
                                ? dayjs(formData.flightDetails.departure_time[0])
                                : null
                        }
                        error={stepsError?.departure_time && true}
                        helperText={stepsError?.departure_time}
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
                <Grid size={{ lg: 8, md: 8, sm: 12, xs: 12 }}>
                    <SwapComp
                        options={airportOptions}
                        defaultFrom={formData.flightDetails?.departure_location?.[1] || ""}
                        defaultTo={formData.flightDetails?.arrival_location?.[1] || ""}
                        onChange={(fromCode, toCode) => handleSwapChange(1, fromCode, toCode)}
                        fromError={stepsError.departure_location && true}
                        fromHelpertext={stepsError.departure_location}
                        toError={stepsError.arrival_location && true}
                        toHelpertext={stepsError.arrival_location}
                    />
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 12, xs: 12 }}>
                    <CustomDateTimePicker
                        datatimelabel="Return Date & Time"
                        required={true}
                        error={stepsError?.departure_time && true}
                        helperText={stepsError?.departure_time}
                        value={
                            formData.flightDetails?.departure_time?.[1]
                                ? dayjs(formData.flightDetails.departure_time[1])
                                : null
                        }
                        onChange={(newValue) => {
                            setFormData({
                                ...formData,
                                flightDetails: {
                                    ...formData.flightDetails,
                                    departure_time: setAtIndex(
                                        formData.flightDetails?.departure_time || [],
                                        1,
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
    )
}

export default RoundTripFlights;