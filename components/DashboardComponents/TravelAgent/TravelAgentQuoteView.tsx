import { useEffect, useState } from "react";
import { Box, Button, Divider, FormControl, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { CustomModal, QuoteDetails, TravelAgentFullQuoteView } from "@/components";
import { toast } from "react-toastify";
import useApiFunction from "@/karnx/Hooks/useApiFunction";
import { apiBaseUrl } from "@/karnx/api";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";
import { useForm } from "react-hook-form";

const TravelAgentQuoteView = () => {
    const callApi = useApiFunction();
    const [acceptQuote, setAcceptQuote] = useState(false);
    const [openRejection, setOpenRejection] = useState(false);
    const [findMethod, setFindMethod] = useState<string>()
    const { inquiryId, inquiryRowData, setinquiryRowData } = useInquiryDetails();
    const [getQuote, setQuote] = useState<any>(
        { client: { name: '' }, aircraft: { asset_name: '' } }
    );

    const fetchQuotes = async () => {
        try {
            const res = await callApi({ method: 'GET', url: `${apiBaseUrl}/inquiry-quotes/get-quoted-quotes/${inquiryId}` });
            if (res?.status === true) {
                setQuote(res.data.quotes[0]);
            } else {
                toast.error(res?.message || '');
            }
        } catch (e) {
            // toast.error('Network error while fetching cancellation policies');
        }
    };

    useEffect(() => {
        fetchQuotes();
        if ([11, 12, 13, 17].includes(inquiryRowData?.status_id)) {
            setAcceptQuote(true);
        }
    }, []);

    const handleQuoteAction = async (action) => {
        setinquiryRowData((prev) => ({
            ...prev,
            status: "accepted",
            status_color: '#eeeeee'
        }));
        try {
            const bodyParam = {
                action,
                inquiryId,
                message: '',
                quoteId: getQuote.id,
            };
            const res = await callApi({ method: 'POST', url: `${apiBaseUrl}/inquiry-quotes/accept-quote`, body: bodyParam });
            if (res?.status === true) {
                toast.success(res?.message || '');
                if (action === 'accepted') {
                    setAcceptQuote(true);
                }
            } else {
                toast.error(res?.message || '');
            }
        } catch (e) {
            //toast.error('Network error while sending quote to travel agent');
        }
    };

    const handleOpenModal = (method) => {
        setOpenRejection(true);
        setFindMethod(method)
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<any>({
        defaultValues: {
            message: "",
        },
    });
    const onRejectionSubmit = async (data: any) => {
        console.log(data)
    }
    useEffect(() => {
        reset({
            message: "",
        })
    }, [openRejection])
    return (
        <>
            <Box sx={{ p: 2, border: '1px solid #E6E6E6' }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h4">
                        Quote Details
                    </Typography>
                    <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt', mb: 2 }}>
                        {getQuote?.client?.name + ' · ' + getQuote?.aircraft?.asset_name}
                    </Typography>
                </Box>
                <Grid container spacing={{ md: 2, xs: 1 }}>
                    <QuoteDetails quote={getQuote} />
                    <Grid size={{ xs: 12 }}>
                        <Divider className="cust-divider" />
                    </Grid>
                    {!acceptQuote &&
                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button className="btn btn-blue" onClick={() => handleQuoteAction('accepted')}>Accept Quote</Button>
                                <Button className="btn btn-danger" onClick={() => handleOpenModal('rejected')}>Reject Quote</Button>
                                <Button className="btn btn-warning" color="warning" onClick={() => handleOpenModal('requote')}>Revise Quote</Button>
                            </Box>
                        </Grid>
                    }
                    {acceptQuote && <TravelAgentFullQuoteView />}
                </Grid>
            </Box>
            <CustomModal sx={{ '.MuiDialog-container .MuiPaper-root': { maxWidth: '400px' } }} headerText={
                <Box sx={{ fontSize: '18px' }}>
                    {findMethod === 'rejected' ? 'Rejection Reason' : 'Requote Reason'}
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px' }} >
                        Submit Quote {findMethod === 'rejected' ? 'Rejection Reason' : 'Requote Reason'}
                    </Typography>
                </Box>
            } open={openRejection} setOpen={setOpenRejection} dataClose={() => setOpenRejection(false)}>
                <Typography component="form" onSubmit={handleSubmit(onRejectionSubmit)} >
                    <InputLabel sx={{ fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333' }} required={true}>Massage</InputLabel>
                    <FormControl fullWidth>
                        <TextField
                            size="small"
                            multiline
                            minRows={4}
                            {...register("message", {
                                required: "Message is required",
                                minLength: {
                                    value: 5,
                                    message: "Message must be at least 5 characters",
                                },
                            })}
                            placeholder="Write your reason for rejecting the quote..."
                            error={!!errors.message}
                            helperText={errors.message?.message as string}
                        />
                    </FormControl>
                    <Divider sx={{ mb: 2, mt: 4 }} />
                    <Box className="modal-footer" sx={{ pb: '10px', mt: '10px', display: 'flex', justifyContent: 'flex-end', gap: 2, '& .btn': { maxWidth: '150px', width: '100%' } }}>
                        <Button className="btn btn-outlined" onClick={() => setOpenRejection(false)}>Cancel</Button>
                        <Button className="btn btn-blue" type="submit">Send</Button>
                    </Box>
                </Typography >
            </CustomModal >
        </>
    )
}

export default TravelAgentQuoteView;