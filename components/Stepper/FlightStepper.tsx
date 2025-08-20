import * as React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";

// ---- Custom Connector ----
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    borderColor: "#d32f2f",
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    borderColor: "#d32f2f",
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

// ---- Custom Step Icon ----
const QontoStepIconRoot = styled("div")<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#d32f2f",
  }),
  "& .QontoStepIcon-circle": {
    width: 12,
    height: 12,
    border: "2px solid currentColor",
    borderRadius: "50%",
    backgroundColor: "#fff",
  },
  "& .QontoStepIcon-completedIcon": {
    color: "#d32f2f",
    zIndex: 1,
    fontSize: 18,
  },
}));

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active, completed }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

// ---- Main Stepper Component ----
const steps = [
  "Flight Plan Filed",
  "Ground Handling Confirmed",
  "Catering Ordered",
  "Weather Brief Completed",
  "Pre-flight Inspection",
];

export default function FlightStepper() {
  const [activeStep, setActiveStep] = React.useState(1); // 0-based index

  return (
    <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
