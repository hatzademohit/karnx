'use client';
import { Box, Typography } from "@mui/material";
import { StepperComponent } from '@/components'
import { ContactSummary, FlightDetails, PassengerAircraft } from '@/karnx/pages/BookingInquiry'
import { useStep } from "@/app/context/StepProvider";
import { useAuth } from "@/app/context/AuthContext";

const NewInquiry = () => {
  const {theme} = useAuth();
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

  	const { handleBackClick, handleNextClick, activeStep } = useStep()
 
    return(
        <Box>
            <Typography component='h1' variant="h1" sx={{ color: theme?.heading?.color, mb: theme?.heading?.marginBottom }}>Create New Inquiry</Typography>
            <StepperComponent steps={steps} activeStep={activeStep} handleNextClick={() => handleNextClick()} handleBackClick={() => handleBackClick()} />
        </Box>
    )
}

export default NewInquiry;