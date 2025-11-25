import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { CreateNewQuoteStepper } from "@/components";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from "@/app/context/AuthContext";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";

const NoQuotes = () => {
    const { user } = useAuth();
    const [createNewQuote, setCreateNewQuote] = useState<boolean>(false);
    const { inquiryRowData } = useInquiryDetails();
    const inqStsId = inquiryRowData?.status_id;
    const addQuote = () => {
        setCreateNewQuote(true);
    }

    useEffect(() => {
        if ([4].includes(inqStsId)) {
            setCreateNewQuote(false);
        }
    }, [inqStsId]);
    return (
        <>
            {!createNewQuote &&
                <Box sx={{ padding: 4, border: '2px dashed #cccccc', display: 'flex', gap: 1.5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6F7FF', borderRadius: '8px' }}>
                    <AttachMoneyIcon sx={{ fontSize: '35px', color: '#808080' }} />
                    <Typography variant="h4">No quotes received yet</Typography>
                    {user.access_type === 'Aircraft Operator' ?
                        <>
                            <Typography color="text.secondary">Quotes will appear here once you submit their proposals.</Typography>
                            <Button className='btn btn-danger' onClick={addQuote}><AddIcon sx={{ mr: '4px' }} /> Add Quote</Button>
                        </> :
                        <>
                            <Typography color="text.secondary">Quotes will appear here once operators submit their proposals.</Typography>
                            <Typography color="text.secondary" sx={{ fontSize: '12px' }}>Expected response time: 2-4 hours</Typography>
                        </>
                    }
                </Box>
            }
            {createNewQuote && user.access_type === 'Aircraft Operator' && <CreateNewQuoteStepper />}
        </>
    )
}

export default NoQuotes;