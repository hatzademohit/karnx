"use client";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, IconButton, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { CustomDateTimePicker, SwapComp } from "@/components";
import { Controller } from "react-hook-form";
import { useStep } from "@/app/context/StepProvider";
import dayjs from "dayjs";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";

interface AppendDeleteTableProps {
	control: any;
	setValue: any;
	errors: any;
	watch?: any;
}

const AppendDeleteTable = ({ control, setValue, errors, watch }: AppendDeleteTableProps) => {
	const { airportCity } = useStep();

	const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map((airport) => ({
		label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
		id: airport.id,
		code: airport.code,
	}));

	const { fields, append, remove } = useFieldArray({
		control,
		name: "multiCity"
	});

	useEffect(() => {
		if (fields.length === 0) {
			append({ multiCityfrom: "", multiCityto: "", multiCitydepartureDate: "" });
			append({ multiCityfrom: "", multiCityto: "", multiCitydepartureDate: "" });
		}
	}, [fields]);

	const multiCity = watch("multiCity") || [];
	const lastIndex = fields.length - 1;

	const handleAddRow = () => {
		const multiCityto = watch(`multiCity[${lastIndex}].multiCityto`);
		append({ multiCityfrom: multiCityto, multiCityto: "", multiCitydepartureDate: "" });
	};

	return (
		<Box>
			<TableContainer className="table-append" sx={{ 'table tbody tr:not(:last-child) .remove-btn': { display: 'none' } }}>
				<Table size="small">
					<TableBody>
						{fields.map((item, index) => {
							const from = multiCity[index]?.multiCityfrom;
							const to = multiCity[index]?.multiCityto;
							const prevDate = multiCity[index - 1]?.multiCitydepartureDate;
							const minDate = prevDate ? dayjs(prevDate) : dayjs().add(1, "day").startOf("day");
							return (
								<TableRow key={item.id}>
									<TableCell colSpan={2}>
										{/* From-To using Controller */}
										<Controller
											name={`multiCity[${index}].multiCityfrom`}
											control={control}
											defaultValue=""
											render={({ field }) => (
												<Controller
													name={`multiCity[${index}].multiCityto`}
													control={control}
													defaultValue=""
													render={({ field: toField }) => {
														return (
															<SwapComp
																fromLabel={lastIndex === index ? 'Return From' : 'From'}
																fromOptions={airportOptions.filter((airport) => airport.id != to)}
																toOptions={airportOptions.filter((airport) => airport.id != from)}
																fromValue={airportOptions.find((airport) => airport.id == from) || ''}
																toValue={airportOptions.find((airport) => airport.id == to) || ''}
																onFromChange={(val: any) => {
																	setValue(`multiCity[${index}].multiCityfrom`, val?.id, { shouldValidate: true, shouldDirty: true });
																}}
																onToChange={(val: any) => {
																	setValue(`multiCity[${index}].multiCityto`, val?.id, { shouldValidate: true, shouldDirty: true });
																	if (lastIndex === index) {
																		setValue(`multiCityfromReturn`, val?.id, { shouldValidate: true, shouldDirty: true });
																	} else {
																		setValue(`multiCity[${index + 1}].multiCityfrom`, val?.id, { shouldValidate: true, shouldDirty: true });
																	}
																}}
																// onSwap={(from: any, to: any) => {
																//   setValue(`multiCity[${index}].multiCityfrom`, from?.id, { shouldValidate: true, shouldDirty: true });
																//   setValue(`multiCity[${index}].multiCityto`, to?.id, { shouldValidate: true, shouldDirty: true });
																// }}
																fromError={!!errors?.multiCity?.[index]?.multiCityfrom}
																fromHelpertext={errors?.multiCity?.[index]?.multiCityfrom?.message}
																toError={!!errors?.multiCity?.[index]?.multiCityto}
																toHelpertext={errors?.multiCity?.[index]?.multiCityto?.message}
																swapButtonDisabled={true}
															/>
														)
													}}
												/>
											)}
										/>
									</TableCell>

									<TableCell>
										{/* Date using Controller */}
										<Controller
											name={`multiCity[${index}].multiCitydepartureDate`}
											control={control}
											defaultValue={null}
											render={({ field }) => (
												<CustomDateTimePicker
													datatimelabel="Departure Date & Time"
													required={true}
													withClock
													value={field.value ? dayjs(field.value) : null}
													onChange={(val: any) => field.onChange(val)}
													error={!!errors?.multiCity?.[index]?.multiCitydepartureDate}
													helperText={errors?.multiCity?.[index]?.multiCitydepartureDate?.message}
													minDateTime={minDate}
												/>
											)}
										/>
									</TableCell>

									<TableCell align="center" sx={{ position: 'relative' }}>
										{fields.length > 2 && <Box className='remove-btn' sx={{ position: 'absolute', top: '35px' }}>
											<IconButton onClick={() => remove(index)}>
												<ClearRoundedIcon />
											</IconButton>
										</Box>}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>

			<Button
				variant="contained"
				startIcon={<Add />}
				onClick={() => handleAddRow()}
				className="btn btn-blue"
				sx={{ mt: "14px" }}
			>
				Add Stop
			</Button>
		</Box>
	);
};

export default AppendDeleteTable;
