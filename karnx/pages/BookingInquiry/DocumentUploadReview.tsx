'use client'
import { FileSelection } from "@/components";
import { Checkbox, FormControl, FormControlLabel, Grid, Typography } from "@mui/material";
import { useState } from "react";

const DocumentUploadReview = () => {

    const [requiredDocument, setRequiredDocument] = useState(['Valid passport or ID for all passengers', 'Medical certificates (if medical needs indicated)', 'Pet documentation (if pets traveling)'])

    return(
        <>
            <Grid size={{ xs: 12 }}>
                <Typography variant="h3" sx={{color: '#BC0019', mb: '15px'}}>Document Upload & Review</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <FileSelection onFileSelect={(files) => console.log(files)} />
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