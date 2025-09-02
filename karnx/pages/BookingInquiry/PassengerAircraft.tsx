'use client'
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { PassengerInformation, PreferredServices, CrewRequirements } from '@/karnx/pages/BookingInquiry'

const PassengerAircraft = () =>{

    const [passengers, setPassengers] = useState({
        Adults: 1,
        Children: 0,
        Infants: 0,
  });

  const handleChange = (type: keyof typeof passengers, action: "inc" | "dec") => {
    setPassengers((prev) => ({
      ...prev,
      [type]:
        action === "inc"
          ? prev[type] + 1
          : prev[type] > 0
          ? prev[type] - 1
          : 0, // prevent negative
    }));
  };

    return(
        <Box sx={{ border: '1px solid #E6E6E6', borderBottom: 0, padding: '24px'}}>
            <Grid container spacing={2}>
              <PassengerInformation />
              <PreferredServices />
			  <CrewRequirements />
            </Grid>
        </Box>
    )
}

export default PassengerAircraft;