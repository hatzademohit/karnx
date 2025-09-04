'use client'
import { CustomTextField } from "@/components";
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStep } from "@/app/context/StepProvider";
const CateringExtraServices = () => {

    const [isServicesReq, setshowServices] = useState(false);
    //const [specialRequirements, setSpecialRequirements] = useState(['Vegetarian', 'Vegan', 'Gluten Free', 'Kosher', 'Halal', 'Diabetic'])
    const { formData, setFormData, cateringDietaryOptions } = useStep();

    useEffect(() => {
        if(isServicesReq === false){
            setFormData((prevFormData) => ({
                ...prevFormData,
                passengerInfo: {
                    ...prevFormData.passengerInfo,
                    is_catering_service_req: isServicesReq,
                    catering_services: {
                        ...prevFormData.passengerInfo.catering_services,
                        dietary_required: [],
                        allergy_notes: '',
                        drink_preferences: '',
                        custom_services: ''
                    }
                }
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                passengerInfo: {
                    ...prevFormData.passengerInfo,
                    is_catering_service_req: isServicesReq,
                }
            }));
        }
    }, [isServicesReq]);

    const handleCheckboxChange = (id : string) => {
        setFormData(prevData => {
            const selected = prevData.passengerInfo.catering_services?.dietary_required || [];
            const updated = selected.includes(id)
                ? selected.filter(val => val !== id) // uncheck
                : [...selected, id]; // check

            return {
                ...prevData,
                passengerInfo: {
                    ...prevData.passengerInfo,  
                    catering_services: {
                        ...prevData.passengerInfo?.catering_services,
                        dietary_required: updated
                    }                  
                }
            };
        });
    };  
    return(
        <>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{color: '#BC0019', mt: '15px'}}>Catering & Extra Services</Typography>
            </Grid>
            <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                <FormControlLabel label='Catering Required' control={<Checkbox checked={isServicesReq} size="small" onChange={ (e) => setshowServices(e.target?.checked) }/>} />
                {isServicesReq && 
                    <React.Fragment>
                        <Typography variant="h3" sx={{ my: '15px' }}>Special Dietary Requirements</Typography>
                        <FormGroup>
                            {cateringDietaryOptions && cateringDietaryOptions.map((requirement) => (
                                <FormControlLabel key={requirement.id} control={<Checkbox size="small" />} label={requirement.name} 
                                value={formData?.passengerInfo?.catering_services?.dietary_required?.includes(requirement.id)}    
                                onChange={(e) => { handleCheckboxChange(requirement.id) } }
                                />
                            ))}
                        </FormGroup>
                    </React.Fragment>
                }
            </Grid>
            {isServicesReq && 
                <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                        <CustomTextField
                            inputLabel="Allergies & Dietary Restrictions"
                            placeholder="List any allergies or restrictions..."
                            size="medium"
                            value={formData?.passengerInfo?.catering_services?.allergy_notes || ''}
                            onChange={(e) => {
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    passengerInfo: {
                                        ...prevFormData.passengerInfo,
                                        catering_services: {
                                            ...prevFormData.passengerInfo?.catering_services,
                                            allergy_notes: e.target.value
                                        }
                                    }
                                }));
                            } }
                        />
                        <CustomTextField
                            inputLabel="Drink Preferences"
                            placeholder="Wine Preferences, non-alcoholic drinks, etc..."
                            size="medium"
                            value={formData?.passengerInfo?.catering_services?.drink_preferences || ''}
                            onChange={(e) => {
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    passengerInfo: {
                                        ...prevFormData.passengerInfo,
                                        catering_services: {
                                            ...prevFormData.passengerInfo?.catering_services,
                                            drink_preferences: e.target.value
                                        }
                                    }
                                }));
                            } }
                        />
                        <CustomTextField
                            inputLabel="Custom Services"
                            placeholder="Any other special requests... "
                            size="medium"
                            value={formData?.passengerInfo?.catering_services?.custom_services || ''}
                            onChange={(e) => {
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    passengerInfo: {
                                        ...prevFormData.passengerInfo,
                                        catering_services: {
                                            ...prevFormData.passengerInfo?.catering_services,
                                            custom_services: e.target.value
                                        }
                                    }
                                }));
                            } }
                        />
                    </Box>
                </Grid>
            }
        </>
    )
}

export default CateringExtraServices;