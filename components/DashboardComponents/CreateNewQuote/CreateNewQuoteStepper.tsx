import React, { useEffect, useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography, useTheme } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { AircraftFlightDetails, PricingDetails, AmenitiesDetails } from '@/components'
import { apiBaseUrl } from "@/karnx/api";
import { toast } from "react-toastify";
import useApiFunction from "@/karnx/Hooks/useApiFunction";
import { useRouter } from "next/navigation";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";

const steps = ["Aircraft & Flight Details", "Pricing Details", "Amenities & Final Details"];

export interface CreateNewQuoteProps {
	inquiryId?: number;
}
//const CreateNewQuoteStepper = (inquiryId) => {
const CreateNewQuoteStepper: React.FC<CreateNewQuoteProps> = ({ inquiryId }) => {
	const [activeStep, setActiveStep] = useState(0);
	const router = useRouter();
	const theme = useTheme();
	const callApi = useApiFunction();
	const [quoteDetails, setQuoteDetails] = useState<any>([]);
	const { setShowDetailsTabs, showDetailsTabs } = useInquiryDetails()
	const getQuoteDetails = async () => {
		try {
			const res = await callApi({ method: 'GET', url: `${apiBaseUrl}/inquiry-quotes/edit-quote/${inquiryId}` });
			if (res?.status === true) {
				setQuoteDetails(res.data);
			} else {
				toast.error(res?.message || '');
			}
		} catch (e) {
			toast.error('Network error while fetching cancellation policies');
		}
	};

	useEffect(() => {
		getQuoteDetails();
	}, [inquiryId]);

	const methods = useForm({
		mode: "onChange",
	});

	const {
		handleSubmit,
		trigger,
		reset,
		formState: { isValid },
	} = methods;

	const onSubmit = async (data: any) => {
		if (!isValid) return;
		try {
			const res = await callApi({ method: 'POST', url: `${apiBaseUrl}/inquiry-quotes/submit-quote`, body: { ...data, inquiryId } });
			if (res?.status === true) {
				toast.success(res?.message || '');
				setShowDetailsTabs(false)
			} else {
				toast.error(res?.message || '');
			}
		} catch (e) {
			//toast.error('Network error while fetching cancellation policies');
		}
	};

	useEffect(() => (
		reset({
			aircraft: quoteDetails?.aircraft_id ?? "",
			estimatedFlightTime: quoteDetails?.estimated_flight_time ?? "",
			baseFare: quoteDetails?.base_fare ?? "",
			fuel: quoteDetails?.fluel_cost ?? "",
			taxes: quoteDetails?.taxes_fees ?? "",
			crewFees: quoteDetails?.crew_fees ?? "",
			handlingFees: quoteDetails?.handling_fees ?? "",
			catering: quoteDetails?.catering_fees ?? "",
			totalAmount: quoteDetails?.total ?? 0,
			quoteValidUntil: quoteDetails?.validate_till ?? "",
			cancellationPolicy: quoteDetails?.cancellation_policy_id ?? "",
			amenities: quoteDetails?.amenities_ids ? quoteDetails.amenities_ids.split(",").map(Number) : [],
			specialOffers: quoteDetails?.special_offers_promotions ?? "",
			addtionalNotes: quoteDetails?.additional_notes ?? "",
		})
	), [reset, quoteDetails])

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
					{activeStep === 0 && <AircraftFlightDetails editedData={quoteDetails} />}
					{activeStep === 1 && <PricingDetails editedData={quoteDetails} />}
					{activeStep === 2 && <AmenitiesDetails editedData={quoteDetails} />}
				</Box>

				<Box display="flex" justifyContent="space-between" gap={2}>
					<Button variant="outlined" disabled={activeStep === 0} className="btn btn-outlined w-100" onClick={handleBack}>
						Previous Step
					</Button>

					{activeStep < steps.length ? (
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
