'use client'
import { Box, Checkbox, FormControlLabel, Radio, Typography } from "@mui/material"
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import AirplanemodeActiveRoundedIcon from '@mui/icons-material/AirplanemodeActiveRounded';
import { RadioTabs } from "@/components";
import { MultiCityFlights, OneWayFlights, RoundTripFlights } from "@/karnx/pages/BookingInquiry";
import { useEffect, useState } from "react";
import { useStep } from "@/app/context/StepProvider";
const FlightDetails = () =>{

    const popularRoutes = [
        { from: 'Delhi', to: 'Mumbai' },
        { from: 'Mumbai', to: 'Delhi' },
        { from: 'Delhi', to: 'Pune' },
        { from: 'Pune', to: 'Delhi' },
    ]

    const { radioTabActive, setRadioTabActive, formData = { flightDetails: {} }, setFormData } = useStep();

    useEffect(() => {
        if(radioTabActive === undefined){
            setRadioTabActive(0);
        }
        setRadioTabActive(radioTabActive);
    }, [radioTabActive]);

    return(
        <Box sx={{ border: '1px solid #E6E6E6', borderBottom: 0, padding: '24px'}}>
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
            <RadioTabs defaultValue={radioTabActive} onchange={ (value: number) => { setFormData({
                ...formData,
                flightDetails: {
                    ...formData.flightDetails,
                    trip_type: value === 0 ? 'one_way' : value === 1 ? 'round_trip' : value === 2 ? 'multi_city' : ''
                    
                }}); setRadioTabActive(value);
            }}>
                <RadioTabs.Tab label="One Way" icon={<Radio className="custom-radio" size="small" checked={false} sx={{margin: '0 !important'}} />}>
                    <OneWayFlights/>
                </RadioTabs.Tab>
                <RadioTabs.Tab label="Round Trip" icon={<Radio className="custom-radio" size="small" checked={false} sx={{margin: '0 !important'}} />}>
                    <RoundTripFlights />
                </RadioTabs.Tab>
                <RadioTabs.Tab label="Multi City" icon={<Radio className="custom-radio" size="small" checked={false} sx={{margin: '0 !important'}} />}>
                    <MultiCityFlights />
                </RadioTabs.Tab>
            </RadioTabs>

            <Box sx={{mt: '25px'}}>
                <FormControlLabel 
                    sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'poppins-lt', fontSize: '14px' } }}
                    control={<Checkbox size="small" />}
                    label='My dates are flexible'
                    checked={formData?.flightDetails?.is_flexible_dates ?? false}
                    onChange={(e:any) => {
                        setFormData({
                            ...formData,
                            flightDetails: {
                                ...formData.flightDetails,
                                is_flexible_dates: e.target?.checked,
                            }
                        });
                    }}

                />
            </Box>
            <Box sx={{mt: '10px', padding: '16px', border: '1px solid #E6E6E6', backgroundColor: '#F2F2F2', borderRadius: '2px'}}>
                <Typography sx={{ fontFamily: 'poppins-lt', fontSize: '14px' }}>Please specify a range, e.g., 08 March 2025 to 24 March 2025</Typography>
            </Box>
        </Box>
    )
}

export default FlightDetails