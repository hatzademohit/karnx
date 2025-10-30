import React, { useState } from "react";
import {
	Box,
	Stepper,
	Step,
	StepLabel,
	Button,
	Typography,
	useTheme,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { AircraftFlightDetails, PricingDetails, AmenitiesDetails } from '@/components'

const steps = ["Aircraft & Flight Details", "Pricing Details", "Amenities & Final Details"];

const CreateNewQuoteStepper = () => {
	const [activeStep, setActiveStep] = useState(0);
	const theme = useTheme();

	const methods = useForm({
		mode: "onChange",
		defaultValues: {
			aircraft: "",
			estimatedFlightTime: "",
			baseFare: "",
			fuel: "",
			taxes: "",
			crewFees: "",
			handlingFees: "",
			catering: "",
			quoteValidUntil: "",
			cancellationPolicy: "",
			amenities: [],
			specialOffers: "",
			notes: "",
		},
	});

	const {
		handleSubmit,
		trigger,
		formState: { isValid },
	} = methods;

	const onSubmit = (data: any) => {
		console.log("Final Data:", data);
	};

	const handleNext = async () => {
		const valid = await trigger();
		if (valid) setActiveStep((prev) => prev + 1);
	};

	const handleBack = () => setActiveStep((prev) => prev - 1);

	return (
		<FormProvider {...methods}>
			<Typography component='form' onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%", '& .MuiStepLabel-iconContainer.Mui-active svg': { color: theme?.common?.redColor }, '& .MuiStepLabel-iconContainer.Mui-completed svg': { color: theme?.common?.blueColor } }}>
				<Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
					{steps.map((label, index) => (
						<Step key={index}>
							<StepLabel>
								<Typography variant="subtitle1" sx={{ color: activeStep === index ? "error.main" : "text. secondary" }}>
									{`Step ${index + 1}`}
								</Typography>
								<Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
									{label}
								</Typography>
							</StepLabel>
						</Step>
					))}
				</Stepper>

				<Box sx={{ mb: 3 }}>
					{activeStep === 0 && <AircraftFlightDetails />}
					{activeStep === 1 && <PricingDetails />}
					{activeStep === 2 && <AmenitiesDetails />}
				</Box>

				<Box display="flex" justifyContent="space-between" gap={2}>
					<Button variant="outlined" disabled={activeStep === 0} className="btn btn-outlined w-100" onClick={handleBack}>
						Previous Step
					</Button>

					{activeStep < steps.length - 1 ? (
						<Button variant="contained" className="btn btn-blue w-100" onClick={handleNext}>
							Continue
						</Button>
					) : (
						<Button variant="contained" className="btn btn-blue w-100" type="submit" color="primary">
							Submit Quote
						</Button>
					)}
				</Box>
			</Typography>
		</FormProvider>
	);
};

export default CreateNewQuoteStepper;
