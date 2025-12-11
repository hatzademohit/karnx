"use client"
import { CustomDateTimePicker, SwapComp } from "@/components";
import { Box, Grid } from "@mui/material";
import { useStep } from '@/app/context/StepProvider';
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

const OneWayFlights = ({ control, errors, setValue, watch }: any) => {
  const { airportCity } = useStep();

  // Defensive mapping for options
  const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map(airport => ({
    label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
    id: airport.id,
    code: airport.code,
  }));

  return (
    <Grid container spacing={2}>
      <Grid size={{ lg: 8, md: 8, sm: 12, xs: 12 }}>
        <Controller
          name="oneWayfrom"
          control={control}
          render={({ field }) => (
            <Controller
              name="oneWayto"
              control={control}
              render={({ field: tofiled }) => {
                const oneWayfrom = watch('oneWayfrom');
                const oneWayto = watch('oneWayto');
                return (
                  <SwapComp
                    fromOptions={airportOptions.filter((airport) => airport.id != oneWayto)}
                    toOptions={airportOptions.filter((airport) => airport.id != oneWayfrom)}
                    fromValue={airportOptions.find((airport) => airport.id == oneWayfrom) || null}
                    toValue={airportOptions.find((airport) => airport.id == oneWayto) || null}
                    onFromChange={(val: any) => {
                      setValue("oneWayfrom", val?.id, { shouldValidate: true, shouldDirty: true });
                    }}
                    onToChange={(val: any) => {
                      setValue("oneWayto", val?.id, { shouldValidate: true, shouldDirty: true });
                    }}
                    onSwap={(from: any, to: any) => {
                      setValue("oneWayfrom", from?.id, { shouldValidate: true, shouldDirty: true });
                      setValue("oneWayto", to?.id, { shouldValidate: true, shouldDirty: true });
                    }}
                    fromError={!!errors.oneWayfrom}
                    fromHelpertext={errors.oneWayfrom?.message}
                    toError={!!errors.oneWayto}
                    toHelpertext={errors.oneWayto?.message}
                  />
                )
              }}
            />
          )}
        />
      </Grid>

      <Grid size={{ lg: 4, md: 4, sm: 12, xs: 12 }}>
        <Controller
          name="oneWaydepartureDate"
          control={control}
          render={({ field }) => (
            <CustomDateTimePicker
              {...field}
              value={field.value ? dayjs(field.value) : null}
              datatimelabel="Departure Date & Time"
              withClock
              error={!!errors.oneWaydepartureDate}
              helperText={errors.oneWaydepartureDate?.message}
              minDateTime={dayjs().add(1, 'day').startOf('day')}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default OneWayFlights;