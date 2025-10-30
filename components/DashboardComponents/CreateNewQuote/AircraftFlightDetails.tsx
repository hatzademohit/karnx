import React from "react";
import { Box, Typography, Card, CardContent, Grid, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const aircrafts = [
  { name: "Gulfstream G650", range: "7,000 nm", seats: 14 },
  { name: "Bombardier Global 7500", range: "7,700 nm", seats: 19 },
  { name: "Cessna Citation X+", range: "3,460 nm", seats: 12 },
  { name: "Embraer Phenom 300E", range: "2,010 nm", seats: 6 },
];

const AircraftFlightDetails = () => {
  const { control, setValue, watch } = useFormContext();
  const selectedAircraft = watch("aircraft");

  return (
    <Box>
      <Typography variant="h6" color="error" mb={2}>
        Choose Aircraft from Your Fleet *
      </Typography>
      <Grid container spacing={2}>
        {aircrafts.map((aircraft) => (
          <Grid size={{ lg: 6, md: 6, sm: 12}} key={aircraft.name}>
            <Card
              onClick={() => setValue("aircraft", aircraft.name)}
              sx={{
                cursor: "pointer",
                border:
                  selectedAircraft === aircraft.name
                    ? "2px solid #0d47a1"
                    : "1px solid #eee",
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700}>
                  {aircraft.name}
                </Typography>
                <Typography variant="body2">Range: {aircraft.range}</Typography>
                <Typography variant="body2">Seats: {aircraft.seats}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={3}>
        <Controller
          name="estimatedFlightTime"
          control={control}
          rules={{ required: "Estimated flight time is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Estimated Flight Time (HH:MM)"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default AircraftFlightDetails;
