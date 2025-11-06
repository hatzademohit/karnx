import React from "react";
import { Box, Grid, Card, CardContent, Typography, useTheme } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import FlatwareOutlinedIcon from '@mui/icons-material/FlatwareOutlined';
import LocalHotelOutlinedIcon from '@mui/icons-material/LocalHotelOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import { CustomTextField } from "@/components";

const amenitiesList = [
  { id: 1, item: "High-Speed Wi-Fi", icon: <WifiOutlinedIcon /> },
  { id: 2, item: "Gourmet Catering", icon: <FlatwareOutlinedIcon /> },
  { id: 3, item: "Private Bedroom", icon: <LocalHotelOutlinedIcon /> },
  { id: 4, item: "Entertainment System", icon: <TvOutlinedIcon /> },
  { id: 5, item: "Satellite Phone", icon: <LocalPhoneOutlinedIcon /> },
  { id: 6, item: "Onboard Shower", icon: <StarBorderPurple500OutlinedIcon /> },
  { id: 7, item: "Conference Area", icon: <GroupOutlinedIcon /> },
  { id: 8, item: "Premium Bar Service", icon: <FreeBreakfastOutlinedIcon /> },
];

const AmenitiesDetails = () => {
  const { control, watch, setValue } = useFormContext();
  const selected = watch("amenities") || [];
  const theme = useTheme();
  
  const toggleAmenity = (a: string) => {
    const updated = selected.includes(a)
      ? selected.filter((x: string) => x !== a)
      : [...selected, a];
    setValue("amenities", updated);
  };

  return (
    <Box>
      <Typography variant="h4" color={theme?.common.redColor} mb={2}>
        Amenities & Final Details
      </Typography>
      <Typography variant="h5" mb={2}>
        Available Amenities
      </Typography>
      <Grid container spacing={{ md: 2.5, xs: 1 }}>
        {amenitiesList.map((amenitieItem) => (
          <Grid size={{ lg: 3, md: 6, sm: 6, xs: 12}} key={amenitieItem.id}>
            <Card
              onClick={() => toggleAmenity(amenitieItem.item)}
              sx={{ cursor: "pointer", border: selected.includes(amenitieItem.item) ? `1px solid #BC0019` : "1px solid #eeeeee", borderRadius: 3 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', p: '16px !important' }}>
                <Box sx={{ '& svg': { fontSize: '40px', color: theme?.common.blueColor } }}>{amenitieItem?.icon}</Box>
                <Typography align="center" sx={{ color: '#4D4D4D' }}>{amenitieItem?.item}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid size={{ lg: 6, xs:12 }}>
          <Controller
            name="specialOffers"
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} inputLabel="Special Offers or Promotions" size='medium' />
            )}
          />
        </Grid>
        <Grid size={{ lg: 6, xs:12 }}>
          <Controller
            name="addtionalNotes"
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} inputLabel="Additional Notes" size='medium' />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AmenitiesDetails;
