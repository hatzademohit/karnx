'use client'
import { useAuth } from "@/app/context/AuthContext";
import { FileSelection } from "@/components";
import { Checkbox, FormControl, FormControlLabel, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const DocumentUploadReview = () => {
    const {theme} = useAuth()
    const { control, formState: { errors } } = useFormContext();

    const [requiredDocument, setRequiredDocument] = useState(['Valid passport or ID for all passengers', 'Medical certificates (if medical needs indicated)', 'Pet documentation (if pets traveling)'])

    return(
        <>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{color: theme?.common?.redColor, mb: '15px'}}>Document Upload & Review</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Controller
                    name="documentFile"
                    control={control}
                    render={({ field }) => (
                        <>
                        <FileSelection
                            onFileSelect={(files) => field.onChange(Array.from(files))} // Convert to array
                        />
                        {errors.documentFile && (
                            <Typography color="error" className="fs12" sx={{ mt: 1 }}>
                            {errors.documentFile.message as string}
                            </Typography>
                        )}
                        </>
                    )}
                />

            </Grid>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h4" sx={{ mb: '8px'}}>Required Documents</Typography>
                <FormControl>
                    {requiredDocument && requiredDocument.map((require) => (
                        <FormControlLabel key={require} label={require} control={<Checkbox size="small" />} />
                    ))}
                </FormControl>
            </Grid>
        </>
    )
}

export default DocumentUploadReview;