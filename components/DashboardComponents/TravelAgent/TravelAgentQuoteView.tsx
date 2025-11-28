import { useState } from "react";
import { Grid } from "@mui/material";
import { QuoteDetails, TravelAgentFullQuoteView } from "@/components";

const TravelAgentQuoteView = () => {
    const [viewedQuote, setViewedQuote] = useState<any>(null);

    return (
        <>
            <Grid container spacing={{ md: 2, xs: 1 }}>
                <QuoteDetails viewedQuote={viewedQuote} />
            </Grid>
            <TravelAgentFullQuoteView />
        </>
    )
}

export default TravelAgentQuoteView;