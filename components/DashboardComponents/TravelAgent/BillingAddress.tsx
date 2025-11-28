import { useFormContext } from "react-hook-form";
import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import { CustomTextField } from "@/components/CustomTextField/CustomTextField";

const BillingAddress = () => {
    const { register, formState: { errors } } = useFormContext();
    const theme = useTheme();
    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={2}>
                <CardContent>
                    <Typography variant="h5" color={theme.common?.redColor}>Billing Address</Typography>
                    <Typography color="#333333" variant="body2" sx={{ mb: 2 }}>
                        As per the latest govt. regulations, it’s mandatory to provide your address.
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                            <CustomTextField
                                inputLabel="Pincode"
                                {...register("pinCode")}
                                asterisk={true}
                                error={!!errors.pinCode}
                                helperText={errors.pinCode?.message as string}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                            <CustomTextField
                                inputLabel="Address"
                                {...register("address")}
                                asterisk={true}
                                error={!!errors.address}
                                helperText={errors.address?.message as string}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                            <CustomTextField
                                inputLabel="City"
                                {...register("city")}
                                asterisk={true}
                                error={!!errors.city}
                                helperText={errors.city?.message as string}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default BillingAddress;
