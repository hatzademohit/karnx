'use client'
import { CustomTextField } from "@/components";
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

const CateringExtraServices = () => {

    const [showServices, setshowServices] = useState(false);
    const [specialRequirements, setSpecialRequirements] = useState(['Vegetarian', 'Vegan', 'Gluten Free', 'Kosher', 'Halal', 'Diabetic'])

    return(
        <>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{color: '#BC0019', mt: '15px'}}>Catering & Extra Services</Typography>
            </Grid>
            <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                <FormControlLabel label='Catering Required' control={<Checkbox checked={showServices} size="small" onChange={ (e) => setshowServices(e.target?.checked) }/>} />
                {showServices && 
                    <React.Fragment>
                        <Typography variant="h3" sx={{ my: '15px' }}>Special Dietary Requirements</Typography>
                        <FormGroup>
                            {specialRequirements && specialRequirements.map((requirement) => (
                                <FormControlLabel key={requirement} control={<Checkbox size="small" />} label={requirement} />
                            ))}
                        </FormGroup>
                    </React.Fragment>
                }
            </Grid>
            {showServices && 
                <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                        <CustomTextField
                            inputLabel="Allergies & Dietary Restrictions"
                            placeholder="List any allergies or restrictions..."
                            size="medium"
                        />
                        <CustomTextField
                            inputLabel="Drink Preferences"
                            placeholder="Wine Preferences, non-alcoholic drinks, etc..."
                            size="medium"
                        />
                        <CustomTextField
                            inputLabel="Custom Services"
                            placeholder="Any other special requests... "
                            size="medium"
                        />
                    </Box>
                </Grid>
            }
        </>
    )
}

export default CateringExtraServices;