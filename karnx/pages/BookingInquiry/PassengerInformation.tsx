'use client'
import { Box, Checkbox, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from "@mui/material";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useEffect, useState } from "react";
import { CustomTextField } from "@/components";
import { useStep } from '@/app/context/StepProvider';
import { Controller, useFormContext } from "react-hook-form";
import { useAuth } from "@/app/context/AuthContext";

const PassengerInformation = () => {
    const {theme} = useAuth()
    const [specialAssistance, setSpecialAssistance] = useState<any[]>([]);
    const { medicalSupOptions } = useStep();
    const { control, watch, setValue, formState: { errors } } = useFormContext();

    const adults = watch("adults") || 1;
    const children = watch("children") || 0;
    const infants = watch("infants") || 0;

    useEffect(() => {
        setSpecialAssistance(medicalSupOptions || []);
    }, [medicalSupOptions]);

    useEffect(() => {
        setValue("totalPassengers", adults + children + infants);
    }, [adults, children, infants, setValue])

    const [otherAssistance, setOtherAssistance] = useState<any>();

    const handleChange = (name: string, action: "inc" | "dec", min = 0) => {
        const currentValue = watch(name) || 0;
        const newValue = action === "inc" ? currentValue + 1 : Math.max(min, currentValue - 1);
        setValue(name, newValue);
    };
    
    return(
        <>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{color: theme?.common?.redColor}}>Passenger Information</Typography>
            </Grid>
            {[
                { name: "adults", label: "Adults", min: 1 },
                { name: "children", label: "Children (2-12 yrs)", min: 0 },
                { name: "infants", label: "Infants (under 2)", min: 0 },
            ].map(({ name, label, min }) => (
                <Grid size={{ lg: 3, md: 6, sm: 6, xs: 12 }} key={name}>
                <Typography sx={{ fontFamily: "poppins-lt", fontSize: "14px", mb: "8px" }}>{label}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <IconButton className="btn-icon-border" onClick={() => handleChange(name, "dec", min)}>
                        <RemoveRoundedIcon />
                    </IconButton>
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={min}
                        render={({ field }) => <Typography component="h5" variant="h5">{field.value}</Typography>}
                    />
                    <IconButton className="btn-icon-border" onClick={() => handleChange(name, "inc")}>
                        <AddRoundedIcon />
                    </IconButton>
                </Box>
                </Grid>
            ))}
            <Grid size={{ lg: 3, md: 6, sm: 6, xs: 12 }}> 
                <Controller
                    name="totalPassengers"
                    control={control}
                    render={({ field }) => (
                        <CustomTextField
                            inputLabel="Total Passengers"
                            {...field}
                            value={field.value || 0}
                            disabled
                            error={!!errors.totalPassengers}    
                            helperText={errors.totalPassengers?.message as string}
                        />
                    )}
                />
            </Grid>
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                <Box className='passengers-travelling-info-box'>
                    <Typography sx={{ fontFamily: 'poppins-md', fontSize: '14px' }}>Travelling With Pets <Typography component="span" sx={{color: 'red'}}>*</Typography></Typography>
                    <FormControl>
                       <Controller
                            name="isTravellingWithPets"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup row value={field.value ? "yes" : "no"} onChange={e => field.onChange(e.target.value === "yes")}>
                                    <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                    {watch("isTravellingWithPets") && (
                        <Grid container spacing={2}>
                            <Grid size={{ lg: 4, md: 4, sm: 6, xs:12 }}>
                                <Controller
                                    name="petType"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                    <CustomTextField
                                        inputLabel="Pet Type"
                                        className="white-bg-input"
                                        {...field}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                    )}
                                />
                            </Grid>

                            <Grid size={{ lg: 4, md: 4, sm: 6, xs:12 }}>
                                <Controller
                                    name="petSize"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                    <CustomTextField
                                        inputLabel="Pet Size"
                                        placeholder="Enter Pet Weight"
                                        className="white-bg-input"
                                        {...field}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ lg: 4, md: 4, sm: 6, xs:12 }}>
                                <Controller
                                    name="petAdditionalNotes"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                    <CustomTextField
                                        inputLabel="Special Requirements..."
                                        className="white-bg-input"
                                        {...field}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Grid>
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                <Box className='passengers-travelling-info-box'>
                    <Typography sx={{ fontFamily: 'poppins-md', fontSize: '14px' }}>Medical needs or assistance required <Typography component="span" sx={{color: 'red'}}>*</Typography></Typography>
                    <FormControl>
                        <Controller
                            name="isMedicalAssistanceReq"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup row value={field.value ? "yes" : "no"} onChange={e => field.onChange(e.target.value === "yes")}>
                                    <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                    {watch('isMedicalAssistanceReq') && (
                      <Grid container spacing={1}>
                            <Grid size={{ lg: 12, md: 12, sm: 12, xs:12 }}>
                              <Typography component='h4' variant="h4" sx={{mt: '10px'}}>Special Assistance</Typography>
                              <Typography sx={{ fontFamily: 'poppins-lt', fontSize: '14px', color: '#959595', my: '10px' }}>
                                  Select Any Assistance needed for passenger
                              </Typography>
                          </Grid>
                          {specialAssistance && specialAssistance.map((assistance) => (
                              <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }} key={assistance.id}>
                                <Controller
                                    name={`specialAssistance.${assistance.id}`}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            label={assistance.name}
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={field.value || false}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                />
                                            }
                                        />
                                    )}
                                />
                                  {assistance.id === 6 &&
                                    <CustomTextField placeholder="Enter" className='white-bg-input' value={otherAssistance} onChange={e => setOtherAssistance(e.target.value) } />
                                  }
                              </Grid>
                          ))}
                      </Grid>
                    )}
                </Box>
            </Grid>
            <Grid size={{ lg: 4, md: 4, sm: 6, xs:12 }}>
                <Controller
                    name="checkedBags"
                    control={control}
                    render={({ field, fieldState }) => (
                        <CustomTextField
                            inputLabel="Checked Bags"
                            {...field}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>
            <Grid size={{ lg: 4, md: 4, sm: 6, xs:12 }}>
                <Controller
                    name="carryOnBags"
                    control={control}
                    render={({ field, fieldState }) => (
                        <CustomTextField
                            inputLabel="Carry -on Bags"
                            {...field}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>
            <Grid size={{ lg: 4, md: 4, sm: 6, xs:12 }}>
                <Controller
                    name="overSizedItems"
                    control={control}
                    render={({ field, fieldState }) => (
                        <CustomTextField
                            inputLabel="Oversized Items"
                            placeholder="e.g., golf clubs, skis, etc."
                            {...field}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Grid>
        </>
    )
}

export default PassengerInformation;
