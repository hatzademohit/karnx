import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid, useTheme, FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { CustomTimePicker } from "@/components"
import dayjs from "dayjs";
import useApiFunction from "@/karnx/Hooks/useApiFunction";
import { useAuth } from "@/app/context/AuthContext";
import { apiBaseUrl } from "@/karnx/api";
import { toast } from "react-toastify";

const AircraftFlightDetails = (editedData) => {
	const { control, watch, formState: { errors } } = useFormContext();
	const selectedAircraft = watch("aircraft");
	const theme = useTheme();
	const callApi = useApiFunction();
	const { user } = useAuth();
	//console.log(editedData, selectedAircraft);
	const [aircraftList, setAircraftList] = useState<any>([]);
	const getAircrafts = async () => {
		try {
			const res = await callApi({ method: 'GET', url: `${apiBaseUrl}/inquiry-quotes/get-aircraft` });
			if (res?.status === true) {
				setAircraftList(res.data);
			} else {
				toast.error(res?.message || '');
			}
		} catch (e) {
			//toast.error('Network error while fetching aircraft');
		}
	};

	useEffect(() => {
		getAircrafts();
		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, []);

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
													<Typography variant="h6">{aircraft?.flying_range.toLocaleString("en-IN")} nm</Typography>
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
