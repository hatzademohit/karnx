import React, { useEffect, useState } from "react";
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

// Map API icon identifiers to actual components
const IconMap: Record<string, React.ReactElement> = {
  WifiOutlinedIcon: <WifiOutlinedIcon />,
  FlatwareOutlinedIcon: <FlatwareOutlinedIcon />,
  LocalHotelOutlinedIcon: <LocalHotelOutlinedIcon />,
  TvOutlinedIcon: <TvOutlinedIcon />,
  LocalPhoneOutlinedIcon: <LocalPhoneOutlinedIcon />,
  StarBorderPurple500OutlinedIcon: <StarBorderPurple500OutlinedIcon />,
  GroupOutlinedIcon: <GroupOutlinedIcon />,
  FreeBreakfastOutlinedIcon: <FreeBreakfastOutlinedIcon />,
};
import { CustomTextField } from "@/components";
import useApiFunction from "@/karnx/Hooks/useApiFunction";
import { apiBaseUrl } from "@/karnx/api";
import { toast } from "react-toastify";


const AmenitiesDetails = (editedData) => {
  const { control, watch, setValue } = useFormContext();
  const selected = watch("amenities") || [];
  const theme = useTheme();
  const callApi = useApiFunction();
  const [amentiesList, setAmentiesListList] = useState<any>([]);

  const toggleAmenity = (a: string) => {
    const updated = selected.includes(a)
      ? selected.filter((x: string) => x !== a)
      : [...selected, a];
    setValue("amenities", updated);
  };

  const getAvailableAmenties = async () => {
    try {
      const res = await callApi({ method: 'GET', url: `${apiBaseUrl}/form-fields-data/available-amenities` });
      if (res?.status === true) {
        setAmentiesListList(res.data);
      } else {
        toast.error(res?.message || '');
      }
    } catch (e) {

    }
  };

  useEffect(() => {
    getAvailableAmenties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Typography variant="h4" color={theme?.common.redColor} mb={2}>
        Amenities & Final Details
      </Typography>
      <Typography variant="h5" mb={2}>
        Available Amenities
      </Typography>
      <Grid container spacing={{ md: 2.5, xs: 1 }}>
        {amentiesList.length && amentiesList.map((amenitieItem) => (
          <Grid size={{ lg: 3, md: 6, sm: 6, xs: 12 }} key={amenitieItem.id}>
            <Card
              onClick={() => toggleAmenity(amenitieItem.id)}
              sx={{ cursor: "pointer", border: selected.includes(amenitieItem.id) ? `1px solid #BC0019` : "1px solid #eeeeee", borderRadius: 3 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', p: '16px !important' }}>
                <Box sx={{ '& svg': { fontSize: '40px', color: theme?.common.blueColor } }}>
                  {IconMap[amenitieItem?.icon] ?? null}
                </Box>
                <Typography align="center" sx={{ color: '#4D4D4D' }}>{amenitieItem?.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid size={{ lg: 6, xs: 12 }}>
          <Controller
            name="specialOffers"
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} inputLabel="Special Offers or Promotions" size='medium' />
            )}
          />
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
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
