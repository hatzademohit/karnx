'use client'
import { Box, Checkbox, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from "@mui/material";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useState } from "react";
import { CustomTextField } from "@/components";

const PassengerInformation = () => {

    const [passengers, setPassengers] = useState({
            Adults: 1,
            Children: 0,
            Infants: 0,
    });

    const [specialAssistance, setSpecialAssistance] = useState(['Wheelchair assistance', 'Stretcher assistance', 'Guide dog', 'TMedical Staff', 'Oxygen' ])

    const handleChange = (type: keyof typeof passengers, action: "inc" | "dec") => {
        setPassengers((prev) => ({
        ...prev,
        [type]:
            action === "inc"
            ? prev[type] + 1
            : prev[type] > 0
            ? prev[type] - 1
            : 0, // prevent negative
        }));
    };

    return(
        <>
            <Grid item lg={12}>
                <Typography variant="h3" sx={{color: '#BC0019'}}>Passenger Information</Typography>
            </Grid>
            {Object.keys(passengers).map((type) => (
                <Grid item lg={3} md={6} sm={6} xs={12}>
                    <Typography sx={{fontFamily: 'poppins-lt', fontSize: '14px', mb: '8px'}}>
                        {type === 'Children' ? 'Children (2-12 yrs)' : type === 'Infants' ? 'Infants (under 2)' : type}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <IconButton
                            className="btn-icon-border"
                            onClick={() => handleChange(type as keyof typeof passengers, "dec")}
                        >
                            <RemoveRoundedIcon />
                        </IconButton>
                        <Typography component="h5" variant="h5">
                            {passengers[type as keyof typeof passengers]}
                        </Typography>
                        <IconButton
                            className="btn-icon-border"
                            onClick={() => handleChange(type as keyof typeof passengers, "inc")}
                        >
                            <AddRoundedIcon />
                        </IconButton>
                    </Box>
                </Grid>
            ))}
            <Grid item lg={3} md={6} sm={6} xs={12}> 
                <CustomTextField 
                    inputLabel="Total Passengers"
                    value={4}
                    disabled={true}
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box className='passengers-travelling-info-box'>
                    <Typography sx={{ fontFamily: 'poppins-md', fontSize: '14px' }}>Travelling With Pets</Typography>
                    <FormControl>
                        <RadioGroup row
                            defaultValue="no"
                            name="travelling-with-pets"
                        >
                            <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    <Grid container spacing={2}>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <CustomTextField
                                inputLabel="Pet Type"
                                className='white-bg-input'
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <CustomTextField
                                inputLabel="Pet Size"
                                placeholder="Enter Pet Weight"
                                className='white-bg-input'
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <CustomTextField
                                inputLabel="Special Requirements..."
                                className='white-bg-input'
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box className='passengers-travelling-info-box'>
                    <Typography sx={{ fontFamily: 'poppins-md', fontSize: '14px' }}>Medical needs or assistance required</Typography>
                    <FormControl>
                        <RadioGroup row
                            defaultValue="no"
                            name="medical-needs"
                        >
                            <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    <Grid container spacing={1}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography component='h4' variant="h4" sx={{mt: '10px'}}>Special Assistance</Typography>
                            <Typography sx={{ fontFamily: 'poppins-lt', fontSize: '14px', color: '#959595', my: '10px' }}>Select Any Assistance needed for passenger</Typography>
                        </Grid>
                        {specialAssistance && specialAssistance.map((assistance) => (
                            <Grid item lg={4} md={4} sm={6} xs={6} key={assistance}>
                                <FormControlLabel label={assistance} control={<Checkbox size="small" />} />
                            </Grid>
                        ))}
                        <Grid item lg={4} md={4} sm={6} xs={6}>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <FormControlLabel label='Other' control={<Checkbox size="small" />} />
                                <CustomTextField placeholder="Enter" className='white-bg-input' />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
                <CustomTextField inputLabel="Checked Bags" value={0} />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
                <CustomTextField inputLabel="Carry -on Bags" value={0} />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
                <CustomTextField inputLabel="Oversized Items" placeholder="e.g., golf clubs, skis, etc." />
            </Grid>
        </>
    )
}

export default PassengerInformation;