'use client'
import { FormControl, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useStep } from "@/app/context/StepProvider";
const PurposeofTravel = () => {

    const [travelPurpose, setTravelPurpose] = useState<any>()
    const { formData, setFormData, travelingPurposeOption } = useStep();

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
                passengerInfo: {
                    ...prevFormData.passengerInfo,
                    travel_purpose_ids: travelPurpose,
                }
        }));
    }, [travelPurpose]);

    return(
        <>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{color: '#BC0019', mt: '15px'}}>Purpose of Travel</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <FormControl>
                    <RadioGroup
                        defaultValue="no"
                        name="travel-purpose"
                    >
                        <FormGroup>
                            {travelingPurposeOption && travelingPurposeOption.map((purpose) => (
                                <FormControlLabel key={purpose.id} value={purpose.id} control={<Radio size="small"  onChange={(e) => setTravelPurpose(e.target.value)}/>} label={purpose.name} />
                            ))}
                        </FormGroup>
                    </RadioGroup>
                </FormControl>
            </Grid>
        </>
    )
}

export default PurposeofTravel;