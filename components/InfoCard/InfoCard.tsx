import { useAuth } from "@/app/context/AuthContext";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

interface InfoCardProps{
    InfoNumber?: number;
    InfoText?: string;
    InfoIcon?: any;
}
const InfoCard:React.FC<InfoCardProps> = ({ InfoNumber, InfoText, InfoIcon }) => {
    const {theme} = useAuth()
    return(
        <Box className='info-card'>
            <Box>
                <Typography component='h1' variant="h1" sx={{color: theme?.common?.blueColor}}>{InfoNumber}</Typography>
                <Typography sx={{fontFamily: 'poppins-lt'}}>{InfoText}</Typography>
            </Box>
            <Box className='card-count'>{InfoIcon}</Box>
        </Box>
    )
}

export default InfoCard;