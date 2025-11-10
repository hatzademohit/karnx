'use client'
import { Box, Button, Grid } from "@mui/material";
import { PassengerInformation, PreferredServices, CrewRequirements, PurposeofTravel, CateringExtraServices, DocumentUploadReview } from '@/karnx/pages/BookingInquiry'
import { useStep } from "@/app/context/StepProvider";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passengerAircraftSchema, passengerAircraftSchemaType } from "./ValidationSchema";

const PassengerAircraft = () => {
    const { activeStep, handleBackClick, formData, setFormData, handleNextClick } = useStep();

    const methods = useForm<any>({
        resolver: yupResolver(passengerAircraftSchema),
        mode: "onChange",
        defaultValues: {
            adults: formData?.adults || 1,
            children: formData?.children || 0,
            infants: formData?.infants || 0,
            totalPassengers: formData?.totalPassengers || 0,
            isTravellingWithPets: formData?.isTravellingWithPets || false,
            petType: formData?.petType || '',
            petSize: formData?.petSize || '',
            petAdditionalNotes: formData?.petAdditionalNotes || '',
            isMedicalAssistanceReq: formData?.isMedicalAssistanceReq || false,
            specialAssistance: formData?.specialAssistance || {},
            checkedBags: formData?.checkedBags || '',
            carryOnBags: formData?.carryOnBags || '',
            overSizedItems: formData?.overSizedItems || '',
            // 
            preferredServices: formData?.preferredServices || {},
            crewRequirements: formData?.crewRequirements || {},
            additionalNotes: formData?.additionalNotes || '',
            otherAssistance: formData?.otherAssistance || '',
            //
            travelPurpose: formData?.travelPurpose || '',
            // 
            isCateringRequired: formData?.isCateringRequired || false,
            cateringDietary: formData?.cateringDietary || [],
            allergies: formData?.allergies || '',
            drinkPreferences: formData?.drinkPreferences || '',
            customServices: formData?.customServices || '',
            documentFile: formData?.documentFile || null,
            requiredDocumentUploaded: formData?.requiredDocumentUploaded || null,
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: passengerAircraftSchemaType) => {
        setFormData((prev: any) => ({ ...prev, ...data }));
        console.log("Form Submitted: ", data);
        handleNextClick();
    };

    return (
        <FormProvider {...methods}>
            <Box sx={{ border: '1px solid #E6E6E6', borderBottom: 0, padding: '24px' }}>
                <Grid container spacing={2}>
                    <PassengerInformation />
                    <PreferredServices />
                    <CrewRequirements />
                    <PurposeofTravel />
                    <CateringExtraServices />
                    <DocumentUploadReview />
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
                    Continue
                </Button>
            </Box>
        </FormProvider>
    )
}

export default PassengerAircraft;