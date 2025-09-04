'use client'
import { Grid, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import { useStep } from '@/app/context/StepProvider';

const CrewRequirements = () => {
    const { formData, setFormData, crewRequirementOptions } = useStep();

    // Now storing as { [var_key]: id }
    const [serviceSelections, setServiceSelections] = useState<{ [key: string]: number }>({});
    const [notes, setNotes] = useState("");

    // Initialize from formData only on mount
    useEffect(() => {
        // If previously saved in array-of-object format, convert to our selection object
        if (formData?.passengerInfo?.crew_requirements?.services) {
            const arr = formData.passengerInfo.crew_requirements.services;
            const obj: { [key: string]: number } = {};
            if (Array.isArray(arr)) {
                arr.forEach(item => {
                    // item is { var_key: id }
                    const key = Object.keys(item)[0];
                    obj[key] = item[key];
                });
            }
            setServiceSelections(obj);
        }
        if (formData?.passengerInfo?.crew_requirements?.additional_notes) {
            setNotes(formData.passengerInfo.crew_requirements.additional_notes);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update the form context whenever serviceSelections or notes change
    useEffect(() => {
        // Convert serviceSelections {key: id, ...} => [ {key: id}, ... ]
        const servicesArr = Object.entries(serviceSelections)
            .filter(([key, value]) => value !== undefined && value !== null && value > 0)
            .map(([key, value]) => ({ [key]: value }));

            setFormData(prevData => ({
                ...prevData,
                passengerInfo: {
                    ...prevData.passengerInfo,
                    crew_requirements: {
                        services: servicesArr,
                        additional_notes: notes
                    }
                }
            }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceSelections, notes]);

    const handleDropdownChange = (var_key: string, selectedId: number) => {
        setServiceSelections(prev => ({
            ...prev,
            [var_key]: selectedId
        }));
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotes(e.target.value);
    };

    return (
        <>
            <Grid item lg={12}>
                <Typography variant="h3" sx={{ color: '#BC0019', my: '15px' }}>
                    Crew Requirements
                </Typography>
            </Grid>
            {crewRequirementOptions && crewRequirementOptions.map((crew) => (
                <Grid item lg={4} md={6} sm={6} xs={12} key={crew.var_key}>
                    <FormControl fullWidth>
                        <InputLabel>{crew.inputLabel}</InputLabel>
                        <Select
                            label={crew.inputLabel}
                            value={serviceSelections[crew.var_key] ?? ""}
                            onChange={e => handleDropdownChange(crew.var_key, Number(e.target.value))}
                        >
                            <MenuItem value="" disabled>Select...</MenuItem>
                            {crew.options.map(opt => (
                                <MenuItem value={opt.id} key={opt.id}>{opt.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            ))}

            <Grid item lg={4} md={6} sm={6} xs={12}>
                <TextField
                    label="Additional Notes"
                    variant="outlined"
                    fullWidth
                    value={notes}
                    onChange={handleNotesChange}
                    size="medium"
                    multiline
                    rows={2}
                />
            </Grid>
        </>
    );
}

export default CrewRequirements;
