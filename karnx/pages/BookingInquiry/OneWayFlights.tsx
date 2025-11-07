"use client"
import { CustomDateTimePicker, SwapComp } from "@/components";
import { Box, Grid } from "@mui/material";
import { useStep } from '@/app/context/StepProvider';
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

const OneWayFlights = ({ control, errors, setValue }: any) => {
  const { airportCity } = useStep();

  // Defensive mapping for options
  const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map(airport => ({
    label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
    id: airport.id,
    code: airport.code,
  }));

  return (
    <Box sx={{ border: "1px solid #E5E7EB", padding: "20px", borderRadius: "10px" }}>
      <Grid container spacing={2}>
        <Grid size={{ lg: 8, md: 8, sm: 12, xs: 12 }}>
          <Controller
            name="oneWayfrom"
            control={control}
            render={({ field }) => (
              <Controller
                name="oneWayto"
                control={control}
                render={({ field: toField }) => (
                  <SwapComp
                    options={airportOptions}
                    fromValue={airportOptions.find((airport) => airport.id == field.value) || null }
                    toValue={airportOptions.find((airport) => airport.id == toField.value) || null }
                    // fromValue={airportOptions.find((airport) => airport.id == field.value)?.code || ''}
                    // toValue={airportOptions.find((airport) => airport.id == toField.value)?.code || ''}
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
                )}
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
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OneWayFlights;