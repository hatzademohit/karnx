import * as React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
} from "@mui/material";

interface StepType {
  title?: string;
  subtitle: string;
  component: React.ReactNode;
}

interface StepperComponentProps {
  steps: StepType[];
}

const StepperComponent: React.FC<StepperComponentProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <Box sx={{ width: "100%", '& .MuiStepLabel-iconContainer.Mui-active svg': {color: '#BC0019'}, '& .MuiStepLabel-iconContainer.Mui-completed svg': {color: '#03045E'} }}>
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
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default StepperComponent;
