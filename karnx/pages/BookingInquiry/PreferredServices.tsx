import { Box, Checkbox, FormControlLabel, FormHelperText, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { useStep } from '@/app/context/StepProvider';
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useAuth } from "@/app/context/AuthContext";

const PreferredServices = () => {
    const { theme } = useAuth()
    const { aircraftTypeOptions } = useStep();
    const [preferredServicesData, setPreferredServicesData] = useState([]);
    const { control, formState: { errors } } = useFormContext();
    useEffect(() => {
        setPreferredServicesData(aircraftTypeOptions || []);
    }, [aircraftTypeOptions]);

    return (
        <Grid container spacing={2}>
            {errors.preferredServices && (
                <FormHelperText error className="w-100">
                    {errors?.preferredServices?.root?.message as string || errors?.preferredServices?.message as string}
                </FormHelperText>
            )}
            {/* preferredServices single select */}
            {/* <Grid size={{ xs: 12 }}>
                <Controller
                    name={`preferredServices`} // store values as {1: true, 2: false}
                    control={control}
                    render={({ field }) => (
                        <RadioGroup
                            name="travel-purpose"
                            {...field}
                            value={Array.isArray(field.value) ? field.value[0] : ""} // extract first value for selection
                            onChange={(_, val) => {
                                field.onChange([val]); // store in array
                                console.log([val]);
                            }}
                        >
                            <Grid container spacing={2}>
                                {preferredServicesData && preferredServicesData.map((services) => (
                                    <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }} key={services.id}>
                                        <Box sx={{ border: '1px solid #E6E6E6', padding: '10px 12px' }}>
                                            <FormControlLabel
                                                label={<Box sx={{ lineHeight: '16px' }}> {services.name} <Typography sx={{ fontFamily: 'poppins-lt', color: '#808080', fontSize: '12px' }}> {services.description} </Typography></Box>}
                                                value={String(services.id)}
                                                control={<Radio />}
                                            // control={<Radio size="small" value={Array(services.id)} />}
                                            />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </RadioGroup>
                    )}
                />
            </Grid> */}

            {/* preferredServices multi select */}
            {preferredServicesData && preferredServicesData.map((services) => (
                <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }} key={services.id}>
                    <Box sx={{ border: '1px solid #E6E6E6', padding: '10px 12px' }}>
                        <Controller
                            name={`preferredServices`} // store values as {1: true, 2: false}
                            control={control}
                            render={({ field }) => (
                                <>
                                    <FormControlLabel
                                        label={<Box sx={{ lineHeight: '16px' }}> {services.name} <Typography sx={{ fontFamily: 'poppins-lt', color: '#808080', fontSize: '12px' }}> {services.description} </Typography></Box>}
                                        control={
                                            <Checkbox
                                                // Ensure that field.value is always treated as an array
                                                checked={Array.isArray(field.value) && field.value.includes(services.id)} // Check if the id is in the selected array
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    const updatedValue = Array.isArray(field.value) ? [...field.value] : [];

                                                    if (isChecked) {
                                                        // If checked, add the service id to the array
                                                        updatedValue.push(services.id);
                                                    } else {
                                                        // If unchecked, remove the service id from the array
                                                        const index = updatedValue.indexOf(services.id);
                                                        if (index !== -1) {
                                                            updatedValue.splice(index, 1);
                                                        }
                                                    }

                                                    // Update the field value with the modified array
                                                    field.onChange(updatedValue);
                                                    console.log(updatedValue); // For debugging purposes
                                                }}
                                            />
                                        }
                                    />
                                </>
                            )}
                        />
                    </Box>
                </Grid>
            ))}
        </Grid>
    )
}

export default PreferredServices;