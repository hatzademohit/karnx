'use client'
import { Box, Button, Divider, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { CustomModal, CustomTextField } from "@/components";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useEffect, useState } from "react";
import FlightStepper from "@/components/Stepper/FlightStepper";
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from "@/app/context/AuthContext";

const FlightOperations = () => {

    const {theme} = useAuth();
 
    interface flightOperationsDataProps{
        flightNumber?: string;
        flightSatus?: string;
        route?: string;
        departure?: string;
        aircraft?: string;
        crew?: string;
        passengers?: number;
    }

    const [flightOperationsData, setFlightOperationsData] = useState<flightOperationsDataProps[]>([])
    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
    const [detailModalData, setDetailModalData] = useState<flightOperationsDataProps>({})

    useEffect(() => {
        setFlightOperationsData([
            {flightNumber: 'FL-001', flightSatus: 'ON TIME', route: 'LHR → JFK', departure: 'Today 14.30', aircraft: 'G650 (G-KRNX)', crew: 'Capt. Johnson, FO Smith', passengers: 4},
            {flightNumber: 'FL-002', flightSatus: 'DELAYED', route: 'CDG → DXB', departure: 'Tomorrow 09:15', aircraft: 'Global 7500 (G-WING)', crew: 'Capt. Brown, FO Wilson', passengers: 6},
            {flightNumber: 'FL-003', flightSatus: 'SCHEDULED', route: 'CDG → DXB', departure: 'Tomorrow 09:15', aircraft: 'Global 7500 (G-WING)', crew: 'Capt. Brown, FO Wilson', passengers: 6},
        ])
    }, [])

    const fligntFolio = (fligthInfo) => {
        setDetailModalData(fligthInfo)
        setOpenDetailModal(true)
        console.log(fligthInfo)
    }

    return(
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: theme?.heading?.marginBottom }}>
                <Typography component='h1' variant="h1" sx={{color: theme?.heading?.color}}>Flight Operations</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CustomTextField 
                        variant='outlined' 
                        size='small' 
                        placeholder="Search"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton>
                        <FilterAltOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
            <Grid container spacing={2}>
                {flightOperationsData && flightOperationsData.map((item, index) => (
                    <Grid size={{ lg: 4, md: 6, sm: 12, xs: 12 }} key={index}>
                        <Box sx={{border: '1px solid #E6E6E6', padding: '18px'}}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography>{item.flightNumber }</Typography>
                                    <Button variant="contained" className={`btn btn-status-rounded ${item.flightSatus === 'ON TIME' ? 'bg-green' : item.flightSatus === 'DELAYED' ? 'bg-red' : ''}`}>{item.flightSatus}</Button>
                                </Box>
                                <Box>
                                    <Typography component='h3' variant="h3" sx={{ color: theme?.common?.blueColor }}>{item.route}</Typography>
                                    <Typography className="fs14">{item.departure}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography sx={{color: '#4D4D4D'}}>Aircraft:</Typography>
                                    <Typography component='h5' variant="h5">{item.aircraft}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography sx={{color: '#4D4D4D'}}>Crew:</Typography>
                                    <Typography component='h5' variant="h5">{item.crew}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography sx={{color: '#4D4D4D'}}>Passengers:</Typography>
                                    <Typography component='h5' variant="h5">{item.passengers}</Typography>
                                </Box>
                                <Box>
                                    <Divider className="cust-divider" />
                                </Box>
                                <Box>
                                    <Button variant="contained" className="btn btn-blue" sx={{width: '100%'}} onClick={() => fligntFolio(item)}>Open Flight Folio</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <CustomModal open={openDetailModal} setOpen={setOpenDetailModal} dataClose={() => setOpenDetailModal(false)} headerText={`Flight Folio ${detailModalData?.flightNumber}`} className="modal-lg">
                <Grid container spacing={2}>
                    <Grid size={{ lg: 8, md: 8, sm: 12, xs: 12 }}>
                        <Box sx={{mb: '20px'}}>
                            <Typography component='h4' variant="h4" sx={{ color: theme?.common?.blueColor, mb: '12px' }}>Flight Details</Typography>
                            <Box sx={{backgroundColor: '#F6F7FF', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', borderRadius: '4px'}}>
                                <Box sx={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                    <Typography component='h5' variant="h5" sx={{color: '#4D4D4D'}}>Route:</Typography>
                                    <Typography className="fs14">{detailModalData?.route}</Typography>
                                </Box>
                                <Box sx={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                    <Typography component='h5' variant="h5" sx={{color: '#4D4D4D'}}>Departure:</Typography>
                                    <Typography className="fs14">{detailModalData?.departure}</Typography>
                                </Box>
                                <Box sx={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                    <Typography component='h5' variant="h5" sx={{color: '#4D4D4D'}}>Aircraft:</Typography>
                                    <Typography className="fs14">{detailModalData?.aircraft}</Typography>
                                </Box>
                                <Box sx={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                    <Typography component='h5' variant="h5" sx={{color: '#4D4D4D'}}>Passengers:</Typography>
                                    <Typography className="fs14">{detailModalData?.passengers}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{mb: '20px'}}>
                            <Typography component='h4' variant="h4" sx={{ color: theme?.common?.blueColor, mb: '12px' }}>Client Information</Typography>
                            <Box sx={{backgroundColor: '#F6F7FF', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', borderRadius: '4px'}}>
                                <Box sx={{display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Typography className="fs14">{detailModalData?.crew}</Typography>
                                    <Button variant="contained" className="btn btn-blue">Modify Crew</Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Typography component='h4' variant="h4" sx={{ color: theme?.common?.blueColor, mb: '12px' }}>Flight Status</Typography>
                            <Box sx={{backgroundColor: '#F6F7FF', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', borderRadius: '4px'}}>
                                <Box sx={{display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <FlightStepper />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 4, md: 4, sm: 12, xs: 12 }}>
                       <Box>
                            <Typography component='h4' variant="h4" sx={{ color: theme?.common?.blueColor, mb: '12px' }}>Quick Actions</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                                <Button variant="contained" className="btn btn-blue" sx={{width: '100%'}}>Update Status</Button>
                                <Button variant="contained" className="btn btn-blue" sx={{width: '100%'}}>Contact Client</Button>
                                <Button variant="contained" className="btn btn-blue" sx={{width: '100%'}}>View Documents</Button>
                                <Button variant="contained" className="btn btn-blue" sx={{width: '100%'}}>Generate Report</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </CustomModal>
        </Box>
    )
}

export default FlightOperations;