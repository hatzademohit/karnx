import { Box, Button, Grid, Typography } from "@mui/material";
import { CustomTextField } from "@/components";
import { useStep } from "@/app/context/StepProvider";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSummarySchema, contactSummarySchemaType } from "./ValidationSchema";
import { useAuth } from "@/app/context/AuthContext";
import { apiBaseUrl } from "@/karnx/api";
import { use, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

function formDataCustomization(formData, radioTabActive) {
    //console.log("Form Submitted: ", formData);
    const tripType = { 0: "one_way", 1: "round_trip", 2: "multi_city" };
    let depLocation; let arrLocation; let depDateTime;
    if (radioTabActive === 0) {
        depLocation = [{ id: formData.oneWayfrom }];
        arrLocation = [{ id: formData.oneWayto }];
        depDateTime = [formData.oneWaydepartureDate];
    } else if (radioTabActive === 1) {
        depLocation = [{ id: formData.roundTripfrom }, { id: formData.roundTripto }];
        arrLocation = [{ id: formData.roundTripfromReturn }, { id: formData.roundTriptoReturn }];
        depDateTime = [formData.roundTripdepartureDate, formData.roundTripreturnDate];
    } else if (radioTabActive === 2) {
        formData.multiCity.forEach((leg: any, index: number) => {
            if (index === 0) {
                depLocation = [{ id: leg.multiCityfrom }];
                arrLocation = [{ id: leg.multiCityto }];
                depDateTime = [leg.multiCitydepartureDate];
            } else {
                depLocation.push({ id: leg.multiCityfrom });
                arrLocation.push({ id: leg.multiCityto });
                depDateTime.push(leg.multiCitydepartureDate);
            }
        });

    }
    const bookingData = {
        flightDetails: {
            trip_type: tripType[radioTabActive],
            is_flexible_dates: formData.isFlexibleDates ?? false,
            flexible_range: formData.flexibleRange ?? null,
            departure_location: depLocation,
            arrival_location: arrLocation,
            departure_time: depDateTime
        },
        passengerInfo: {
            passanger_info_adults: formData.adults,
            passanger_info_children: formData.children,
            passanger_info_infants: formData.infants,
            passenger_info_total: formData.totalPassengers,
            checked_bag: formData.checkedBags,
            carry_bag: formData.carryOnBags,
            oversized_items: formData.overSizedItems ?? null,
            is_traveling_pets: formData.isTravellingWithPets ?? false,
            is_medical_assistance_req: formData.isMedicalAssistanceReq ?? false,
            is_catering_service_req: formData.isCateringRequired ?? false,
            travel_purpose_id: formData.travelPurpose,
            catering_services: {
                dietary_required: formData.cateringDietary,
                allergy_notes: formData.allergies,
                drink_preferences: formData.drinkPreferences,
                custom_services: formData.customServices
            },
            medical_assistance: {
                medical_assist_id: formData.specialAssistance,
                other_requirements: formData.otherAssistance,
            },
            aircraft_preference: formData.preferredServices,
            crew_requirements: {
                additional_notes: formData.additionalNotes,
                services: formData.crewRequirements,
            },
            pet_travels: {
                pet_type: formData.petType,
                pet_size: formData.petSize,
                additional_notes: formData.petAdditionalNotes,
            },
        },
        contactInfo: {
            contact_information: {
                contact_name: formData.contactName,
                contact_email: formData.contactEmail,
                contact_phone: formData.contactPhone,
                special_requirements: formData.specialRequirements,
            }
        },
        documents: formData.documentFile,
    };
    //console.log(bookingData);
    return bookingData;
}
const ContactSummary = () => {
    const router = useRouter();
    const { theme } = useAuth()
    const { formData, setFormData, aircraftTypeOptions, activeStep, handleBackClick, handleFinish, airportCity, formatedFormData, setFormatedFormData, radioTabActive } = useStep();
    const [formValues, setFormValues] = useState<Record<string, any>>({});
    const [getRoute, setRoute] = useState<any>();
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

    const onSubmit = async (data: contactSummarySchemaType) => {
        setFormData((prev: any) => ({ ...prev, ...data }));
        let formSubmitdata = await formDataCustomization(formData, radioTabActive);
        setFormatedFormData(formSubmitdata);
        console.log(formatedFormData);
        handleFinish();
    };

    const handleAnyChange = useCallback((name: string, value: any) => {
        setFormValues(prev => ({ ...prev, [name]: value }));
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    }, []);
    const makeOnChange = (name: string, rhfOnChange: (v: any) => void) => (arg: any) => {
        const value = arg && arg.target !== undefined ? arg.target.value : arg; handleAnyChange(name, value); rhfOnChange(arg);
    };

    useEffect(() => {
        let depLocation; let arrLocation;
        if (radioTabActive === 0) {
            depLocation = formData.oneWayfrom;
            arrLocation = formData.oneWayto;
        } else if (radioTabActive === 1) {
            depLocation = formData.roundTripfrom;
            arrLocation = formData.roundTripto;
        } else if (radioTabActive === 2) {
            // formData.multiCity.forEach((leg: any, index: number) => {
            //     if (index === 0) {
            //         depLocation = [{ id: leg.multiCityfrom }];
            //         arrLocation = [{ id: leg.multiCityto }];
            //     } else {
            //         depLocation.push({ id: leg.multiCityfrom });
            //         arrLocation.push({ id: leg.multiCityto });
            //     }
            // });
            depLocation = formData.multiCity[0].multiCityfrom;
            arrLocation = formData.multiCity[formData.multiCity.length - 1].multiCityto;
        }

        const routeArray = [];
        airportCity.forEach((airport) => {
            if (airport.id === parseInt(depLocation)) {
                routeArray['fromRoute'] = airport.code;
            }
            if (airport.id === parseInt(arrLocation)) {
                routeArray['toRoute'] = airport.code;
            }
        });

        setRoute(routeArray);
    }, [formData, airportCity, radioTabActive]);

    return (
        <FormProvider {...methods}>
            <Box sx={{ border: '1px solid #E6E6E6', borderBottom: 0, padding: '24px' }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h3" sx={{ color: theme?.common?.redColor }}>Contact Information</Typography>
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
                                    onChange={makeOnChange('contactName', field.onChange)}
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
                                    onChange={makeOnChange('contactEmail', field.onChange)}
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
                                    onChange={makeOnChange('contactPhone', field.onChange)}
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
                                    onChange={makeOnChange('specialRequirements', field.onChange)}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h3" sx={{ color: theme?.common?.redColor, mt: '14px' }}>Inquiry Summary</Typography>
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Typography sx={{ fontFamily: 'poppins-md', fontSize: '14px' }}>Contact:</Typography>
                            <Typography sx={{ fontSize: '14px', color: '#808080' }}>{formValues.contactName}</Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Typography sx={{ fontFamily: 'poppins-md', fontSize: '14px' }}>Route:</Typography>
                            <Typography sx={{ fontSize: '14px', color: '#808080' }}> {getRoute?.fromRoute} → {getRoute?.toRoute} </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Typography sx={{ fontFamily: 'poppins-md', fontSize: '14px' }}>Date:</Typography>
                            {formData.isFlexibleDates &&
                                <Typography sx={{ fontSize: '14px', color: '#808080' }}>{formData.flexibleRange}</Typography>
                            }
                            {radioTabActive === 0 && formData.isFlexibleDates === false &&
                                <Typography sx={{ fontSize: '14px', color: '#808080' }}>{dayjs(formData.oneWaydepartureDate).format("MMMM DD, YYYY")}</Typography>
                            }
                            {radioTabActive === 1 && formData.isFlexibleDates === false &&
                                <Typography sx={{ fontSize: '14px', color: '#808080' }}>{dayjs(formData.roundTripdepartureDate).format("MMMM DD, YYYY")}</Typography>
                            }
                            {radioTabActive === 2 && formData.isFlexibleDates === false &&
                                <Typography sx={{ fontSize: '14px', color: '#808080' }}>{dayjs(formData.multiCity[0].multiCitydepartureDate).format("MMMM DD, YYYY")}</Typography>
                            }

                        </Box>
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Typography sx={{ fontFamily: 'poppins-md', fontSize: '14px' }}>Aircraft Type:</Typography>
                            {formData.preferredServices?.map((s) => {
                                const name = aircraftTypeOptions.find((t) => t.id === s)?.name;
                                return name && (
                                    <Typography key={s} sx={{ fontSize: '14px', color: '#808080' }}>
                                        {name}
                                    </Typography>
                                );
                            })}
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Typography sx={{ fontFamily: 'poppins-md', fontSize: '14px' }}>Passengers:</Typography>
                            {formData.adults &&
                                <Typography sx={{ fontSize: '14px', color: '#808080' }}>{formData.adults} adults</Typography>
                            }
                            {formData.children &&
                                <Typography sx={{ fontSize: '14px', color: '#808080' }}>| {formData.children} children</Typography>
                            }
                            {formData.infants &&
                                <Typography sx={{ fontSize: '14px', color: '#808080' }}>| {formData.infants} infant</Typography>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", p: '24px', pt: '0', gap: 2, border: '1px solid #e3e3e3', borderTop: 0 }}>
                <Button
                    disabled={activeStep === 0}
                    onClick={() => handleBackClick()}
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