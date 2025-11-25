import React from "react";
import { Box, Typography, Card, CardContent, Grid, useTheme, FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { CustomDateTimePicker, CustomTimePicker } from "@/components"
import dayjs from "dayjs";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";

const AircraftFlightDetails = (editedData) => {
	const { control, watch, formState: { errors } } = useFormContext();
	const selectedAircraft = watch("aircraft");
	const theme = useTheme();
	const { aircraftList } = useInquiryDetails();

	return (
		<Box>
			<Typography variant="h4" color={theme?.common.redColor} mb={2}>
				Choose Aircraft from Your Fleet *
				{errors.aircraft && (
					<FormHelperText error>
						{errors.aircraft.message as string}
					</FormHelperText>
				)}
			</Typography>
			<Grid container spacing={{ md: 2, xs: 1 }}>
				<Controller
					name="aircraft"
					control={control}
					rules={{ required: "Please select an aircraft" }}
					render={({ field }) => (
						<>
							{aircraftList.length > 0 && aircraftList.map((aircraft) => (
								<Grid size={{ lg: 4, md: 6, sm: 12, xs: 12 }} key={aircraft.asset_name}>
									<Card onClick={() => field.onChange(aircraft.id)}
										sx={{ cursor: "pointer", border: selectedAircraft === aircraft.id ? `1px solid #BC0019` : "1px solid #eeeeee", borderRadius: 3 }}>
										<CardContent sx={{ p: `16px !important` }}>
											<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
												<Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
													<Typography variant="h5" color={theme?.common.blueColor}>{aircraft.asset_name}</Typography>
													<Typography variant="body2">{aircraft?.aircraft_type?.name}</Typography>
												</Box>
												<Typography variant="body2">{aircraft.model_year}</Typography>
											</Box>
											<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mt: 2 }}>
												<Box>
													<Typography variant="body2">Seats</Typography>
													<Typography variant="h6">{aircraft?.capacity}</Typography>
												</Box>
												<Box>
													<Typography variant="body2">Range</Typography>
													<Typography variant="h6">{aircraft?.flying_range != null ? aircraft?.flying_range.toLocaleString("en-IN") : 0} nm</Typography>
												</Box>
												<Box>
													<Typography variant="body2">Speed</Typography>
													<Typography variant="h6">Mach {aircraft?.speed}</Typography>
												</Box>
											</Box>
										</CardContent>
									</Card>
								</Grid>
							))}
						</>
					)}
				/>
				{/* one way trip */}
				<Grid size={{ xs: 12 }}>
					<Controller
						name="estimatedFlightTime"
						control={control}
						rules={{ required: "Estimated flight time is required" }}
						render={({ field, fieldState }) => (
							<CustomTimePicker
								{...field}
								value={field.value ? dayjs(field.value) : null}
								onChange={(newValue) => field.onChange(newValue)}
								timelabel="Estimate Flight Time"
								asterisk
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
							/>
						)}
					/>
				</Grid>
				{/* for multi and round trip */}
				<Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
					<Controller
						name="estimatedDepartureDate"
						control={control}
						rules={{ required: "Estimated departure date & time is required" }}
						render={({ field, fieldState }) => (
							<CustomDateTimePicker
								{...field}
								value={field.value ? dayjs(field.value) : null}
								datatimelabel="Departure Date & Time"
								withClock
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
								minDateTime={dayjs().add(1, 'day').startOf('day')}
							/>
						)}
					/>
				</Grid>
				<Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
					<Controller
						name="estimatedReturnDate"
						control={control}
						rules={{ required: "Estimated return date & time is required" }}
						render={({ field, fieldState }) => (
							<CustomDateTimePicker
								{...field}
								value={field.value ? dayjs(field.value) : null}
								datatimelabel="Return Date & Time"
								withClock
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
								minDateTime={dayjs().add(1, 'day').startOf('day')}
							/>
						)}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AircraftFlightDetails;
