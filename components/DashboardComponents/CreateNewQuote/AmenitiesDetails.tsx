import React from "react";
import { Box, Grid, Card, CardContent, Typography, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const amenitiesList = [
  "High-Speed Wi-Fi",
  "Gourmet Catering",
  "Private Bedroom",
  "Entertainment System",
  "Satellite Phone",
  "Onboard Shower",
  "Conference Area",
  "Premium Bar Service",
];

const AmenitiesDetails = () => {
  const { control, watch, setValue } = useFormContext();
  const selected = watch("amenities") || [];

  const toggleAmenity = (a: string) => {
    const updated = selected.includes(a)
      ? selected.filter((x: string) => x !== a)
      : [...selected, a];
    setValue("amenities", updated);
  };

  return (
    <Box>
      <Typography variant="h6" color="error" mb={2}>
        Amenities & Final Details
      </Typography>
      <Grid container spacing={2}>
        {amenitiesList.map((a) => (
          <Grid size={{ lg: 6, md: 6, sm: 12}} key={a}>
            <Card
              onClick={() => toggleAmenity(a)}
              sx={{
                border: selected.includes(a)
                  ? "2px solid #0d47a1"
                  : "1px solid #eee",
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Typography align="center">{a}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={3}>
        <Controller
          name="specialOffers"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Special Offers or Promotions" />
          )}
        />

        <Box mt={2}>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Additional Notes" />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AmenitiesDetails;
