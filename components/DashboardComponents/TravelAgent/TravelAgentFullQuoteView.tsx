"use client";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TravellerDetails, ContactDetails, GSTDetails, BillingAddress, TravelAgentCommission } from "@/components";
import { travelAgentSchema } from '@/utils/ValidationSchema'
import { Box, Button, Grid, Typography } from "@mui/material";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";
import { apiBaseUrl, RAZORPAY_KEY } from "@/karnx/api";
import { toast } from "react-toastify";
import useApiFunction from "@/karnx/Hooks/useApiFunction";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
// import { handlePayment } from "@/components/Payments/RazorpayButton";

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

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const loaded = await loadRazorpay();
        if (!loaded) return alert("Razorpay SDK failed");

        // Step 1: Create Order from Laravel
        const response = await callApi({ method: 'POST', url: `${apiBaseUrl}/booking-payment/create-order`, body: { amount: 5000, currency: "INR" } });
        const order = response;
        // Step 2: Open Razorpay Gateway
        const options = {
            key: RAZORPAY_KEY,
            amount: order.amount,
            currency: "INR",
            name: "karnX",
            description: "Payment",
            order_id: order.id,
            handler: async function (response) {

                // Step 3: Verify payment with Laravel;
                let param = { booking_inquiries_id: inquiryId, quoteId };
                const verify = await callApi({ method: 'POST', url: `${apiBaseUrl}/booking-payment/verify-payment`, body: { param, response } });
                const result = verify;//await verify.json();
                //console.log(result);
                if (result.status === "success") {
                    return result.status; //alert("Payment Successful ✅");
                } else {
                    return result.status; //alert("Payment Failed ❌");
                    //alert("Payment Failed ❌");
                }
            },
            method: {
                paylater: false,
                emi: false
            },

            theme: { color: "#3399cc" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const onSubmit = async (data: any) => {
        //console.log("FORM VALUES:", quoteId);

        try {
            const paymentStatus: any = await handlePayment();
            if (paymentStatus === 'success') {
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
            } else if (paymentStatus === 'failed') {
                //toast.error('Payment failed');
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