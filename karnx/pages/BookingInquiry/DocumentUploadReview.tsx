'use client'
import { useAuth } from "@/app/context/AuthContext";
import { useStep } from "@/app/context/StepProvider";
import { FileSelection } from "@/components";
import { Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const DocumentUploadReview = () => {
    const { theme } = useAuth()
    const { control, formState: { errors } } = useFormContext();

    //const [requiredDocument, setRequiredDocument] = useState(['Valid passport or ID for all passengers', 'Medical certificates (if medical needs indicated)', 'Pet documentation (if pets traveling)'])
    const [requiredDocument, setRequiredDocument] = useState<any[]>([]);
    const { requiredDocumentUploadOptions } = useStep();
    useEffect(() => {
        setRequiredDocument(requiredDocumentUploadOptions || []);
    }, [requiredDocumentUploadOptions]);
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Controller
                    name="documentFile"
                    control={control}
                    render={({ field }) => (
                        <>
                            <FileSelection
                                onFileSelect={(files) => field.onChange(Array.from(files))}
                                defaultValue={field.value || []}
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
                <Typography variant="h4" sx={{ mb: '8px' }}>Required Documents</Typography>
                {errors?.requiredDocumentUploaded &&
                    <FormHelperText error>
                        {errors?.requiredDocumentUploaded?.message as string}
                    </FormHelperText>
                }
                <FormControl>
                    {requiredDocument && requiredDocument.map((docName) => (
                        <Controller
                            key={docName.id}
                            name={`requiredDocumentUploaded`}
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    label={docName.name}
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={Array.isArray(field.value) && field.value.includes(docName.id)}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                const updatedValue = Array.isArray(field.value) ? [...field.value] : [];

                                                if (isChecked) {
                                                    updatedValue.push(docName.id);
                                                } else {
                                                    const index = updatedValue.indexOf(docName.id);
                                                    if (index !== -1) {
                                                        updatedValue.splice(index, 1);
                                                    }
                                                }
                                                field.onChange(updatedValue);
                                            }}
                                        />
                                    }
                                />
                            )}
                        />
                    ))}
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default DocumentUploadReview;