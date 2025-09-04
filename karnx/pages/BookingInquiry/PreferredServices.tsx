import { Box, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";

const PreferredServices = () => {

    const preferredServicesData = [
        {label: 'Light Jet', subLabel: 'Up to 6 passengers'},
        {label: 'Mid-Size Jet', subLabel: 'Up to 9 passengers'},
        {label: 'Heavy Jet', subLabel: 'Up to 14 passengers'},
        {label: 'Ultra Long Range', subLabel: 'Up to 19 passengers'},
        {label: 'Turboprop', subLabel: 'Up to 8 passengers'},
        {label: 'No Preference', subLabel: 'Let us recommend'},
    ]

    return(
        <>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{color: '#BC0019', my: '15px'}}>Preferred Aircraft & Services</Typography>
            </Grid>
            {preferredServicesData && preferredServicesData.map((services) => (
                <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }} key={services.label}>
                    <Box sx={{border: '1px solid #E6E6E6', padding: '10px 12px'}}>
                        <FormControlLabel 
                            label={<Box sx={{lineHeight: '16px'}}> {services.label} <Typography sx={{fontFamily: 'poppins-lt', color: '#808080', fontSize: '12px'}}> {services.subLabel} </Typography></Box>} 
                            control={<Checkbox />} 
                        />
                    </Box>
                </Grid>
            ))}
        </>
    )
}

export default PreferredServices;