import { useFormContext } from "react-hook-form";
import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import { CustomTextField } from "@/components/CustomTextField/CustomTextField";

const TravelAgentCommission = () => {
    const { register, formState: { errors } } = useFormContext();
    const theme = useTheme();

    return (
        <Grid size={{ xs: 12 }}>
            <Card elevation={2}>
                <CardContent>
                    <Typography variant="h4" color={theme.common?.redColor} sx={{ mb: 2 }}>Travel Agent Commission</Typography>
                    <CustomTextField
                        inputLabel="Commission Percentage"
                        {...register("commissionPercentage")}
                        size="small"
                        type="number"
                        error={!!errors.commissionPercentage}
                        helperText={errors.commissionPercentage?.message as string}
                    />
                </CardContent>
            </Card>
        </Grid>
    );
};

export default TravelAgentCommission;
