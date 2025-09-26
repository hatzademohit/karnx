'use client'
import { Box, Button, Checkbox, FormControlLabel, Radio, Typography } from "@mui/material"
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import AirplanemodeActiveRoundedIcon from '@mui/icons-material/AirplanemodeActiveRounded';
import { RadioTabs } from "@/components";
import { MultiCityFlights, OneWayFlights, RoundTripFlights } from "@/karnx/pages/BookingInquiry";
import { useEffect, useMemo } from "react";
import { useStep } from "@/app/context/StepProvider";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { oneWaySchema, roundTripSchema, multiCitySchema } from "./ValidationSchema";

const FlightDetails = () =>{

    const { radioTabActive, setRadioTabActive, activeStep, handleBackClick, handleNextClick, formData, setFormData  } = useStep();

    const schema = useMemo(() => {
        if (radioTabActive === 0) return oneWaySchema;
        if (radioTabActive === 1) return roundTripSchema;
        return multiCitySchema;
    }, [radioTabActive]);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<any>({
        resolver: yupResolver(schema as any),
        mode: "onChange",
        defaultValues: {
            flexibleRange: formData?.flexibleRange || '',
            isFlexibleDates: formData?.isFlexibleDates || false,
            // One-way fields
            oneWayfrom: formData?.oneWayfrom || '',
            oneWayto: formData?.oneWayto || '',
            oneWaydepartureDate: formData?.oneWaydepartureDate || null,
            // Round-trip fields
            roundTripfrom: formData?.roundTripfrom || '',
            roundTripto: formData?.roundTripto || '',
            roundTripdepartureDate: formData?.roundTripdepartureDate || null,
            roundTripfromReturn: formData?.roundTripfromReturn || '',
            roundTriptoReturn: formData?.roundTriptoReturn || '',
            roundTripreturnDate: formData?.roundTripreturnDate || null,
            // Multi-city fields
            multiCity: [
            {
                multiCityfrom: formData?.multiCityfrom || '',
                multiCityto: formData?.multiCityto || '',
                multiCitydepartureDate: formData?.multiCitydepartureDate || null,
            },
            ],
            multiCityfromReturn: formData?.multiCityfromReturn || '',
            multiCitytoReturn: formData?.multiCitytoReturn || '',
            multiCityreturnDate: formData?.multiCityreturnDate || null,
        },
    });

    const onSubmit = (data: any) => {
        setFormData((prev: any) => ({...prev, ...data}));
        console.log("Form Submitted: ", data);
        handleNextClick();
    };

    const popularRoutes = [
        { from: 'Delhi', to: 'Mumbai' },
        { from: 'Mumbai', to: 'Delhi' },
        { from: 'Delhi', to: 'Pune' },
        { from: 'Pune', to: 'Delhi' },
    ]

    useEffect(() => {
        if(radioTabActive === undefined){
            setRadioTabActive(0);
        }
        setRadioTabActive(radioTabActive);
    }, [radioTabActive]);

    return(
        <>
            <Box sx={{ border: '1px solid #E6E6E6', borderBottom: 0, padding: '24px'}}>
                <Typography variant="h3" sx={{color: '#BC0019', mb: '24px'}}>Popular Routes</Typography>
                <Box sx={{ display: 'flex', gap: '24px'}}>
                    {popularRoutes && popularRoutes.map((route, index) => (
                        <Box key={index + route.from} sx={{border: '1px solid #E6E6E6', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '16px', width: 'fit-content'}}>
                            <Typography variant="h6">{route.from}</Typography>
                            <TrendingFlatIcon />
                            <Typography variant="h6">{route.to}</Typography>
                            <AirplanemodeActiveRoundedIcon sx={{fontSize: '20px', color: '#808080'}} />
                        </Box>
                    ))}
                </Box>
                <Typography variant="h3" sx={{color: '#BC0019', my: '24px'}}>Flight Details</Typography>
                <RadioTabs defaultValue={radioTabActive} onchange={ (value: number) => { setRadioTabActive(value)}}>
                    <RadioTabs.Tab label="One Way" icon={<Radio className="custom-radio" size="small" checked={false} sx={{margin: '0 !important'}} />}>
                        <OneWayFlights control={control} errors={errors} setValue={setValue} />
                    </RadioTabs.Tab>
                    <RadioTabs.Tab label="Round Trip" icon={<Radio className="custom-radio" size="small" checked={false} sx={{margin: '0 !important'}} />}>
                        <RoundTripFlights control={control} setValue={setValue} errors={errors} />
                    </RadioTabs.Tab>
                    <RadioTabs.Tab label="Multi City" icon={<Radio className="custom-radio" size="small" checked={false} sx={{margin: '0 !important'}} />}>
                        <MultiCityFlights control={control} setValue={setValue} errors={errors} />
                    </RadioTabs.Tab>
                </RadioTabs>

                <Box sx={{mt: '25px'}}>
                    <Controller
                        name="isFlexibleDates"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <FormControlLabel sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'poppins-lt', fontSize: '14px' } }}
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={field.value || false}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                }
                                label="My dates are flexible"
                            />
                        )}
                    />

                </Box>
                <Box sx={{mt: '10px', padding: '16px', border: '1px solid #E6E6E6', backgroundColor: '#F2F2F2', borderRadius: '2px'}}>
                    <Typography sx={{ fontFamily: 'poppins-lt', fontSize: '14px' }}>Please specify a range, e.g., 08 March 2025 to 24 March 2025</Typography>
                </Box>
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
                <Button className="btn btn-blue" sx={{ width: '100%' }} onClick={handleSubmit(onSubmit)}>
                    Continue
                </Button>
            </Box>
        </>
    )
}

export default FlightDetails