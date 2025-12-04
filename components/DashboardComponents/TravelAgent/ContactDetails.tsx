import { useFormContext } from "react-hook-form";
import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import { CustomTextField } from "@/components/CustomTextField/CustomTextField";

const ContactDetails = () => {

    const theme = useTheme();
    const { register, formState: { errors } } = useFormContext();
    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={2}>
                <CardContent>
                    <Typography variant="h5" color={theme.common?.redColor}>Contact Details</Typography>
                    <Typography color="#333333" variant="body2" sx={{ mb: 2 }}>
                        Your ticket & flight information will be sent here
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                            <CustomTextField
                                inputLabel="Contact Name"
                                {...register("contact_name")}
                                asterisk={true}
                                error={!!errors.contact_name}
                                helperText={errors.contact_name?.message as string}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                            <CustomTextField
                                inputLabel="Contact Email"
                                {...register("contact_email")}
                                asterisk={true}
                                error={!!errors.contact_email}
                                helperText={errors.contact_email?.message as string}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                            <CustomTextField
                                inputLabel="Contact Phone"
                                {...register("contact_phone")}
                                asterisk={true}
                                error={!!errors.contact_phone}
                                helperText={errors.contact_phone?.message as string}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ContactDetails;
