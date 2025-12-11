import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { CustomDateTimePicker, CustomTimePicker } from "@/components"
import dayjs from "dayjs";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";

type EstimateFlightTimeProps = {
    control: any;
}

const EstimateFlightTime: React.FC<EstimateFlightTimeProps> = ({ control }) => {

    const { bookingDetails } = useInquiryDetails();
    const { setValue } = useFormContext();
    const formatName = (value) => {
        if (!value) return "";
        return value.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <>
            <Grid size={{ xs: 12 }}>
                <Card sx={{ mt: 2, mb: 1 }}>
                    <CardContent sx={{ p: '16px !important' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Typography variant="h5">
                                    Trip Type:
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {formatName(bookingDetails?.trip_type)}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            {bookingDetails?.flight_time?.length > 0 && bookingDetails?.flight_time.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }} sx={{ display: 'none' }}>
                            <Controller
                                name={`estimate.${index}.flight_details_id`}
                                control={control}
                                rules={{ required: "Departure Date & Time is required" }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        value={field.value ?? null}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                            <Controller
                                name={`estimate.${index}.departureArrivalDateTime`}
                                control={control}
                                rules={{ required: "Departure Date & Time is required" }}
                                render={({ field, fieldState }) => (
                                    <CustomDateTimePicker
                                        {...field}
                                        value={field.value ? dayjs(field.value) : null}
                                        datatimelabel="Departure Date & Time"
                                        subText={`(${item?.departure_city} → ${item?.arrival_city})`}
                                        withClock
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        minDateTime={dayjs().add(1, 'day').startOf('day')}
                                        disabled={bookingDetails?.is_flexible_dates === 0}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                            <Controller
                                name={`estimate.${index}.estimatedFlightTime`}
                                control={control}
                                rules={{ required: "Estimated flight time is required" }}
                                render={({ field, fieldState }) => (
                                    <CustomTimePicker
                                        {...field}
                                        value={field.value ? dayjs(field.value) : null}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        timelabel="Estimate Flight Time"
                                        asterisk
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Grid>
                    </React.Fragment>
                )
            })}
        </>
    )
}

export default EstimateFlightTime;