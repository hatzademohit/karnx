import { Box, Button, Grid, Typography } from "@mui/material";
import { CustomTextField } from "@/components";
import { useStep } from "@/app/context/StepProvider";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSummarySchema, contactSummarySchemaType  } from "./ValidationSchema";

const ContactSummary = ()=> {
    const { formData, setFormData, aircraftTypeOptions,  activeStep, handleBackClick, handleFinish } = useStep();
    
    const methods = useForm<any>({
        resolver: yupResolver(contactSummarySchema),
        mode: "onChange",
        defaultValues: {
            contactName: formData?.contactName || '',
            contactEmail: formData?.contactEmail || '',
            contactPhone: formData?.contactPhone || '',
            specialRequirements: formData?.specialRequirements || '',
        },
    });
    
   const { control, handleSubmit } = methods;
    
    const onSubmit = (data: contactSummarySchemaType) => {
        setFormData((prev: any) => ({...prev, ...data}));
        console.log("Form Submitted: ", data);
        // handleFinish();
    };
    return(
        <FormProvider {...methods}>
            <Box sx={{ border: '1px solid #E6E6E6', borderBottom: 0, padding: '24px'}}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h3" sx={{color: '#BC0019'}}>Contact Information</Typography>
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Controller
                            name="contactName"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <CustomTextField
                                    required={true}
                                    inputLabel="Contact Name"
                                    {...field}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Controller
                            name="contactEmail"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <CustomTextField
                                    required={true}
                                    inputLabel="Contact Email"
                                    {...field}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Controller
                            name="contactPhone"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <CustomTextField
                                    required={true}
                                    inputLabel="Contact Phone"
                                    {...field}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                        <Controller
                            name="specialRequirements"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <CustomTextField
                                    inputLabel="Special Requirements...."
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h3" sx={{color: '#BC0019', mt: '14px'}}>Inquiry Summary</Typography>
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Box sx={{display: 'flex', gap: '10px'}}>
                            <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Contact:</Typography>
                            <Typography sx={{fontSize: '14px', color: '#808080'}}>Sterling Enterprises</Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Box sx={{display: 'flex', gap: '10px'}}>
                            <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Route:</Typography>
                            <Typography sx={{fontSize: '14px', color: '#808080'}}>DEL → BOM </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Box sx={{display: 'flex', gap: '10px'}}>
                            <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Date:</Typography>
                            <Typography sx={{fontSize: '14px', color: '#808080'}}>October 25, 2025</Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Box sx={{display: 'flex', gap: '10px'}}>
                            <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Aircraft Type:</Typography>
                            <Typography sx={{fontSize: '14px', color: '#808080'}}>Mid-Size Jet</Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Box sx={{display: 'flex', gap: '10px'}}>
                            <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Passengers:</Typography>
                            {/* {formData.passengerInfo.passanger_info_adults &&
                            <Typography sx={{fontSize: '14px', color: '#808080'}}>4 adults</Typography>
                            }
                           {formData.passengerInfo.passanger_info_children &&
                            <Typography sx={{fontSize: '14px', color: '#808080'}}>{formData.passengerInfo.passanger_info_children} children</Typography>
                            }
                            {formData.passengerInfo.passanger_info_infants &&
                            <Typography sx={{fontSize: '14px', color: '#808080'}}>{formData.passengerInfo.passanger_info_infants} infant</Typography>
                            } */}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", p: '24px', pt: '0', gap: 2, border: '1px solid #e3e3e3', borderTop: 0 }}>
                <Button
                    disabled={activeStep === 0}
                    onClick={ () => handleBackClick() }
                    className="btn btn-outlined"
                    sx={{ width: '100%' }}
                >
                    Previous Step
                </Button>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    className="btn btn-blue"
                    sx={{ width: '100%' }}
                >
                    Submit Inquiry to Admin
                </Button>
            </Box>
        </FormProvider>
    )
}

export default ContactSummary;