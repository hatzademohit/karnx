"use client"
import { CustomDateTimePicker, SwapComp } from "@/components";
import { Box, Grid } from "@mui/material";
import { useStep } from '@/app/context/StepProvider';
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

const RoundTripFlights = ({ control, setValue, errors, watch }: any) => {
    const { airportCity } = useStep();

    // Defensive mapping for options
    const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map(airport => ({
        label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
        id: airport.id,
        code: airport.code,
    }));

    return (
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
                            render={({ field: tofield }) => {
                                const roundTripfrom = watch('roundTripfrom');
                                const roundTripto = watch('roundTripto');
                                return (
                                    <SwapComp
                                        fromOptions={airportOptions.filter((airport) => airport.id != roundTripto)}
                                        toOptions={airportOptions.filter((airport) => airport.id != roundTripfrom)}
                                        fromValue={airportOptions.find((airport) => airport.id == roundTripfrom) || ''}
                                        toValue={airportOptions.find((airport) => airport.id == roundTripto) || ''}
                                        onFromChange={(val: any) => {
                                            setValue("roundTripfrom", val?.id, { shouldValidate: true, shouldDirty: true });
                                            setValue("roundTriptoReturn", val?.id, { shouldValidate: true, shouldDirty: true });
                                        }}
                                        onToChange={(val: any) => {
                                            setValue("roundTripto", val?.id, { shouldValidate: true, shouldDirty: true });
                                            setValue("roundTripfromReturn", val?.id, { shouldValidate: true, shouldDirty: true })
                                        }}
                                        onSwap={(from: any, to: any) => {
                                            setValue("roundTripfrom", from?.id, { shouldValidate: true, shouldDirty: true });
                                            setValue("roundTripto", to?.id, { shouldValidate: true, shouldDirty: true });
                                        }}
                                        fromError={!!errors.roundTripfrom}
                                        fromHelpertext={errors.roundTripfrom?.message}
                                        toError={!!errors.roundTripto}
                                        toHelpertext={errors.roundTripto?.message}
                                    />
                                )
                            }}
                        />
                    )}
                />
            </Grid>

            {/* Departure Date */}
            <Grid size={{ lg: 2, md: 4, sm: 12, xs: 12 }}>
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
                            minDateTime={dayjs().add(1, 'day').startOf('day')}
                        />
                    )}
                />
            </Grid>

            {/* Return Date */}
            <Grid size={{ lg: 2, md: 4, sm: 12, xs: 12 }}>
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
                            minDateTime={dayjs().add(1, 'day').startOf('day')}
                        />
                    )}
                />
            </Grid>

            <Grid size={{ lg: 8, md: 8, sm: 12, xs: 12 }} sx={{ display: 'none' }}>
                <Controller
                    name="roundTripfromReturn"
                    control={control}
                    render={({ field: roundTripfromReturn }) => (
                        <Controller
                            name="roundTriptoReturn"
                            control={control}
                            render={({ field: roundTriptoReturn }) => {
                                const roundTripfrom = watch('roundTripfrom');
                                const roundTripto = watch('roundTripto');
                                return (
                                    <SwapComp
                                        fromLabel='Return From'
                                        fromOptions={airportOptions.filter((airport) => airport.id != roundTriptoReturn.value)}
                                        toOptions={airportOptions.filter((airport) => airport.id != roundTripfromReturn.value)}
                                        fromValue={airportOptions.find((airport) => airport.id == roundTripto) || ''}
                                        toValue={airportOptions.find((airport) => airport.id == roundTripfrom) || ''}
                                        onFromChange={(val: any) => {
                                            setValue("roundTripfromReturn", val?.id, { shouldValidate: true, shouldDirty: true });
                                        }}
                                        onToChange={(val: any) =>
                                            setValue("roundTriptoReturn", val?.id, { shouldValidate: true, shouldDirty: true })
                                        }
                                        onSwap={(from: any, to: any) => {
                                            setValue("roundTripfromReturn", from?.id, { shouldValidate: true, shouldDirty: true });
                                            setValue("roundTriptoReturn", to?.id, { shouldValidate: true, shouldDirty: true });
                                        }}
                                        fromError={!!errors.roundTripfromReturn}
                                        fromHelpertext={errors.roundTripfromReturn?.message}
                                        toError={!!errors.roundTriptoReturn}
                                        toHelpertext={errors.roundTriptoReturn?.message}
                                        disabled={true}
                                    />
                                )
                            }}
                        />
                    )}
                />
            </Grid>
        </Grid>
    )
}

export default RoundTripFlights;