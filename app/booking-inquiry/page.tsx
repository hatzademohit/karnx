import NewInquiry from "@/karnx/pages/BookingInquiry/BookingInquiry";
import { StepProvider } from "../context/StepProvider";

const page = () => {
    return(
        <StepProvider>
            <NewInquiry />
        </StepProvider>
    )
}

export default page;