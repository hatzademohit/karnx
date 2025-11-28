import { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { QuoteDetails, TravelAgentFullQuoteView } from "@/components";
import { toast } from "react-toastify";
import useApiFunction from "@/karnx/Hooks/useApiFunction";
import { apiBaseUrl } from "@/karnx/api";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";

const TravelAgentQuoteView = () => {
    const callApi = useApiFunction();
    const [acceptQuote, setAcceptQuote] = useState(false);
    const { inquiryId, inquiryRowData } = useInquiryDetails();
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
            toast.error('Network error while fetching cancellation policies');
        }
    };

    useEffect(() => {
        fetchQuotes();

    }, []);

    return (
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
                            <Button className="btn btn-blue" onClick={() => setAcceptQuote(true)}>Accept Quote</Button>
                            <Button className="btn btn-danger" onClick={() => setAcceptQuote(false)}>Reject Quote</Button>
                            <Button className="btn btn-outlined" onClick={() => setAcceptQuote(false)}>Revise Quote</Button>
                        </Box>
                    </Grid>
                }
                {acceptQuote && <TravelAgentFullQuoteView />}

            </Grid>
        </Box>
    )
}

export default TravelAgentQuoteView;