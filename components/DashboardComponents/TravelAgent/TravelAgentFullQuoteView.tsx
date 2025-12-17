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
    const { setShowDetailsTabs, inquiryId, inquiryRowData, setAdultsChild } = useInquiryDetails();
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
            address: "",
            pincode: "",
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

    const paymentAmount = () => {
        return 500;
    }

    const handlePayment = async (data) => {
        const loaded = await loadRazorpay();
        if (!loaded) return alert("Razorpay SDK failed");

        // Step 1: Create Order from Laravel
        const response = await callApi({ method: 'POST', url: `${apiBaseUrl}/booking-payment/create-order`, body: { amount: paymentAmount(), currency: "INR" } });
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
                response['booking_inquiries_id'] = inquiryId;
                response['quoteId'] = quoteId.quoteId;
                // Step 3: Verify payment with Laravel;
                let param = { booking_inquiries_id: inquiryId, quoteId };
                const verify = await callApi({ method: 'POST', url: `${apiBaseUrl}/booking-payment/verify-payment`, body: response });
                const result = verify;//await verify.json();
                if (result.status === "success") {
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
                    return result.status;
                } else {
                    return result.status;
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
        try {
            const paymentStatus: any = await handlePayment(data);
        } catch (e) {
            //toast.error('Network error while sending quote to travel agent');
        }
    };

    const getBookingTravellerDetails = async () => {
        const response = await callApi({ method: 'GET', url: `${apiBaseUrl}/booking-travellers/get-traveller-details/${inquiryId}` });
        const data = response.data;

        // methods.setValue('adults', data.passangers.adult);
        // methods.setValue('children', data.passangers.child);
        // methods.setValue('infants', data.passangers.infant);
        // methods.setValue('enableGST', data.enableGST);
        // methods.setValue('gstin', data.gstin);
        methods.setValue('contact_email', data?.contact_details?.contact_email);
        methods.setValue('contact_phone', data?.contact_details?.contact_phone);
        methods.setValue('contact_name', data?.contact_details?.contact_name);
        methods.setValue('city', data?.contact_details?.city);
        methods.setValue('pincode', data?.contact_details?.pincode);
        methods.setValue('address', data?.contact_details?.address);
    };

    const getTravellerPassangers = async () => {

        const response = await callApi({ method: 'GET', url: `${apiBaseUrl}/booking-travellers/get-traveller-passanger` });
        const data = response.data;
        // methods.setValue('adults', data.adult);
        // methods.setValue('children', data.child);
        // methods.setValue('infants', data.infant);
        methods.reset({
            adults: data.adult,
            children: data.child,
            infants: data.infant,
        })
        setAdultsChild([data?.adult, data?.child, data?.infant]);
        // methods.setValue('enableGST', data.enableGST);
        // methods.setValue('gstin', data.gstin);
        // methods.setValue('contact_email', data.contact_email);
        // methods.setValue('contact_phone', data.contact_phone);
        // methods.setValue('contact_name', data.contact_name);
        // methods.setValue('city', data.city);
    };
    useEffect(() => {
        getBookingTravellerDetails();
        getTravellerPassangers();
    }, [inquiryId, inquiryRowData.status_id]);
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
                    {/* {[17].indexOf(inquiryRowData.status_id) !== -1 ? <Button type="submit" variant="contained" className="btn btn-blue">Confirm Booking</Button> : null} */}
                    <Button type="submit" variant="contained" className="btn btn-blue">Confirm Booking</Button>
                </Box>
            </Typography>
        </FormProvider>
    );
};

export default TravelAgentFullQuoteView;