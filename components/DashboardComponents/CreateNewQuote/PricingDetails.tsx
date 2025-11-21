import React, { useEffect, useMemo } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { CustomTextField, CustomDatePicker, SingleSelectRadio } from "@/components";
import dayjs from "dayjs";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";

const fields = [
    { name: "baseFare", label: "Base Fare", numeric: true },
    { name: "fuel", label: "Fuel", numeric: true },
    { name: "taxes", label: "Taxes & Fees", numeric: true },
    { name: "crewFees", label: "Crew Fees", numeric: true },
    { name: "handlingFees", label: "Handling Fees", numeric: true },
    { name: "catering", label: "Catering", numeric: true },
];

const PricingDetails = (editedData) => {
    const { control, setValue } = useFormContext();
    const theme = useTheme()
    const watchedValues = useWatch({ control });
    const { cancellationPolicyList } = useInquiryDetails();

    const totalAmount = useMemo(() => {
        return Object.entries(watchedValues || {}).reduce((sum, [key, value]) => {
            const field = fields.find(f => f.name === key);
            if (field?.numeric) {
                const num = parseFloat(value || "0");
                return sum + (isNaN(num) ? 0 : num);
            }
            return sum;
        }, 0);
    }, [watchedValues, fields]);

    useEffect(() => {
        setValue("totalAmount", totalAmount);
    }, [totalAmount, setValue]);

    return (
        <Box>
            <Typography variant="h4" color={theme?.common.redColor} mb={2}>
                Pricing Details
            </Typography>
            <Grid container spacing={{ md: 2, xs: 1 }}>
                {fields.map((input) => (
                    <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }} key={input.name}>
                        <Controller
                            name={input.name}
                            control={control}
                            rules={{
                                required: `${input.label} is required`,
                                ...(input.numeric && {
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "Only numbers are allowed",
                                    },
                                }),
                            }}
                            render={({ field, fieldState }) => (
                                <CustomTextField
                                    {...field}
                                    inputLabel={input.label}
                                    asterisk={true}
                                    placeholder={`Enter ${input.label}`}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    size="medium"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const filteredValue = input.numeric
                                            ? value.replace(/[^0-9]/g, "")
                                            : value;
                                        field.onChange(filteredValue);
                                    }}
                                />
                            )}
                        />
                    </Grid>
                ))}
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, p: 3, border: `1px solid ${theme?.common.borderColor}`, mt: 1, backgroundColor: '#f2f2f2', borderRadius: 3 }}>
                        <Typography variant="h4">Total Quote Amount:</Typography>
                        <Typography variant="h2">₹ {totalAmount.toLocaleString("en-IN")}</Typography>
                    </Box>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Controller
                        name="quoteValidUntil"
                        control={control}
                        rules={{
                            required: "Quote valid until date is required",
                            validate: (value) => {
                                const isValid = dayjs(value).isAfter(dayjs());
                                return isValid ? true : "Invalid date";
                            },
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <CustomDatePicker
                                    {...field}
                                    datelabel="Quote Valid Until"
                                    asterisk={true}
                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(newVal) => field.onChange(newVal)}
                                    required
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    minDate={dayjs().add(1, "day")}
                                />
                            )
                        }}
                    />
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Controller
                        name="cancellationPolicy"
                        control={control}
                        rules={{
                            required: "Please select a cancellation policy",
                        }}
                        render={({ field, fieldState }) => (
                            <SingleSelectRadio
                                inputLabel="Cancellation Policy"
                                options={cancellationPolicyList?.map((p: any) => ({ value: p?.id, label: p?.name }))}
                                value={field.value}
                                onChange={field.onChange}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PricingDetails;
