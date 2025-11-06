"use client"
import { CustomDateTimePicker, SwapComp } from "@/components";
import { Box, Grid } from "@mui/material";
import { useStep } from '@/app/context/StepProvider';
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

const RoundTripFlights = ({ control, setValue, errors }: any) => {

    const { airportCity } = useStep();

    // Defensive mapping for options
    const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map(airport => ({
        label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
        id: airport.id,
        code: airport.code,
    }));

    return (
        <Box
            sx={{
                border: "1px solid #E5E7EB",
                boxShadow: "0px 10px 15px -3px #0000001A",
                padding: "20px",
                borderRadius: "10px",
            }}
        >
            <Grid container spacing={2}>
                {/* From / To Fields with Swap */}
                <Grid size={{ lg: 8, md: 8, sm: 12, xs: 12 }}>
                    <Controller
                        name="roundTripfrom"
                        control={control}
                        render={({ field }) => (
                            <Controller
                                name="roundTripto"
                                control={control}
                                render={({ field: toField }) => (
                                    <SwapComp
                                        options={airportOptions}
                                        fromValue={airportOptions.find((airport) => airport.id === field.value)?.code || ''}
                                        toValue={airportOptions.find((airport) => airport.id === toField.value)?.code || ''}
                                        onFromChange={(val: any) => {
                                            setValue("roundTripfrom", val?.id, { shouldValidate: true, shouldDirty: true });
                                        }}
                                        onToChange={(val: any) =>
                                            setValue("roundTripto", val?.id, { shouldValidate: true, shouldDirty: true })
                                        }
                                        onSwap={(from, to) => {
                                            setValue("roundTripfrom", from);
                                            setValue("roundTripto", to);
                                        }}
                                        fromError={!!errors.roundTripfrom}
                                        fromHelpertext={errors.roundTripfrom?.message}
                                        toError={!!errors.roundTripto}
                                        toHelpertext={errors.roundTripto?.message}
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                {/* Departure Date */}
                <Grid size={{ lg: 4, md: 4, sm: 12, xs: 12 }}>
                    <Controller
                        name="roundTripdepartureDate"
                        control={control}
                        render={({ field }) => (
                            <CustomDateTimePicker
                                {...field}
                                value={field.value ? dayjs(field.value) : null}
                                datatimelabel="Departure Date & Time"
                                withClock
                                error={!!errors.roundTripdepartureDate}
                                helperText={errors.roundTripdepartureDate?.message}
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ lg: 8, md: 8, sm: 12, xs: 12 }}>
                    <Controller
                        name="roundTripfromReturn"
                        control={control}
                        render={({ field }) => (
                            <Controller
                                name="roundTriptoReturn"
                                control={control}
                                render={({ field: toField }) => (
                                    <SwapComp
                                        options={airportOptions}
                                        fromValue={airportOptions.find((airport) => airport.id === field.value)?.code || ''}
                                        toValue={airportOptions.find((airport) => airport.id === toField.value)?.code || ''}
                                        onFromChange={(val: any) => {
                                            setValue("roundTripfromReturn", val?.id, { shouldValidate: true, shouldDirty: true });
                                        }}
                                        onToChange={(val: any) =>
                                            setValue("roundTriptoReturn", val?.id, { shouldValidate: true, shouldDirty: true })
                                        }
                                        onSwap={(from, to) => {
                                            setValue("roundTripfromReturn", from);
                                            setValue("roundTriptoReturn", to);
                                        }}
                                        fromError={!!errors.roundTripfromReturn}
                                        fromHelpertext={errors.roundTripfromReturn?.message}
                                        toError={!!errors.roundTriptoReturn}
                                        toHelpertext={errors.roundTriptoReturn?.message}
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                {/* Return Date */}
                <Grid size={{ lg: 4, md: 4, sm: 12, xs: 12 }}>
                    <Controller
                        name="roundTripreturnDate"
                        control={control}
                        render={({ field }) => (
                            <CustomDateTimePicker
                                {...field}
                                datatimelabel="Return Date & Time"
                                value={field.value ? dayjs(field.value) : null}
                                withClock
                                error={!!errors.roundTripreturnDate}
                                helperText={errors.roundTripreturnDate?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default RoundTripFlights;