'use client'
import { useAuth } from "@/app/context/AuthContext";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const FleetOverview = () => {

    interface flightOverviewDataProps{
        flightNumber?: string;
        status?: string;
        type?: string;
        location?: string;
        mainntenance?: string;
    }

    const [flightOverviewData, setFlightOverviewData] = useState<flightOverviewDataProps[]>([])

    useEffect(() => {
        setFlightOverviewData([
            {flightNumber: 'G-KRNX', status: 'ON TIME', type: 'Gulfstream G650', location: 'LHR', mainntenance: '45 hrs'},
            {flightNumber: 'G-WING', status: 'SCHEDULED', type: 'Global 7500', location: 'En Route CDG-DXB', mainntenance: '120 hrs'},
            {flightNumber: 'N123KX', status: 'MAINTENANCE', type: 'Citation XLS+', location: 'LAX Hangar', mainntenance: 'In Progress'},
        ])
    }, [])

    const viewDetails = (details) => {
        console.log(details)
    }

    const {theme} = useAuth();

    return(
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component='h1' variant="h1" sx={{color: theme?.heading?.color, mb: theme?.heading?.marginBottom}}>Fleet Overview</Typography>
            </Box>
            <Grid container spacing={2}>
                {flightOverviewData && flightOverviewData.map((item, index) => (
                    <Grid size={{ lg: 4, md: 6, sm: 12, xs: 12 }} key={index}>
                        <Box sx={{border: '1px solid #E6E6E6', padding: '18px'}}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                    <Typography component='h4' variant="h4" sx={{color: theme?.common?.blueColor}}>{item.flightNumber }</Typography>
                                     <Button variant="contained" className={`btn btn-status-rounded ${item.status === 'ON TIME' ? 'bg-green' : item.status === 'MAINTENANCE' ? 'bg-yellow' : ''}`}>{item.status}</Button>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography sx={{color: '#4D4D4D'}}>Type:</Typography>
                                    <Typography component='h5' variant="h5">{item.type}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography sx={{color: '#4D4D4D'}}>Location:</Typography>
                                    <Typography component='h5' variant="h5">{item.location}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography sx={{color: '#4D4D4D'}}>Next Maintenance:</Typography>
                                    <Typography component='h5' variant="h5">{item.mainntenance}</Typography>
                                </Box>
                                <Box>
                                    <Divider className="cust-divider" />
                                </Box>
                                <Box>
                                    <Button variant="contained" className="btn btn-blue" sx={{width: '100%'}} onClick={() => viewDetails(item)}>View Details</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default FleetOverview;