"use client";
import { CustomDateTimePicker, SwapComp } from "@/components";
import { Box, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useStep } from "@/app/context/StepProvider";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const OneWayFlights = () => {
  const { airportCity, formData, setFormData, stepsError } = useStep();

  // ✅ React Hook Form Setup
  const { control, trigger, setValue, formState: { errors } } = useForm({
    defaultValues: {
      departure_location: formData.flightDetails?.departure_location?.[0] || "",
      arrival_location: formData.flightDetails?.arrival_location?.[0] || "",
      departure_time: formData.flightDetails?.departure_time?.[0] || "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    console.log(formData, "formData");
  }, [formData]);

  // Defensive mapping for options
  const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map((airport) => ({
    label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
    id: airport.id,
    code: airport.code,
  }));

  // Update formData when form values change
  const updateFormData = (field: string, value: any) => {
    setFormData({
      ...formData,
      flightDetails: {
        ...formData.flightDetails,
        [field]: [value],
      },
    });
  };

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
        {/* SwapComp for Departure & Arrival */}
        <Grid size={{ lg: 8, md: 8, sm: 12, xs: 12 }}>
          <Controller
            name="departure_location"
            control={control}
            rules={{ required: "Departure location is required" }}
            render={({ field }) => (
              <SwapComp
                options={airportOptions}
                defaultFrom={field.value}
                defaultTo={formData.flightDetails?.arrival_location?.[0] || ""}
                onChange={(fromCode, toCode) => {
                  field.onChange(fromCode);
                  updateFormData("departure_location", fromCode);
                  setValue("arrival_location", toCode);
                  updateFormData("arrival_location", toCode);
                }}
                fromError={!!errors.departure_location}
                fromHelpertext={errors.departure_location?.message}
                toError={!!errors.arrival_location}
                toHelpertext={errors.arrival_location?.message}
              />
            )}
          />
        </Grid>

        {/* DateTime Picker */}
        <Grid size={{ lg: 4, md: 4, sm: 12, xs: 12 }}>
          <Controller
            name="departure_time"
            control={control}
            rules={{ required: "Departure time is required" }}
            render={({ field }) => (
              <CustomDateTimePicker
                datatimelabel="Departure Date & Time"
                required
                value={field.value ? dayjs(field.value) : null}
                error={!!errors.departure_time}
                helperText={errors.departure_time?.message}
                onChange={(newValue) => {
                  const val = newValue ? dayjs(newValue).toISOString() : "";
                  field.onChange(val);
                  updateFormData("departure_time", val);
                }}
                withClock
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OneWayFlights;
