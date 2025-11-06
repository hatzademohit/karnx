"use client";
import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { CustomDateTimePicker, SwapComp } from "@/components";
import { Controller } from "react-hook-form";
import { useStep } from "@/app/context/StepProvider";
import dayjs from "dayjs";

interface AppendDeleteTableProps {
  control: any;
  setValue: any;
  errors: any;
}

const AppendDeleteTable = ({ control, setValue, errors }: AppendDeleteTableProps) => {
  const [rows, setRows] = useState<number[]>([1, 2]); // Just store row IDs
  const { airportCity } = useStep();

  const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map((airport) => ({
    label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
    id: airport.id,
    code: airport.code,
  }));

  // Add new row
  const handleAddRow = () => setRows((prev) => [...prev, Date.now()]);

  // Delete row
  const handleDeleteRow = (id: number) => setRows((prev) => prev.filter((r) => r !== id));

  return (
    <Box>
      <TableContainer className="table-append">
        <Table size="small">
          <TableBody>
            {rows.map((rowId, index) => (
              <TableRow key={rowId}>
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
                        render={({ field: toField }) => (
                          <SwapComp
                            options={airportOptions}
                            fromValue={airportOptions.find((airport) => airport.id === field.value)?.code || ''}
                            toValue={airportOptions.find((airport) => airport.id === toField.value)?.code || ''}
                            onFromChange={(val: any) => {
                              setValue(`multiCity[${index}].multiCityfrom`, val?.id, { shouldValidate: true, shouldDirty: true });
                            }}
                            onToChange={(val: any) =>
                              setValue(`multiCity[${index}].multiCityto`, val?.id, { shouldValidate: true, shouldDirty: true })
                            }
                            onSwap={(from, to) => {
                              setValue(`multiCity[${index}].multiCityfrom`, from);
                              setValue(`multiCity[${index}].multiCityto`, to);
                            }}
                            fromError={!!errors?.multiCity?.[index]?.multiCityfrom}
                            fromHelpertext={errors?.multiCity?.[index]?.multiCityfrom?.message}
                            toError={!!errors?.multiCity?.[index]?.multiCityto}
                            toHelpertext={errors?.multiCity?.[index]?.multiCityto?.message}
                          />
                        )}
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
                      />
                    )}
                  />
                </TableCell>

                <TableCell align="center" sx={{ position: 'relative' }}>
                  <Box sx={{ position: 'absolute', top: '35px' }}>
                    <IconButton onClick={() => handleDeleteRow(rowId)}>
                      <ClearRoundedIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}>
                {/* From-To using Controller */}
                <Controller
                  name="multiCityfromReturn"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Controller
                      name="multiCitytoReturn"
                      control={control}
                      defaultValue=""
                      render={({ field: toField }) => (
                        <SwapComp
                          options={airportOptions}
                          fromValue={airportOptions.find((airport) => airport.id === field.value)?.code || ''}
                          toValue={airportOptions.find((airport) => airport.id === toField.value)?.code || ''}
                          onFromChange={(val: any) => {
                            setValue("multiCityfromReturn", val?.id, { shouldValidate: true, shouldDirty: true });
                          }}
                          onToChange={(val: any) =>
                            setValue("multiCitytoReturn", val?.id, { shouldValidate: true, shouldDirty: true })
                          }
                          onSwap={(from, to) => {
                            setValue("multiCityfromReturn", from);
                            setValue("multiCitytoReturn", to);
                          }}
                          fromError={!!errors?.multiCityfromReturn}
                          fromHelpertext={errors?.multiCityfromReturn?.message}
                          toError={!!errors?.multiCitytoReturn}
                          toHelpertext={errors?.multiCitytoReturn?.message}
                        />
                      )}
                    />
                  )}
                />
              </TableCell>

              <TableCell colSpan={2}>
                {/* Date using Controller */}
                <Controller
                  name="multiCityreturnDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <CustomDateTimePicker
                      datatimelabel="Return Date & Time"
                      required={true}
                      withClock
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(val: any) => field.onChange(val)}
                      error={!!errors?.multiCityreturnDate}
                      helperText={errors?.multiCityreturnDate?.message}
                    />
                  )}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleAddRow}
        className="btn btn-blue"
        sx={{ mt: "14px" }}
      >
        Add Stop
      </Button>
    </Box>
  );
};

export default AppendDeleteTable;
