import { Box, Grid, Typography } from "@mui/material";
import { CustomTextField } from "@/components";
import { useState } from "react";
import { useStep } from "@/app/context/StepProvider";
const ContactSummary = ()=> {
    const { formData, setFormData, aircraftTypeOptions} = useStep();   
    const aircraftype = aircraftTypeOptions.filter(option => formData.passengerInfo.aircraft_preference.includes(option.id)).map(option => option.name).join(', ');
    const dateString = formData.flightDetails.departure_time[0];
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return(
        <Box sx={{ border: '1px solid #E6E6E6', borderBottom: 0, padding: '24px'}}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h3" sx={{color: '#BC0019'}}>Contact Information</Typography>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <CustomTextField
                        inputLabel="Contact Name"
                        value={formData.contactInfo.contact_information?.contact_name || ''}
                        onChange={e => setFormData({
                            ...formData,
                            contactInfo: {
                                ...formData.contactInfo,
                                contact_information: {
                                    ...formData.contactInfo.contact_information,
                                    contact_name: e.target.value
                                }
                            }
                            })  
                        }
                    />
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <CustomTextField
                        inputLabel="Contact Email"
                        value={formData.contactInfo.contact_information?.contact_email || ''}
                        onChange={e => setFormData({
                            ...formData,
                            contactInfo: {
                                ...formData.contactInfo,
                                contact_information: {
                                    ...formData.contactInfo.contact_information,
                                    contact_email: e.target.value
                                }
                            }
                            })
                            }
                    />
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <CustomTextField
                        inputLabel="Contact Phone"
                        value={formData.contactInfo.contact_information?.contact_phone || ''}
                        onChange={e => setFormData({
                            ...formData,
                            contactInfo: {
                                ...formData.contactInfo,
                                contact_information: {
                                    ...formData.contactInfo.contact_information,
                                    contact_phone: e.target.value
                                }
                            }
                            })
                            }
                    />
                </Grid>
                <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                    <CustomTextField
                        inputLabel="Special Requirements...."
                        value={formData.contactInfo.contact_information?.special_requirements || ''}
                        onChange={e => setFormData({
                            ...formData,
                            contactInfo: {
                                ...formData.contactInfo,
                                contact_information: {
                                    ...formData.contactInfo.contact_information,
                                    special_requirements: e.target.value
                                }
                            }
                            })
                        }
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h3" sx={{color: '#BC0019', mt: '14px'}}>Inquiry Summary</Typography>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Contact:</Typography>
                        <Typography sx={{fontSize: '14px', color: '#808080'}}>{formData.contactInfo.contact_information?.contact_name}</Typography>
                    </Box>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Route:</Typography>
                        <Typography sx={{fontSize: '14px', color: '#808080'}}>{ formData?.flightDetails.departure_location[0]?.code} → {formData?.flightDetails.arrival_location[0]?.code} </Typography>
                    </Box>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Date:</Typography>
                        <Typography sx={{fontSize: '14px', color: '#808080'}}>{formattedDate}</Typography>
                    </Box>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Aircraft Type:</Typography>
                        <Typography sx={{fontSize: '14px', color: '#808080'}}>{aircraftype}</Typography>
                    </Box>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Passengers:</Typography>
                        {formData.passengerInfo.passanger_info_adults &&
                        <Typography sx={{fontSize: '14px', color: '#808080'}}>{formData.passengerInfo.passanger_info_adults} adults</Typography>
                        }
                        {formData.passengerInfo.passanger_info_children &&
                        <Typography sx={{fontSize: '14px', color: '#808080'}}>{formData.passengerInfo.passanger_info_children} children</Typography>
                        }
                        {formData.passengerInfo.passanger_info_infants &&
                        <Typography sx={{fontSize: '14px', color: '#808080'}}>{formData.passengerInfo.passanger_info_infants} infant</Typography>
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ContactSummary;