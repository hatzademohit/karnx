import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Chip, Link } from "@mui/material";
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
  requested_service: [];
  crew_requirements: [];
  medical_assistance_req: [];
  pet_travels: [];
  uploaded_documents_path: [];
  required_documents_name: [];

}

const InquiryDetailsTab: React.FC<InquiryDetailsTabProps> = ({ inquiryTabData }) => {

  const { data, refetch: fetchInquiryDetails } = useApi<InquiryDetailsValue>(
    `${apiBaseUrl}/inquiry-details/get-details/${inquiryTabData}`
  );
  useEffect(() => {
    fetchInquiryDetails();
  }, []);

  console.log(data?.requested_service);
  return (
    <>
      {/* Flight Information */}
      <Card variant="outlined" sx={{ borderRadius: 3, mb: { md: 2, xs: 1 } }}>
        <CardContent sx={{ bgcolor: "#F7F8FC" }} className="card-content">
          <Typography sx={{ fontFamily: "poppins-semibold", mb: 2 }} variant="h5">
            Flight Information
          </Typography>

          <Grid container spacing={{ md: 2, xs: 1 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Route
              </Typography>
              <Typography variant="h5">
                <FlightTakeoff fontSize="small" sx={{ mr: 0.5 }} />
                {data?.route}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Departure Date
              </Typography>
              <Typography variant="h5">
                {data?.date}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Passengers
              </Typography>
              <Typography variant="h5">
                {data?.passangers}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Aircraft Type
              </Typography>
              <Typography variant="h5">
                {data?.aircraft}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Purpose of Trip
              </Typography>
              <Typography variant="h5">
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
      <Card variant="outlined" sx={{ borderRadius: 3, mb: { md: 2, xs: 1 } }}>
        <CardContent className="card-content">
          <Typography sx={{ fontFamily: "poppins-semibold", mb: 2 }} variant="h5">
            Contact Information
          </Typography>
          <Grid container spacing={{ md: 2, xs: 1 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Client Name
              </Typography>
              <Typography variant="h5">
                {data?.clientName}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="h5">
                {data?.clientEmail}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="h5">
                {data?.clientPhone}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Baggage & Services */}
      <Grid container spacing={{ md: 2, xs: 1 }}>
        {/* Baggage */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent className="card-content">
              <Typography sx={{ fontFamily: "poppins-semibold", mb: 2 }} variant="h5">
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
              <Typography variant="h5">
                {data?.is_traveling_pets}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Requested Services */}
        {data?.requested_service?.length > 0 && (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
                <CardContent className="card-content">
                  <Typography sx={{ fontFamily: "poppins-semibold", mb: 2 }} variant="h5">
                    Requested Services
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Catering:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {data?.requested_service.map((service: string, idx: number) => (
                      <Chip key={`${service}-${idx}`} label={service} color="info" size="small" sx={{ borderRadius: 1 }} />
                    ))}
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          </>
        )}

        {/* Crew Requirements */}
        {data?.crew_requirements?.length > 0 && (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
                <CardContent className="card-content" >
                  <Typography sx={{ fontFamily: "poppins-semibold", mb: 2 }} variant="h5">
                    Crew Requirements
                  </Typography>
                  {data?.crew_requirements.map((crewReq: any, idx: number) => (
                    <React.Fragment key={idx}>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0 }}>
                        {crewReq?.lable}:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>

                        <Chip key={`${crewReq}-${idx}`} label={crewReq?.value} color="warning" size="small" sx={{ borderRadius: 1 }} />

                      </Box>
                    </React.Fragment>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
        {/* Pet Information */}
        {data?.pet_travels?.length > 0 && (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
                <CardContent className="card-content" >
                  <Typography sx={{ fontFamily: "poppins-semibold", mb: 2 }} variant="h5">
                    Traveling With Pets
                  </Typography>
                  {data?.pet_travels.map((petInfo: any, idx: number) => (
                    <React.Fragment key={idx}>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0 }}>
                        {petInfo?.lable}:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>

                        <Chip key={`${petInfo}-${idx}`} label={petInfo?.value} color="success" size="small" sx={{ borderRadius: 1 }} />

                      </Box>
                    </React.Fragment>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </>
        )}

        {/* Medical Assistance Requirement */}
        {data?.medical_assistance_req?.length > 0 && (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
                <CardContent className="card-content" >
                  <Typography sx={{ fontFamily: "poppins-semibold", mb: 2 }} variant="h5">
                    Medical Needs or Special Assistance
                  </Typography>
                  {data?.medical_assistance_req.map((medReq: string, idx: number) => (
                    <React.Fragment key={idx}>
                      {/* <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0 }}>
                        Spec
                      </Typography> */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>

                        <Chip key={`${medReq}-${idx}`} label={medReq} color="warning" size="small" sx={{ borderRadius: 1 }} />

                      </Box>
                    </React.Fragment>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </>
        )}

        {/* Uploaded Documents */}
        {data?.uploaded_documents_path?.length > 0 && (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
                <CardContent className="card-content" >
                  <Typography sx={{ mb: 2 }} variant="h5">
                    Attached Document(s)
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ lg: 6, sm: 12 }}>
                      <Typography variant="h6" mb={1}> Document(s) Name</Typography>
                      {data?.required_documents_name.map((path: string, idx: number) => (
                        <React.Fragment key={idx}>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                            <Chip key={`${path}-${idx}`} label={path} size="small" sx={{ borderRadius: 1 }} />
                          </Box>
                        </React.Fragment>
                      ))}
                    </Grid>
                    <Grid size={{ lg: 6, sm: 12 }}>
                      <Typography variant="h6" mb={1}>Document(s) Link</Typography>
                      {data?.uploaded_documents_path.map((medReq: string, idx: number) => (
                        <React.Fragment key={idx}>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                            <Link key={`${medReq}-${idx}`} href={medReq} >{medReq}</Link>
                          </Box>
                        </React.Fragment>
                      ))}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default InquiryDetailsTab;
