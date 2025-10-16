import * as React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
} from "@mui/material";
import { useStep } from "@/app/context/StepProvider";
import { useAuth } from "@/app/context/AuthContext";

interface StepType {
  title?: string;
  subtitle: string;
  component: React.ReactNode;
}

interface StepperComponentProps {
  steps: StepType[];
  activeStep?: number;
  handleNextClick?: () => void;
  handleBackClick?: () => void;
}

const StepperComponent: React.FC<StepperComponentProps> = ({ steps, activeStep, handleNextClick, handleBackClick }) => {

  const { formData, storeBookingInquiryData } = useStep();
  const {theme} = useAuth();

  return (
    <Box sx={{ width: "100%", '& .MuiStepLabel-iconContainer.Mui-active svg': {color: theme?.common?.redColor}, '& .MuiStepLabel-iconContainer.Mui-completed svg': {color: theme?.common?.blueColor} }}>
      {/* Stepper Header */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.subtitle}>
            <StepLabel>
              <Typography
                variant="subtitle1"
                sx={{
                  color: activeStep === index ? "error.main" : "text.secondary",
                }}
              >
                {`Step ${index + 1}`}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: "0.8rem" }}
              >
                {step.subtitle}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box sx={{ mt: 3 }}>
        {steps[activeStep].component}
      </Box>

      {/* Navigation Buttons */}
      {/* <Box sx={{ display: "flex", flexDirection: "row", p: '24px', pt: '0', gap: 2, border: '1px solid #e3e3e3', borderTop: 0 }}>
        <Button
          disabled={activeStep === 0}
          onClick={ () => handleBackClick() }
          className="btn btn-outlined"
          sx={{ width: '100%' }}
        >
          Previous Step
        </Button>
        <Button
          onClick={activeStep === steps.length - 1 ? handleFinish : handleNextClick}
          className="btn btn-blue"
          sx={{ width: '100%' }}
        >
          {activeStep === steps.length - 1 ? "Submit Inquiry to Admin" : "Continue"}
        </Button>
      </Box> */}
    </Box>
  );
};

export default StepperComponent;