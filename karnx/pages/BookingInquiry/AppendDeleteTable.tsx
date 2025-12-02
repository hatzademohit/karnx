"use client";
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
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";

interface AppendDeleteTableProps {
  control: any;
  setValue: any;
  errors: any;
  watch?: any;
}

const AppendDeleteTable = ({ control, setValue, errors, watch }: AppendDeleteTableProps) => {
  const { airportCity, formData } = useStep();
  console.log(formData.multiCity)

  const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map((airport) => ({
    label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
    id: airport.id,
    code: airport.code,
  }));

  const handleAddRow = () => {
    append({ multiCityfrom: "", multiCityto: "", multiCitydepartureDate: "" });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "multiCity"
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ multiCityfrom: "", multiCityto: "", multiCitydepartureDate: "" });
      append({ multiCityfrom: "", multiCityto: "", multiCitydepartureDate: "" });
    }
  }, []);

  return (
    <Box>
      <TableContainer className="table-append">
        <Table size="small">
          <TableBody>
            {fields.map((item, index) => (
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
                          const multiCityto = watch(`multiCity[${index}].multiCityto`);
                          const multiCityfrom = watch(`multiCity[${index}].multiCityfrom`);
                          return (
                            <SwapComp
                              fromOptions={airportOptions.filter((airport) => airport.id != multiCityto)}
                              toOptions={airportOptions.filter((airport) => airport.id != multiCityfrom)}
                              fromValue={airportOptions.find((airport) => airport.id == multiCityfrom) || ''}
                              toValue={airportOptions.find((airport) => airport.id == multiCityto) || ''}
                              onFromChange={(val: any) => {
                                setValue(`multiCity[${index}].multiCityfrom`, val?.id, { shouldValidate: true, shouldDirty: true });
                              }}
                              onToChange={(val: any) =>
                                setValue(`multiCity[${index}].multiCityto`, val?.id, { shouldValidate: true, shouldDirty: true })
                              }
                              onSwap={(from: any, to: any) => {
                                setValue(`multiCity[${index}].multiCityfrom`, from?.id, { shouldValidate: true, shouldDirty: true });
                                setValue(`multiCity[${index}].multiCityto`, to?.id, { shouldValidate: true, shouldDirty: true });
                              }}
                              fromError={!!errors?.multiCity?.[index]?.multiCityfrom}
                              fromHelpertext={errors?.multiCity?.[index]?.multiCityfrom?.message}
                              toError={!!errors?.multiCity?.[index]?.multiCityto}
                              toHelpertext={errors?.multiCity?.[index]?.multiCityto?.message}
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
                        minDateTime={dayjs().add(1, 'day').startOf('day')}
                      />
                    )}
                  />
                </TableCell>

                <TableCell align="center" sx={{ position: 'relative' }}>
                  <Box sx={{ position: 'absolute', top: '35px' }}>
                    <IconButton onClick={() => remove(index)}>
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
                      render={({ field: toField }) => {
                        const multiCityfromReturn = watch('multiCityfromReturn');
                        const multiCitytoReturn = watch('multiCitytoReturn');
                        return (
                          <SwapComp
                            fromOptions={airportOptions.filter((airport) => airport.id != multiCitytoReturn)}
                            toOptions={airportOptions.filter((airport) => airport.id != multiCityfromReturn)}
                            fromValue={airportOptions.find((airport) => airport.id == multiCityfromReturn) || ''}
                            toValue={airportOptions.find((airport) => airport.id == multiCitytoReturn) || ''}
                            onFromChange={(val: any) => {
                              setValue("multiCityfromReturn", val?.id, { shouldValidate: true, shouldDirty: true });
                            }}
                            onToChange={(val: any) =>
                              setValue("multiCitytoReturn", val?.id, { shouldValidate: true, shouldDirty: true })
                            }
                            onSwap={(from: any, to: any) => {
                              setValue("multiCityfromReturn", from?.id, { shouldValidate: true, shouldDirty: true });
                              setValue("multiCitytoReturn", to?.id, { shouldValidate: true, shouldDirty: true });
                            }}
                            fromError={!!errors?.multiCityfromReturn}
                            fromHelpertext={errors?.multiCityfromReturn?.message}
                            toError={!!errors?.multiCitytoReturn}
                            toHelpertext={errors?.multiCitytoReturn?.message}
                          />
                        )
                      }}
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
                      minDateTime={dayjs().add(1, 'day').startOf('day')}
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
