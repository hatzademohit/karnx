import { Box, Grid, Typography } from "@mui/material";
import { CustomTextField } from "@/components";
import { useState } from "react";

const ContactSummary = ()=> {

    return(
        <Box sx={{ border: '1px solid #E6E6E6', borderBottom: 0, padding: '24px'}}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h3" sx={{color: '#BC0019'}}>Contact Information</Typography>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <CustomTextField
                        inputLabel="Contact Name"
                    />
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <CustomTextField
                        inputLabel="Contact Email"
                    />
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <CustomTextField
                        inputLabel="Contact Phone"
                    />
                </Grid>
                <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                    <CustomTextField
                        inputLabel="Special Requirements...."
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h3" sx={{color: '#BC0019', mt: '14px'}}>Inquiry Summary</Typography>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Contact:</Typography>
                        <Typography sx={{fontSize: '14px', color: '#808080'}}>Sterling Enterprises</Typography>
                    </Box>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Route:</Typography>
                        <Typography sx={{fontSize: '14px', color: '#808080'}}>DEL → BOM</Typography>
                    </Box>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Date:</Typography>
                        <Typography sx={{fontSize: '14px', color: '#808080'}}>October 25, 2025</Typography>
                    </Box>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Aircraft Type:</Typography>
                        <Typography sx={{fontSize: '14px', color: '#808080'}}>Mid-Size Jet</Typography>
                    </Box>
                </Grid>
                <Grid size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        <Typography sx={{fontFamily: 'poppins-md', fontSize: '14px'}}>Passengers:</Typography>
                        <Typography sx={{fontSize: '14px', color: '#808080'}}>4 adults</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ContactSummary;