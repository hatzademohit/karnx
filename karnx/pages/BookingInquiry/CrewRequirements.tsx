'use client'
import { CustomTextField, SimpleAutoComplete, SingleSelectRadio } from "@/components";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";

const CrewRequirements = () => {

    const [crewPreference, setCrewPreference] = useState<string>("");

    return(
        <>
            <Grid item lg={12}>
                <Typography variant="h3" sx={{color: '#BC0019', my: '15px'}}>Crew Requirements </Typography>
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <SingleSelectRadio 
                    inputLabel='Cabin Crew Preference'
                    options={['No Preference', 'Only Female Hostess', 'Only Male Host', 'Mixed Crew']}
                    value={crewPreference}
                    onChange={setCrewPreference}
                />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <SingleSelectRadio 
                    inputLabel='Pilot Experience Level'
                    options={['No Preference', 'Standard Licensed Pilot', 'Senior Pilot (5+ years charter experience)', 'Instructor-Level Pilot (10+ years experience)']}
                    value={crewPreference}
                    onChange={setCrewPreference}
                />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <SingleSelectRadio 
                    inputLabel='Pilot Experience Level'
                    options={['Medical / Specialized Crew', 'Doctor Onboard', 'SNurse Onboard', 'Medical Assistant (stretcher/wheelchair cases)']}
                    value={crewPreference}
                    onChange={setCrewPreference}
                />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <SimpleAutoComplete
                    inputLabel='Languages Spoken'
                    options={['ENG', 'MAR', 'HID']}
                />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <SingleSelectRadio 
                    inputLabel='VIP/Concierge Crew Skills'
                    options={['Not Required', 'Celebrity/VIP Handling', 'Security Trained Crew', 'Etiquette-Trained Host/Hostess', 'Multilingual Concierge']}
                    value={crewPreference}
                    onChange={setCrewPreference}
                />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
                <CustomTextField 
                    inputLabel="Additional Notes"
                    size='medium'
                />
            </Grid>
        </>
    )
}

export default CrewRequirements;