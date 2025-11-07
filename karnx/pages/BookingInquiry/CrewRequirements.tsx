'use client'
import { Grid, Typography, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useStep } from '@/app/context/StepProvider';
import { CustomTextField, SingleSelect } from "@/components";
import { useFormContext, Controller } from "react-hook-form";
import { useAuth } from "@/app/context/AuthContext";

const CrewRequirements = () => {
    const { theme } = useAuth()
    const { crewRequirementOptions } = useStep();
    const [crewReqRequirement, setCrewRequirement] = useState<any[]>([]);
    const { control, formState: { errors } } = useFormContext();

    useEffect(() => {
        setCrewRequirement(crewRequirementOptions || []);
    }, [crewRequirementOptions]);

    return (
        <>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{ color: theme?.common?.redColor, my: '15px' }}>
                    Crew Requirements
                </Typography>
            </Grid>

            {crewReqRequirement.map((crew) => (
                <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }} key={crew.var_key}>
                    <Controller
                        name={`crewRequirements.${crew.var_key}`}
                        control={control}
                        defaultValue="" // default value is empty string or set default ID
                        render={({ field }) => {
                            // Find the name of the selected option based on the stored ID
                            const selectedOption = crew.options.find((opt) => opt.id === field.value);
                            return (
                                <SingleSelect
                                    inputLabel={crew.inputLabel}
                                    value={selectedOption ? selectedOption.name : ""} // Show name in dropdown
                                    onChange={(e) => field.onChange(e.target.value)} // store the ID
                                    error={!!errors.crewRequirements?.[crew.var_key]}
                                    helperText={errors.crewRequirements?.[crew.var_key]?.message}
                                >
                                    {crew.options.map((opt) => (
                                        <MenuItem value={opt.id} key={opt.id}>
                                            {opt.name} {/* Show the name in dropdown */}
                                        </MenuItem>
                                    ))}
                                </SingleSelect>
                            );
                        }}
                    />
                </Grid>
            ))}


            <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
                <Controller
                    name="additionalNotes"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <CustomTextField
                            inputLabel="Additional Notes"
                            size="medium"
                            {...field}
                            error={!!errors.additionalNotes}
                            helperText={errors.additionalNotes?.message as string}
                        />
                    )}
                />
            </Grid>
        </>
    );
}

export default CrewRequirements;
