import React, { useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableRow, TableCell, Divider, TableHead, Grid, Card, CardContent, useTheme, InputLabel, FormControl, TextField } from "@mui/material";
import CustomModal from "../CustomModal";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { useForm } from "react-hook-form";
import { CustomTextField } from "../CustomTextField/CustomTextField";

interface RejectionFormData {
	message: string;
}
interface PriceFormData {
  commissionPercentage: string;
}
const QuoteTabs = () => {

	const theme = useTheme();

	const [quotes, setQuotes] = useState([
		{
			id: 1,
			name: "Platinum Jets International",
			rating: 4.8,
			aircraft: "Bombardier Global 7500",
			aircraftInfo: "2021 • 19 seats",
			price: "1,00,00,000",
			validity: "Valid until 31-Aug-2025",
			flightTime: "8h 30m",
			returnTime: "8h 45m",
			baseFare: "75,00,000",
			fuel: "16,00,000",
			taxes: "8,00,000",
			catering: "1,00,000",
			keyAmenities: "Four living spaces, Full kitchen, Master suite, Shower, Ka-band Wi-Fi",
			includedService: "Gourmet catering, Ground handling, Flight planning, Crew accommodation, Ground transportation",
			image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1186",
		},
		{
			id: 2,
			name: "Elite Aviation Services",
			rating: 3.7,
			aircraft: "Gulfstream G650",
			aircraftInfo: "2019 • 14 seats",
			price: "1,10,00,000",
			validity: "Valid until 05-Sept-2025",
			flightTime: "8h 30m",
			returnTime: "8h 45m",
			baseFare: "83,00,000",
			fuel: "17,00,000",
			taxes: "9,00,000",
			catering: "1,00,000",
			keyAmenities:
				"Full galley, Private bedroom, Conference area, Satellite phone, High-speed Wi-Fi",
			includedService:
				"Catering, Ground handling, Flight planning, Crew accommodation",
			image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1186",
		},
		{
			id: 3,
			name: "JetSet Experience",
			rating: 4.9,
			aircraft: "Dassault Falcon 8X",
			aircraftInfo: "2022 • 12 seats",
			price: "1,04,00,000",
			validity: "Valid until 20-Mar-2026",
			flightTime: "6h 30m",
			returnTime: "6h 35m",
			baseFare: "95,00,000",
			fuel: "25,00,000",
			taxes: "10,00,000",
			catering: "2,00,000",
			keyAmenities:
				"Luxury interior, High-speed internet, Foldable table, Private bathroom",
			includedService:
				"Gourmet service, Exclusive travel itineraries, Concierge service",
			image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1186",
		},
		{
			id: 4,
			name: "JetSet Experience",
			rating: 4.9,
			aircraft: "Dassault Falcon 8X",
			aircraftInfo: "2022 • 12 seats",
			price: "1,04,00,000",
			validity: "Valid until 20-Mar-2026",
			flightTime: "6h 30m",
			returnTime: "6h 35m",
			baseFare: "95,00,000",
			fuel: "25,00,000",
			taxes: "10,00,000",
			catering: "2,00,000",
			keyAmenities: "Luxury interior, High-speed internet, Foldable table, Private bathroom",
			includedService: "Gourmet service, Exclusive travel itineraries, Concierge service",
			image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1186",
		},
		{
			id: 5,
			name: "JetSet Experience",
			rating: 4.9,
			aircraft: "Dassault Falcon 8X",
			aircraftInfo: "2022 • 12 seats",
			price: "1,04,00,000",
			validity: "Valid until 20-Mar-2026",
			flightTime: "6h 30m",
			returnTime: "6h 35m",
			baseFare: "95,00,000",
			fuel: "25,00,000",
			taxes: "10,00,000",
			catering: "2,00,000",
			keyAmenities:
				"Luxury interior, High-speed internet, Foldable table, Private bathroom",
			includedService:
				"Gourmet service, Exclusive travel itineraries, Concierge service",
			image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1186",
		},
		{
			id: 6,
			name: "JetSet Experience",
			rating: 4.9,
			aircraft: "Dassault Falcon 8X",
			aircraftInfo: "2022 • 12 seats",
			price: "1,04,00,000",
			validity: "Valid until 20-Mar-2026",
			flightTime: "6h 30m",
			returnTime: "6h 35m",
			baseFare: "95,00,000",
			fuel: "25,00,000",
			taxes: "10,00,000",
			catering: "2,00,000",
			keyAmenities:
				"Luxury interior, High-speed internet, Foldable table, Private bathroom",
			includedService:
				"Gourmet service, Exclusive travel itineraries, Concierge service",
			image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1186",
		},
	]);

	const [viewQuoteDetails, setViewQuoteDetails] = useState<boolean>(false);
	const [acceptedQuoteId, setAcceptedQuoteId] = useState<Number>(null);
	const [viewedQuote, setViewedQuote] = useState<any>({
		id: 3,
		departure: '08:30 - 17:00',
		return: '09:30 - 18:15',
		flightTime: "6h 30m",
		returnTime: "6h 35m",
		model: 'Dassault Falcon 8X',
		validityInYear: '2025',
		capacity: '19 Seats',
		range: '6,450 nm',
		speed: 'Mach 0.90',
		baseFire: "95,00,000",
		fule: "25,00,000",
		taxes: "10,00,000",
		fees: '2,00,000',
		catering: '1,00,000',
		AdditionalServices: '45,000',
		aircraftAmenities: ['Wi-Fi', 'In-seat power', 'Entertainment system', 'Conference area'],
		includedServices: ['Gourmet service', 'Exclusive travel itineraries', 'Concierge service'],
	});
	const [rejectionModal, setRejectionModal] = useState<boolean>(false);
	const [travelAgentModal, setTravelAgentModal] = useState<boolean>(false);

	const openQuoteDetails = (quote: any) => {
		// setViewedQuote(quote);
		setViewQuoteDetails(true);
	};

	const acceptQuote = (id) => {
		setAcceptedQuoteId(id);
	}

	const rejectQuote = (id) => {
		console.log('Reject quote id:' + id);
	}

	const quoteSendToTravelAgent = () => {
		setTravelAgentModal(true);
	}

	const { register, handleSubmit, formState: { errors }, reset } = useForm<RejectionFormData>({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit = (data: RejectionFormData) => {
		console.log("Form Submitted:", data);
		setRejectionModal(false);
		reset();
	};

	const handleClose = () => {
		setRejectionModal(false);
		reset();
	};

	const {
		register: travelAgentRegister,
		handleSubmit: travelAgentHandleSubmit,
		formState: { errors: travelAgentErrors },
		reset: travelAgentReset,
	} = useForm<PriceFormData>({
		defaultValues: {
		commissionPercentage: "",
		},
	});

  const travelAgentSubmit = (data: PriceFormData) => {
    console.log("Submitted Data:", data);
    console.log("Quote ID:", viewedQuote?.id);
    // TODO: add API call or business logic here
  };

  const handleCancel = () => {
    console.log("Cancelled quote id:", viewedQuote?.id);
    travelAgentReset();
  };

	const renderRow = (label: string, key: keyof typeof quotes[0], isRich?: boolean) => (
		<TableRow>
			<TableCell sx={{ position: 'sticky', left: 0, backgroundColor: '#fafafa', zIndex: 1 }}>
				<Typography variant="h5" >{label}</Typography>
			</TableCell>
			{quotes.map((q) => {
				const isDisabled = acceptedQuoteId !== null && acceptedQuoteId !== q.id;
				return (
					<TableCell key={q.id} sx={{ verticalAlign: "top" }} data-disabled={isDisabled}>
						{label == 'Aircraft' ?
							<>
								<Typography color="text.secondary">
									{q[key]}
								</Typography>
								<Typography color="text.secondary" fontSize={12}>
									{q.aircraftInfo}
								</Typography>
							</> :
							label == 'Price' ?
								<>
									<Typography color="text.secondary">
										{q[key]}
									</Typography>
									<Typography color="#BC0019" fontSize={12}>
										{q.validity}
									</Typography>
								</> :
							label == 'Flight Time' ?
								<>
									<Typography color="text.secondary">
										{q[key]}
									</Typography>
									<Typography color="text.secondary" fontSize={12}>
										Return: {q.returnTime}
									</Typography>
									{isDisabled && 
										<Box className="submit-rejection-reason">
											<Button sx={{ width: '220px' }} onClick={() => setRejectionModal(true)} className="btn btn-danger">Submit Rejection Reason</Button>
										</Box>
									}
								</> :
							<Typography
								variant="body2"
								sx={{
									whiteSpace: "pre-line",
									color: isRich ? "text.secondary" : "text.primary",
									fontWeight: isRich ? 400 : 500,
								}}
							>
								{q[key]}
							</Typography>
						}
					</TableCell>
			)})}
		</TableRow>
	);

	return (
		<>
			{/* Header */}
			<Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
				<Box>
					<Typography variant="h4">
						Quote Comparison
					</Typography>
					<Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
						3 quotes received for this inquiry
					</Typography>
				</Box>
				<Typography variant="body2" sx={{ color: "green", fontWeight: 600 }}>
					Best Quote Price: 1,00,00,000
				</Typography>
			</Box>
			<Divider sx={{ my: 2 }} />
			{/* Table */}
			<Box sx={{ overflowX: "auto" }} className="quote-comparison-table">
				<Table sx={{ borderCollapse: 'separate', '& .MuiTableCell-root': { border: '1px solid #eeeeee', textAlign: 'center' } }}>
					<TableHead>
						<TableRow sx={{ '& th': { borderColor: '#eee' } }}>
							<TableCell sx={{ position: 'sticky', left: 0, backgroundColor: '#fafafa', zIndex: 1 }}>
								<Typography variant="h4">
									Specifications
								</Typography>
							</TableCell>
							{quotes.map((quote) => {
								const isDisabled = acceptedQuoteId !== null && acceptedQuoteId !== quote.id;
								return (
								<TableCell key={quote.id} data-disabled={isDisabled}>
									<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
										<img src={quote.image} alt={quote.name} style={{ maxWidth: '300px', height: 'auto' }} />
										<Typography variant="h4">
											{quote.name}
										</Typography>
										<Button className="btn btn-blue w-100" onClick={() => openQuoteDetails(quote)} disabled={isDisabled}>
											View Details
										</Button>
									</Box>
								</TableCell>
							)})}
						</TableRow>
					</TableHead>
					<TableBody>
						{renderRow("Rating", "rating")}
						{renderRow("Aircraft", "aircraft")}
						{renderRow("Price", "price")}
						{renderRow("Flight Time", "flightTime")}
						{renderRow("Base Fare", "baseFare")}
						{renderRow("Fuel", "fuel")}
						{renderRow("Taxes & Fees", "taxes")}
						{renderRow("Catering", "catering")}
						{renderRow("Key Amenities", "keyAmenities", true)}
						{renderRow("Included Service", "includedService", true)}
						<TableRow>
							<TableCell sx={{ backgroundColor: "#fafafa", borderRight: "1px solid #eee", position: 'sticky', left: 0, zIndex: 1 }}>
								<Typography variant="h5">Select</Typography>
							</TableCell>
							{quotes.map((q) => {
								const isAccepted = acceptedQuoteId === q.id;
								const isDisabled = acceptedQuoteId !== null && acceptedQuoteId !== q.id;
								return (
									<TableCell key={q.id} data-disabled={isDisabled}>
										<Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
											<Button className="btn btn-blue w-100" disabled={isDisabled} onClick={() => acceptQuote(q.id)}>
												{isAccepted ? "Quote Accepted" : "Accept Quote"}
											</Button>
											{!isAccepted && (
												<Button className="btn btn-danger w-100" onClick={ () => rejectQuote(q.id)} disabled={isDisabled}>
													Reject Quote
												</Button>
											)}
										</Box>
									</TableCell>
								);
							})}
						</TableRow>
					</TableBody>
				</Table>
			</Box>
			<Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
				<Button variant="outlined" className="btn btn-outlined">
					Close
				</Button>
				<Button className="btn btn-blue" onClick={() => quoteSendToTravelAgent()}>
					Send To Travel Agent
				</Button>
			</Box>

			{/* Quote Details Modal */}
			<CustomModal headerText='Quote Details' open={viewQuoteDetails} setOpen={setViewQuoteDetails} dataClose={() => setViewQuoteDetails(false)} className="modal-lg">
				<Grid container spacing={2}>
					{/* Flight Details */}
					<Grid size={{ xs: 12, md: 6 }}>
						<Card elevation={2}>
							<CardContent>
								<Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>
									Flight Details
								</Typography>

								<Grid container spacing={2}>
									<Grid size={{ xs: 6 }}>
										<Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
											<FlightTakeoffIcon />
											<Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>Departure:</Typography>
											<Typography variant="h5">{viewedQuote.departure}</Typography>
											<Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'poppins-lt' }}>
												Duration: {viewedQuote.flightTime}
											</Typography>
										</Box>
									</Grid>

									<Grid size={{ xs: 6 }}>
										<Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
											<FlightLandIcon />
											<Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>Return:</Typography>
											<Typography variant="h5">{viewedQuote.return}</Typography>
											<Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'poppins-lt' }}>
												Duration: {viewedQuote.returnTime}
											</Typography>
										</Box>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>

					{/* Aircraft Specifications */}
					<Grid size={{ xs: 12, md: 6 }}>
						<Card elevation={2}>
							<CardContent>
								<Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>
									Aircraft Specifications
								</Typography>
								<Box sx={{ display: "flex", flexDirection: "column", gap: '5px' }}>
									<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
										<Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
											Model:
										</Typography>
										<Typography variant="h6">{viewedQuote.model}</Typography>
									</Box>
									<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
										<Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
											Year:
										</Typography>
										<Typography variant="h6">{viewedQuote.validityInYear}</Typography>
									</Box>
									<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
										<Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
											Capacity:
										</Typography>
										<Typography variant="h6">{viewedQuote.capacity}</Typography>
									</Box>
									<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
										<Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
											Range:
										</Typography>
										<Typography variant="h6">{viewedQuote.range}</Typography>
									</Box>
									<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
										<Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
											Speed:
										</Typography>
										<Typography variant="h6">{viewedQuote.speed}</Typography>
									</Box>
								</Box>
							</CardContent>
						</Card>
					</Grid>

					{/* Price Breakdown */}
					<Grid size={{ xs: 12, md: 6 }}>
						<Card elevation={2}>
							<CardContent>
								<Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>
									Price Breakdown
								</Typography>

								{[
									["Base Fare:", viewedQuote.baseFire],
									["Fuel Surcharge:", viewedQuote.fule],
									["Taxes:", viewedQuote.taxes],
									["Fees:", viewedQuote.fees],
									["Catering:", viewedQuote.catering],
									["Additional Services:", viewedQuote.AdditionalServices],
								].map(([label, value]) => (
									<Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: '5px', }}>
										<Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
											{label}
										</Typography>
										<Typography variant="h6">{value}</Typography>
									</Box>
								))}

								<Divider sx={{ my: 1 }} />

								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Typography variant="h6">Total</Typography>
									<Typography variant="h6"> 1,00,45,000 </Typography>
								</Box>
							</CardContent>
						</Card>
					</Grid>

					{/* Amenities & Services */}
					<Grid size={{ xs: 12, md: 6 }}>
						<Card elevation={2}>
							<CardContent>
								<Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>
									Amenities & Services
								</Typography>

								<Typography variant="h6" sx={{ mb: 1 }}>
									Aircraft Amenities
								</Typography>
								<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
									{viewedQuote?.aircraftAmenities.map((airCraft) => (
										<Typography key={airCraft} component="span" className="custom-pill" sx={{ backgroundColor: '#DCFCE7' }}>{airCraft}</Typography>
									))}
								</Box>

								<Typography variant="h6" sx={{ mb: 1 }}>
									Included Services
								</Typography>
								<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
									{viewedQuote.includedServices.map((services) => (
										<Typography key={services} component="span" className="custom-pill" sx={{ backgroundColor: '#FEF3C7' }}>{services}</Typography>
									))}
								</Box>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
				<Box className="modal-footer" sx={{ pb: '10px', mt: '10px', display: 'flex', justifyContent: 'flex-end', gap: 2, '& .btn': { maxWidth: '200px', width: '100%' } }}>
					<Button className="btn btn-blue" onClick={ () => console.log('quote id:' + viewedQuote?.id)}>Accept Quote</Button>
					<Button className="btn btn-danger" onClick={ () => console.log('quote id:' + viewedQuote?.id)}>Reject Quote</Button>
				</Box>
			</CustomModal>
			
			{/* Rejection Reason Modal */}
			<CustomModal headerText='Rejection Reason' open={rejectionModal} setOpen={setRejectionModal} dataClose={() => setRejectionModal(false)}>
				<Typography component="form" onSubmit={handleSubmit(onSubmit)}>
					<InputLabel sx={{fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333'}} required={true}>Massage</InputLabel>
					<FormControl fullWidth>
						<TextField
							size="small"
							multiline
							minRows={4}
							{...register("message", {
							required: "Message is required",
							minLength: {
								value: 5,
								message: "Message must be at least 5 characters",
							},
							})}
							error={!!errors.message}
							helperText={errors.message?.message}
						/>
					</FormControl>
					<Box className="modal-footer" sx={{ pb: '10px', mt: '10px', display: 'flex', justifyContent: 'flex-end', gap: 2, '& .btn': { maxWidth: '150px', width: '100%' } }}>
						<Button className="btn btn-outlined" onClick={handleClose}>Cancel</Button>
						<Button className="btn btn-blue" type="submit">Send</Button>
					</Box>
				</Typography>
			</CustomModal>

			{/* Send to travel agent modal */}
			<CustomModal headerText='Sent To Travel Agent' open={travelAgentModal} setOpen={setTravelAgentModal} dataClose={() => setTravelAgentModal(false)}>
				<Typography component="form" onSubmit={travelAgentHandleSubmit(travelAgentSubmit)}>
					<CustomTextField
						inputLabel={<>Commission Percentage <Typography component='span' sx={{color: theme?.common?.redColor}}>*</Typography></>}
						placeholder="Add your Commission Percentage"
						size="large"
						type="number"
						error={!!travelAgentErrors.commissionPercentage}
						helperText={travelAgentErrors.commissionPercentage?.message}
						{...travelAgentRegister("commissionPercentage", {
						required: "Commission percentage is required",
						pattern: {
							value: /^[0-9]+(\.[0-9]{1,2})?$/,
							message: "Enter a valid number (e.g. 5 or 10.5)",
						},
						validate: (value) =>
							Number(value) >= 0 && Number(value) <= 100
							? true
							: "Percentage must be between 0 and 100",
						})}
					/>
					<Card elevation={2} sx={{ mt: 2 }}>
						<CardContent>
							<Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>
								Price Breakdown
							</Typography>

							{[
								["Base Fare:", viewedQuote.baseFire],
								["Fuel Surcharge:", viewedQuote.fule],
								["Taxes:", viewedQuote.taxes],
								["Fees:", viewedQuote.fees],
								["Catering:", viewedQuote.catering],
								["Additional Services:", viewedQuote.AdditionalServices],
							].map(([label, value]) => (
								<Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: '5px', }}>
									<Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
										{label}
									</Typography>
									<Typography variant="h6">{value}</Typography>
								</Box>
							))}

							<Divider sx={{ my: 1 }} />

							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography variant="h6">Total</Typography>
								<Typography variant="h6"> 1,00,45,000 </Typography>
							</Box>
						</CardContent>
					</Card>
					<Divider sx={{ my: 2 }} />
					<Box className="modal-footer" sx={{ pb: '10px', mt: '10px', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
						<Button className="btn btn-outlined" onClick={handleCancel}>Cancel</Button>
						<Button className="btn btn-blue" type="submit">Send</Button>
					</Box>
				</Typography>

			</CustomModal>
		</>
	);
};

export default QuoteTabs;
