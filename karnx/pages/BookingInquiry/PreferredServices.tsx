import { Box, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { useStep } from '@/app/context/StepProvider';
import { useEffect } from "react";
const PreferredServices = () => {
    const { formData, setFormData, aircraftTypeOptions } = useStep();
    const preferredServicesData = aircraftTypeOptions;


    const handleCheckboxChange = (id) => {
        setFormData(prevData => {
            const selected = prevData.passengerInfo.aircraft_preference;
            const updated = selected.includes(id)
                ? selected.filter(val => val !== id) // uncheck
                : [...selected, id]; // check

            return {
                ...prevData,
                passengerInfo: {
                    ...prevData.passengerInfo,
                    aircraft_preference: updated
                }
            };
        });
    };

    return (
        <>
           <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{ color: '#BC0019', my: '15px' }}>Preferred Aircraft & Services</Typography>
            </Grid>
            {preferredServicesData && preferredServicesData.map((services) => (
                <Grid size={{ lg: 4, md: 6, sm: 6, xs:12 }} key={services.id}>
                    <Box sx={{ border: '1px solid #E6E6E6', padding: '10px 12px' }}>
                        <FormControlLabel
                            label={<Box sx={{ lineHeight: '16px' }}> {services.name} <Typography sx={{ fontFamily: 'poppins-lt', color: '#808080', fontSize: '12px' }}> {services.description} </Typography></Box>}
                            control={<Checkbox />}
                            checked={formData?.passengerInfo?.aircraft_preference.includes(services.id)}
                            value={formData?.passengerInfo?.aircraft_preference[services.id]}
                            onChange={() => handleCheckboxChange(services.id)}
                        />
                    </Box>
                </Grid>
            ))}
        </>
    )
}

export default PreferredServices;