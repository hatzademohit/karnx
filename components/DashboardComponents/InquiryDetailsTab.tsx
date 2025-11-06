import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Chip } from "@mui/material";
import { FlightTakeoff, Event } from "@mui/icons-material";
import { apiBaseUrl } from "@/karnx/api";
import { useApi } from "@/karnx/Hooks/useApi";

interface InquiryDetailsTabProps {
  inquiryTabData: any;
}

interface InquiryDetailsValue {
  route: string;
  date: string;
  passangers: string;
  aircraft: string;
  traveling_purpose: string;
  flexible_date_range: string;
  is_traveling_pets: boolean;
  checkedBag: string;
  carryOnBag: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;


}

const InquiryDetailsTab: React.FC<InquiryDetailsTabProps> = ({ inquiryTabData }) => {

  const { data, refetch: fetchInquiryDetails } = useApi<InquiryDetailsValue>(
    `${apiBaseUrl}/inquiry-details/get-details/${inquiryTabData}`
  );
  useEffect(() => {
    fetchInquiryDetails();
  }, []);
  return (
    <>
      {/* Flight Information */}
      <Card variant="outlined" sx={{ borderRadius: 3, mb: 2 }}>
        <CardContent sx={{ bgcolor: "#F7F8FC" }}>
          <Typography sx={{ fontFamily: "poppins-semibold", mb: 2 }} variant="subtitle1">
            Flight Information
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Route
              </Typography>
              <Typography sx={{ fontFamily: "poppins-md" }} variant="subtitle1">
                <FlightTakeoff fontSize="small" sx={{ mr: 0.5 }} />
                {data?.route}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Departure Date
              </Typography>
              <Typography sx={{ fontFamily: "poppins-md" }} variant="subtitle1">
                {data?.date}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Passengers
              </Typography>
              <Typography sx={{ fontFamily: "poppins-md" }} variant="subtitle1">
                {data?.passangers}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Aircraft Type
              </Typography>
              <Typography sx={{ fontFamily: "poppins-md" }} variant="subtitle1">
                {data?.aircraft}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Purpose of Trip
              </Typography>
              <Typography sx={{ fontFamily: "poppins-md" }} variant="subtitle1">
                {data?.traveling_purpose}
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              bgcolor: "#F2F2F2",
              borderRadius: 2,
              p: 1.5,
              mt: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Event fontSize="small" color="action" />
            <Typography variant="body2">
              <strong>Flexible Dates:</strong> {data?.flexible_date_range}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card variant="outlined" sx={{ borderRadius: 3, mb: 2 }}>
        <CardContent>
          <Typography sx={{ fontFamily: "poppins-semibold", mb: 2 }} variant="subtitle1">
            Contact Information
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Client Name
              </Typography>
              <Typography sx={{ fontFamily: "poppins-md" }} variant="subtitle1">
                {data?.clientName}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography sx={{ fontFamily: "poppins-md" }} variant="subtitle1">
                {data?.clientEmail}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Phone
              </Typography>
              <Typography sx={{ fontFamily: "poppins-md" }} variant="subtitle1">
                {data?.clientPhone}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Baggage & Services */}
      <Grid container spacing={2}>
        {/* Baggage */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography sx={{ fontFamily: "poppins-semibold", mb: 2 }} variant="subtitle1">
                Baggage & Pets
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Checked Bags:
              </Typography>
              <Typography variant="body1" fontWeight={600} mb={1}>
                {data?.checkedBag}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Carry-on Bags:
              </Typography>
              <Typography variant="body1" fontWeight={600} mb={1}>
                {data?.carryOnBag}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Pets:
              </Typography>
              <Typography sx={{ fontFamily: "poppins-md" }} variant="subtitle1">
                {data?.is_traveling_pets}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Requested Services */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography sx={{ fontFamily: "poppins-semibold", mb: 2 }} variant="subtitle1">
                Requested Services
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Catering:
              </Typography>
              <Chip label="Hot meals" color="warning" size="small" sx={{ borderRadius: 1, mb: 1 }} />

              <Typography variant="body2" color="text.secondary">
                Onboard Services:
              </Typography>
              <Chip label="In-flight Wi-Fi" color="info" size="small" sx={{ borderRadius: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default InquiryDetailsTab;
