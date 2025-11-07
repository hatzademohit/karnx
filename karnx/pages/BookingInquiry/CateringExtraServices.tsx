'use client'
import { CustomTextField } from "@/components";
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStep } from "@/app/context/StepProvider";
import { Controller, useFormContext } from "react-hook-form";
import { useAuth } from "@/app/context/AuthContext";
const CateringExtraServices = () => {
    const { theme } = useAuth()
    const { cateringDietaryOptions } = useStep();
    const { control, watch, formState: { errors } } = useFormContext();
    const [cateringDietary, setCateringDietary] = useState<any[]>([]);

    useEffect(() => {
        setCateringDietary(cateringDietaryOptions || []);
    }, [cateringDietaryOptions, errors]);

    return (
        <>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{ color: theme?.common?.redColor, mt: '10px' }}>Catering & Extra Services</Typography>
            </Grid>
            <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                <FormControlLabel
                    label="Catering Required"
                    control={
                        <Controller
                            name="isCateringRequired"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    size="small"
                                    checked={field.value || false}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                            )}
                        />
                    }
                />
                {watch("isCateringRequired") && (
                    <React.Fragment>
                        <Typography variant="h3" sx={{ my: '15px' }}>Special Dietary Requirements</Typography>
                        {errors.cateringDietary && (
                            <Typography color="error" className="fs12" sx={{ mt: 1 }}>
                                {errors.cateringDietary.message as string}
                            </Typography>
                        )}
                        <Controller
                            name="cateringDietary"
                            control={control}
                            render={({ field }) => (
                                <FormGroup>
                                    {cateringDietary.map((requirement) => (
                                        <FormControlLabel
                                            key={requirement.id}
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={field.value?.includes(requirement.id) || false}
                                                    onChange={(e) => {
                                                        const newValue = e.target.checked
                                                            ? [...(field.value || []), requirement.id]
                                                            : field.value?.filter((id: string) => id !== requirement.id);
                                                        field.onChange(newValue);
                                                    }}
                                                />
                                            }
                                            label={requirement.name}
                                        />
                                    ))}
                                </FormGroup>
                            )}
                        />
                    </React.Fragment>
                )}
            </Grid>
            {watch("isCateringRequired") && (
                <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <Controller
                            name="allergies"
                            control={control}
                            render={({ field, fieldState }) => (
                                <CustomTextField
                                    inputLabel="Allergies & Dietary Restrictions"
                                    placeholder="List any allergies or restrictions..."
                                    size="medium"
                                    {...field}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name="drinkPreferences"
                            control={control}
                            render={({ field, fieldState }) => (
                                <CustomTextField
                                    inputLabel="Drink Preferences"
                                    placeholder="Wine Preferences, non-alcoholic drinks, etc..."
                                    size="medium"
                                    {...field}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name="customServices"
                            control={control}
                            render={({ field, fieldState }) => (
                                <CustomTextField
                                    inputLabel="Custom Services"
                                    placeholder="Any other special requests..."
                                    size="medium"
                                    {...field}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Box>
                </Grid>
            )}
        </>
    )
}

export default CateringExtraServices;