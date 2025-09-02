'use client'
import { Box, Grid } from "@mui/material";
import { PassengerInformation, PreferredServices, CrewRequirements, PurposeofTravel, CateringExtraServices, DocumentUploadReview } from '@/karnx/pages/BookingInquiry'

const PassengerAircraft = () =>{

    return(
        <Box sx={{ border: '1px solid #E6E6E6', borderBottom: 0, padding: '24px'}}>
            <Grid container spacing={2}>
              <PassengerInformation />
              <PreferredServices />
              <CrewRequirements />
              <PurposeofTravel />
              <CateringExtraServices />
			  <DocumentUploadReview />
            </Grid>
        </Box>
    )
}

export default PassengerAircraft;