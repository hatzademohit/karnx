"use client";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TravellerDetails, ContactDetails, GSTDetails, BillingAddress, TravelAgentCommission } from "@/components";
import { travelAgentSchema } from '@/utils/ValidationSchema'
import { Box, Button, Grid, Typography } from "@mui/material";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";
import { apiBaseUrl } from "@/karnx/api";
import { toast } from "react-toastify";
import useApiFunction from "@/karnx/Hooks/useApiFunction";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

const TravelAgentFullQuoteView = (quoteId: any) => {
    // const { errors } = useFormContext()
    const { setShowDetailsTabs, inquiryId } = useInquiryDetails();
    const callApi = useApiFunction();
    const methods = useForm({
        resolver: yupResolver(travelAgentSchema),
        mode: 'onChange',
        defaultValues: {
            adults: [],
            children: [],
            infants: [],
            enableGST: false,
            gstin: "",
            contact_email: "",
            contact_phone: "",
            contact_name: '',
            city: "",
        },
    });

    const onSubmit = async (data: any) => {
        //console.log("FORM VALUES:", quoteId);
        try {
            const bodyParam = {
                inquiryId,
                quoteId,
                data
            };
            const res = await callApi({ method: 'POST', url: `${apiBaseUrl}/inquiry-quotes/confirm-booking`, body: bodyParam });
            if (res?.status === true) {
                toast.success(res?.message || '');
                setShowDetailsTabs(false);
            } else {
                toast.error(res?.message || '');
            }
        } catch (e) {
            //toast.error('Network error while sending quote to travel agent');
        }
    };

    return (
        <FormProvider {...methods}>
            <Typography component="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
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