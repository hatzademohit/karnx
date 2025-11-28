"use client";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TravellerDetails, ContactDetails, GSTDetails, BillingAddress, TravelAgentCommission } from "@/components";
import { travelAgentSchema } from '@/karnx/pages/BookingInquiry/ValidationSchema'
import { Box, Button, Grid, Typography } from "@mui/material";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";

const TravelAgentFullQuoteView = () => {

    const { setShowDetailsTabs } = useInquiryDetails()
    const methods = useForm({
        resolver: yupResolver(travelAgentSchema),
        mode: 'onChange',
        defaultValues: {
            adults: [],
            children: [],
            infants: [],
            enableGST: false,
            gstin: "",
            contactEmail: "",
            contactPhone: "",
            city: "",
        },
    });

    const onSubmit = (data: any) => {
        console.log("FORM VALUES:", data);
    };

    return (
        <FormProvider {...methods}>
            <Typography component="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <TravellerDetails />
                    <ContactDetails />
                    <BillingAddress />
                    <GSTDetails />
                    {/* <TravelAgentCommission /> */}
                </Grid>
                <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" className="btn btn-outlined" onClick={() => setShowDetailsTabs(false)}>Close</Button>
                    <Button type="submit" variant="contained" className="btn btn-blue">Confirm Booking</Button>
                </Box>
            </Typography>
        </FormProvider>
    );
};

export default TravelAgentFullQuoteView;