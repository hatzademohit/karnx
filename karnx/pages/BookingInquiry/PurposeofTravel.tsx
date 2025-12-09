'use client'
import { FormControl, FormControlLabel, FormHelperText, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useStep } from "@/app/context/StepProvider";
import { Controller, useFormContext } from "react-hook-form";
import { useAuth } from "@/app/context/AuthContext";
const PurposeofTravel = () => {
    const { theme } = useAuth()
    const { travelingPurposeOption } = useStep();
    const [travelingPurpose, setTravelingPurpose] = useState<any[]>([]);
    const { control, formState: { errors } } = useFormContext();

    useEffect(() => {
        setTravelingPurpose(travelingPurposeOption || []);
    }, [travelingPurposeOption]);

    return (
        <Grid container spacing={2}>
            {errors.travelPurpose && (
                <FormHelperText error className="w-100">
                    {errors.travelPurpose.message as string}
                </FormHelperText>
            )}
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
        </Grid>
    )
}

export default PurposeofTravel;