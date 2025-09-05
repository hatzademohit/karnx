'use client';
import { Box, Typography } from "@mui/material";
import { StepperComponent } from '@/components'
import { ContactSummary, FlightDetails, PassengerAircraft } from '@/karnx/pages/BookingInquiry'
import { useStep } from "@/app/context/StepProvider";

const NewInquiry = () => {
  const steps = [
    {
      subtitle: "Flight Details",
      component: <FlightDetails />,
    },
    {
      subtitle: "Passenger & Aircraft",
      component: <PassengerAircraft />,
    },
    {
      subtitle: "Contact & Summary",
      component: <ContactSummary />,
    },
  ];

  	const { handleBackClick, handleNextClick, activeStep, setActiveStep } = useStep()
 
    return(
        <Box>
            <Typography component='h1' variant="h1" sx={{ color: '#03045E', mb: '30px' }}>Create New Inquiry</Typography>
            <StepperComponent steps={steps} activeStep={activeStep} handleNextClick={() => handleNextClick()} handleBackClick={() => handleBackClick()} />
        </Box>
    )
}

export default NewInquiry;