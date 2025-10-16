import { Box, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { useStep } from '@/app/context/StepProvider';
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
const PreferredServices = () => {
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
                        {errors.preferredServices.root.message as string}
                    </Typography>
                )}
            </Grid>
            {preferredServicesData && preferredServicesData.map((services) => (
                <Grid size={{ lg: 4, md: 6, sm: 6, xs:12 }} key={services.id}>
                    <Box sx={{ border: '1px solid #E6E6E6', padding: '10px 12px' }}>
                        <Controller
                            name={`preferredServices.${services.id}`} // store values as {1: true, 2: false}
                            control={control}
                            render={({ field }) => (
                                <>
                                    <FormControlLabel
                                        label={<Box sx={{ lineHeight: '16px' }}> {services.name} <Typography sx={{ fontFamily: 'poppins-lt', color: '#808080', fontSize: '12px' }}> {services.description} </Typography></Box>}
                                        control={
                                            <Checkbox
                                                checked={field.value || false}
                                                onChange={(e) => field.onChange(e.target.checked)}
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