import { useAuth } from "@/app/context/AuthContext";
import { Box, Typography } from "@mui/material";
import React from "react";

interface InfoCardProps {
    InfoNumber?: number | string;
    InfoText?: string;
    InfoStatus?: string;
    InfoDesc?: string;
}
const InfoCard: React.FC<InfoCardProps> = ({ InfoNumber, InfoText, InfoStatus, InfoDesc }) => {
    const { theme } = useAuth()
    return (
        <Box className='info-card'>
            <Box>
                <Typography sx={{ fontFamily: 'poppins-lt' }}>{InfoText}</Typography>
                {InfoStatus && <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>{InfoStatus}</Typography>}
                {InfoDesc && <Typography sx={{ fontSize: '11px', color: '#BC0019' }}>{InfoDesc}</Typography>}
            </Box>
            <Box className='card-count'>
                <Typography component='h4' variant="h4" sx={{ color: theme?.common?.blueColor }}>{InfoNumber}</Typography>
            </Box>
        </Box>
    )
}

export default InfoCard;