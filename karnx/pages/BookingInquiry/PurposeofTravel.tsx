'use client'
import { FormControl, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const PurposeofTravel = () => {

    const [travelPurpose, setTravelPurpose] = useState([])

    useEffect(() => {
        setTravelPurpose(['Business / Corporate', 'Leisure / Vacation', 'Emergency / Medical', 'Event / Group Charter'])
    }, [])

    return(
        <>
            <Grid item lg={12}>
                <Typography variant="h3" sx={{color: '#BC0019', mt: '15px'}}>Purpose of Travel</Typography>
            </Grid>
            <Grid item lg={12}>
                <FormControl>
                    <RadioGroup
                        defaultValue="no"
                        name="travel-purpose"
                    >
                        <FormGroup>
                            {travelPurpose && travelPurpose.map((purpose) => (
                                <FormControlLabel key={purpose} value={purpose} control={<Radio size="small" />} label={purpose} />
                            ))}
                        </FormGroup>
                    </RadioGroup>
                </FormControl>
            </Grid>
        </>
    )
}

export default PurposeofTravel;