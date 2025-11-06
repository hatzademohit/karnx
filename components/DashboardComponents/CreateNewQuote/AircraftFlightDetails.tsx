import React from "react";
import { Box, Typography, Card, CardContent, Grid, useTheme, FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { CustomTimePicker } from "@/components"
import dayjs from "dayjs";

const aircrafts = [
	{ name: "Gulfstream G650", year: 2019, desc: 'Ultra Long Range', seats: 14, range: "7,000 nm", speed: 'Mach 0.925' },
	{ name: "Bombardier Global 7500", year: 2021, desc: 'Ultra Long Range', seats: 14, range: "7,000 nm", speed: 'Mach 0.925' },
	{ name: "Cessna Citation X+", year: 2018, desc: 'Ultra Long Range', seats: 14, range: "7,000 nm", speed: 'Mach 0.925' },
	{ name: "Embraer Phenom 300E", year: 2020, desc: 'Ultra Long Range', seats: 14, range: "7,000 nm", speed: 'Mach 0.925' },
];

const AircraftFlightDetails = () => {
	const { control, watch, formState: { errors } } = useFormContext();
	const selectedAircraft = watch("aircraft");
	const theme = useTheme();

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
							{aircrafts.map((aircraft) => (
								<Grid size={{ lg: 4, md: 6, sm: 12, xs: 12 }} key={aircraft.name}>
									<Card onClick={() => field.onChange(aircraft.name)}
										sx={{ cursor: "pointer", border: selectedAircraft === aircraft.name ? `1px solid #BC0019` : "1px solid #eeeeee", borderRadius: 3 }}>
										<CardContent sx={{ p: `16px !important` }}>
											<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
												<Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
													<Typography variant="h5" color={theme?.common.blueColor}>{aircraft.name}</Typography>
													<Typography variant="body2">{aircraft.desc}</Typography>
												</Box>
												<Typography variant="body2">{aircraft.year}</Typography>
											</Box>
											<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mt: 2 }}>
												<Box>
													<Typography variant="body2">Seats</Typography>
													<Typography variant="h6">{aircraft?.seats}</Typography>
												</Box>
												<Box>
													<Typography variant="body2">Range</Typography>
													<Typography variant="h6">{aircraft?.range}</Typography>
												</Box>
												<Box>
													<Typography variant="body2">Speed</Typography>
													<Typography variant="h6">{aircraft?.speed}</Typography>
												</Box>
											</Box>
										</CardContent>
									</Card>
								</Grid>
							))}
						</>
					)}
				/>
			</Grid>

			<Box mt={{ md: 3, xs: 2 }}>
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
			</Box>
		</Box>
	);
};

export default AircraftFlightDetails;
