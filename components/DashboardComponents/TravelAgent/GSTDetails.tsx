import { useFormContext } from "react-hook-form";
import { Card, CardContent, FormControlLabel, Grid, Switch, Typography, useTheme } from "@mui/material";
import { CustomTextField } from "@/components/CustomTextField/CustomTextField";

const GSTDetails = () => {
    const { register, watch, setValue, formState: { errors } } = useFormContext();
    const enableGST = watch("enableGST");
    const theme = useTheme();

    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={2}>
                <CardContent>
                    <Typography variant="h5" color={theme.common?.redColor}>GST Details</Typography>
                    <Typography color="#333333" variant="body2" sx={{ mb: 1 }}>
                        To claim credit of GST charged by airlines, please enter your GST details
                    </Typography>
                    <FormControlLabel
                        control={
                            <Switch checked={enableGST} onChange={(e) => setValue("enableGST", e.target.checked)} />
                        }
                        label="I would like to add my GST Number"
                    />

                    {enableGST && (
                        <CustomTextField
                            inputLabel="GSTIN"
                            {...register("gstin")}
                            size="small"
                            asterisk={true}
                            error={!!errors.gstin}
                            helperText={errors.gstin?.message as string}
                        />
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
};

export default GSTDetails;
