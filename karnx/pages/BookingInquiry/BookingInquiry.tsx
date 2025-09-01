import { Box, Typography } from "@mui/material";
import { StepperComponent } from '@/components'
import { ContactSummary, FlightDetails, PassengerAircraft } from '@/karnx/pages/BookingInquiry'

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

    return(
        <Box>
            <Typography component='h1' variant="h1" sx={{ color: '#03045E', mb: '30px' }}>Create New Inquiry</Typography>
            <StepperComponent steps={steps} />
        </Box>
    )
}

export default NewInquiry;