'use client'
import { Box, Radio, Typography } from "@mui/material"
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import AirplanemodeActiveRoundedIcon from '@mui/icons-material/AirplanemodeActiveRounded';
import { RadioTabs } from "@/components";
import { MultiCityFlights, OneWayFlights, RoundTripFlights } from "@/karnx/pages/NewInquiry";
const FlightDetails = () =>{

    const popularRoutes = [
        { from: 'Delhi', to: 'Mumbai' },
        { from: 'Mumbai', to: 'Delhi' },
        { from: 'Delhi', to: 'Pune' },
        { from: 'Pune', to: 'Delhi' },
    ]

    return(
        <Box sx={{ border: '1px solid #E6E6E6', padding: '24px'}}>
            <Typography variant="h3" sx={{color: '#BC0019', mb: '24px'}}>Popular Routes</Typography>
            <Box sx={{ display: 'flex', gap: '24px'}}>
                {popularRoutes && popularRoutes.map((route, index) => (
                    <Box key={index + route.from} sx={{border: '1px solid #E6E6E6', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '16px', width: 'fit-content'}}>
                        <Typography variant="h6">{route.from}</Typography>
                        <TrendingFlatIcon />
                        <Typography variant="h6">{route.to}</Typography>
                        <AirplanemodeActiveRoundedIcon sx={{fontSize: '20px', color: '#808080'}} />
                    </Box>
                ))}
            </Box>            
            <Typography variant="h3" sx={{color: '#BC0019', my: '24px'}}>Flight Details</Typography>
            <RadioTabs defaultValue={0}>
                <RadioTabs.Tab label="One Way" icon={<Radio className="custom-radio" size="small" checked={false} sx={{margin: '0 !important'}} />}>
                    <OneWayFlights />
                </RadioTabs.Tab>
                <RadioTabs.Tab label="Round Trip" icon={<Radio className="custom-radio" size="small" checked={false} sx={{margin: '0 !important'}} />}>
                    <RoundTripFlights />
                </RadioTabs.Tab>
                <RadioTabs.Tab label="Multi City" icon={<Radio className="custom-radio" size="small" checked={false} sx={{margin: '0 !important'}} />}>
                    <MultiCityFlights />
                </RadioTabs.Tab>
            </RadioTabs>
        </Box>
    )
}

export default FlightDetails