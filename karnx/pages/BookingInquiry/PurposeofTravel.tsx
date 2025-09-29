'use client'
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useStep } from "@/app/context/StepProvider";
import { Controller, useFormContext } from "react-hook-form";
const PurposeofTravel = () => {
        const { travelingPurposeOption } = useStep();
        const [travelingPurpose, setTravelingPurpose] = useState<any[]>([]);
        const { control, formState: { errors } } = useFormContext();
    
        useEffect(() => {
            setTravelingPurpose(travelingPurposeOption || []);
        }, [travelingPurposeOption]);

    return (
        <>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{ color: '#BC0019', mt: '15px' }}>Purpose of Travel</Typography>
                {errors.travelPurpose && (
                    <Typography color="error" className="fs12" sx={{ mt: 1 }}>
                        {errors.travelPurpose.message as string}
                    </Typography>
                )}
            </Grid>
            <Grid size={{ xs: 12 }}>
                <FormControl>
                     <Controller
                        name="travelPurpose"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <RadioGroup
                                name="travel-purpose"
                                {...field}
                                value={field.value || ""}
                            >
                                {travelingPurpose && travelingPurpose.map((purpose) => (
                                    <FormControlLabel key={purpose.id} control={<Radio size="small" value={String(purpose.id)} />} label={purpose.name} />
                                ))}
                            </RadioGroup>
                        )}
                    />
                </FormControl>
            </Grid>
        </>
    )
}

export default PurposeofTravel;