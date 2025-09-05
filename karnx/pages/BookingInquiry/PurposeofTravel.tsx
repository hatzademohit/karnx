'use client'
import { FormControl, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useStep } from "@/app/context/StepProvider";
const PurposeofTravel = () => {
    const { formData, setFormData, travelingPurposeOption } = useStep();
    const [travelPurpose, setTravelPurpose] = useState<any>(formData?.passengerInfo?.travel_purpose_id);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            passengerInfo: {
                ...prevFormData.passengerInfo,
                travel_purpose_id: Number(travelPurpose),
            }
        }));
    }, [travelPurpose]);

    return (
        <>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{ color: '#BC0019', mt: '15px' }}>Purpose of Travel</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <FormControl>
                    <RadioGroup
                        value={travelPurpose}
                        name="travel-purpose"
                        onChange={(e) => setTravelPurpose(e.target.value)}
                    >
                        {travelingPurposeOption && travelingPurposeOption.map((purpose) => (
                            <FormControlLabel key={purpose.id} control={<Radio size="small" value={String(purpose.id)} />} label={purpose.name} />
                        ))}
                    </RadioGroup>
                    {/* <RadioGroup
                        name="travel-purpose"
                    >
                        <FormGroup>
                            {travelingPurposeOption && travelingPurposeOption.map((purpose) => (
                                <FormControlLabel checked={travelPurpose === purpose.id} key={purpose.id} control={<Radio size="small" value={purpose.id} onChange={(e) => setTravelPurpose(e.target.value)}/>} label={purpose.name} />
                            ))}
                        </FormGroup>
                    </RadioGroup> */}
                </FormControl>
            </Grid>
        </>
    )
}

export default PurposeofTravel;