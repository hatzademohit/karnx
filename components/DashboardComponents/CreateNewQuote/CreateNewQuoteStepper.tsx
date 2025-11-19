import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography, useTheme } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { AircraftFlightDetails, PricingDetails, AmenitiesDetails } from '@/components'
import { apiBaseUrl } from "@/karnx/api";
import { toast } from "react-toastify";
import useApiFunction from "@/karnx/Hooks/useApiFunction";

const steps = ["Aircraft & Flight Details", "Pricing Details", "Amenities & Final Details"];

export interface CreateNewQuoteProps {
	inquiryId?: number;
}
//const CreateNewQuoteStepper = (inquiryId) => {
const CreateNewQuoteStepper: React.FC<CreateNewQuoteProps> = ({ inquiryId }) => {
	const [activeStep, setActiveStep] = useState(0);
	const theme = useTheme();
	const callApi = useApiFunction();

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
			totalAmount: 0,
			quoteValidUntil: "",
			cancellationPolicy: "",
			amenities: [],
			specialOffers: "",
			addtionalNotes: "",
		},
	});

	const {
		handleSubmit,
		trigger,
		formState: { isValid },
	} = methods;

	const onSubmit = async (data: any) => {
		//console.log("Final Data:", data);
		try {
			const res = await callApi({ method: 'POST', url: `${apiBaseUrl}/inquiry-quotes/submit-quote`, body: { ...data, inquiryId } });
			if (res?.status === true) {
				toast.success(res?.message || '');
			} else {
				toast.error(res?.message || '');
			}
		} catch (e) {
			toast.error('Network error while fetching cancellation policies');
		}
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

				<Box sx={{ mb: 3, border: `1px solid ${theme?.common.borderColor}`, p: { md: 3, xs: '10px' } }}>
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
