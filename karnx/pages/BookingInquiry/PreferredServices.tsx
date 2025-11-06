import { Box, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
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
        <>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{ color: theme?.common?.redColor, my: '15px' }}>Preferred Aircraft & Services</Typography>
                {errors.preferredServices && (
                    <Typography color="error" className="fs12" sx={{ mt: 1 }}>
                        {/* {errors.preferredServices.root.message as string} */}
                        Aircraft type required

                    </Typography>
                )}
            </Grid>
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
        </>
    )
}

export default PreferredServices;