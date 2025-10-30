import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const fields = [
  { name: "baseFare", label: "Base Fare" },
  { name: "fuel", label: "Fuel" },
  { name: "taxes", label: "Taxes & Fees" },
  { name: "crewFees", label: "Crew Fees" },
  { name: "handlingFees", label: "Handling Fees" },
  { name: "catering", label: "Catering" },
];

const PricingDetails = () => {
  const { control } = useFormContext();

  return (
    <Box>
      <Typography variant="h6" color="error" mb={2}>
        Pricing Details
      </Typography>
      <Grid container spacing={2}>
        {fields.map((f) => (
          <Grid size={{ lg: 6, md: 6, sm: 12}} key={f.name}>
            <Controller
              name={f.name}
              control={control}
              rules={{ required: `${f.label} is required` }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={f.label}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PricingDetails;
