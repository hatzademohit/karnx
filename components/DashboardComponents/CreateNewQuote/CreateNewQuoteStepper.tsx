import React, { useEffect, useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography, useTheme } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { AircraftFlightDetails, PricingDetails, AmenitiesDetails } from '@/components'
import { apiBaseUrl } from "@/karnx/api";
import { toast } from "react-toastify";
import useApiFunction from "@/karnx/Hooks/useApiFunction";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";
import dayjs from "dayjs";

const steps = ["Aircraft & Flight Details", "Pricing Details", "Amenities & Final Details"];

export interface CreateNewQuoteProps {
	inquiryId?: number;
}

const CreateNewQuoteStepper: React.FC<CreateNewQuoteProps> = () => {
	const [activeStep, setActiveStep] = useState(0);
	const theme = useTheme();
	const callApi = useApiFunction();
	const { setShowDetailsTabs, inquiryId, bookingDetails, quoteDetails, setQuoteDetails, setCreateNewQuote } = useInquiryDetails();

	const methods = useForm({
		shouldUnregister: false,
		mode: "onChange",
	});

	const {
		handleSubmit,
		trigger,
		reset,
		watch,
		formState: { isValid },
	} = methods;

	const onSubmit = async (data: any) => {
		if (!isValid) return;
		try {
			const res = await callApi({ method: 'POST', url: `${apiBaseUrl}/inquiry-quotes/submit-quote`, body: { ...data, inquiryId } });
			if (res?.status === true) {
				toast.success(res?.message || '');
				setShowDetailsTabs(false);
				setCreateNewQuote(false)
			} else {
				toast.error(res?.message || '');
			}
		} catch (e) {
			//toast.error('Network error while fetching cancellation policies');
		}
	};

	useEffect(() => {
		if (quoteDetails?.length >= 1 || quoteDetails?.length == undefined) return;
		reset({
			estimate: bookingDetails?.flight_time?.map((item) => ({
				departure_time: item?.departure_time ?? "",
				flight_details_id: item?.flight_details_id ?? "",
			}))
		});
	}, [bookingDetails])

	// for edit quote
	useEffect(() => {
		if (quoteDetails?.length <= 0) return;
		reset({
			aircraft_id: quoteDetails?.aircraft_id ?? "",
			base_fare: quoteDetails?.base_fare ?? "",
			fluel_cost: quoteDetails?.fluel_cost ?? "",
			taxes_fees: quoteDetails?.taxes_fees ?? "",
			crew_fees: quoteDetails?.crew_fees ?? "",
			handling_fees: quoteDetails?.handling_fees ?? "",
			catering_fees: quoteDetails?.catering_fees ?? "",
			total: quoteDetails?.total ?? 0,
			validate_till: quoteDetails?.validate_till ?? "",
			cancellation_policy_id: quoteDetails?.cancellation_policy_id ?? "",
			amenities_ids: Array.isArray(quoteDetails?.amenities_ids) ? quoteDetails.amenities_ids.map(Number)
				: quoteDetails?.amenities_ids != null ? String(quoteDetails.amenities_ids).split(",").map(Number) : [],
			special_offers_promotions: quoteDetails?.special_offers_promotions ?? "",
			additional_notes: quoteDetails?.additional_notes ?? "",
			estimate: quoteDetails?.inquiry_quote_flight_time?.map((item) => {
				const time_convert = dayjs().hour(Math.floor(item?.flight_duration / 60)).minute(item?.flight_duration % 60).second(0);;
				return ({
					departure_time: item?.departure_date_time ?? "",
					flight_details_id: item?.booking_inquiries_flight_location_id ?? "",
					estimated_flight_time: time_convert ?? ""
				})
			})
		});
	}, [reset, quoteDetails]);

	const handleNext = async () => {
		const formData = watch();
		setQuoteDetails(prev => ({ ...prev, ...formData }));
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
