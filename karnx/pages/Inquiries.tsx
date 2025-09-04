'use client'
import { Box, Button, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { CustomModal, CustomTextField } from "@/components";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

const Inquiries = () => {

    const [inquiries, setInquiries] = useState([])
    const [inqueryModal, setInqueryModal] = useState(false)
    const [inqueryContain, setInqueryContain] = useState([])

    const openInqueryModal = (contain) => {
        setInqueryContain(contain)
        setInqueryModal(true)
    }

    useEffect(() => {
        setInquiries([
            {inqueryNumber: 'INQ-2024-001', priority: ['NEW', 'MEDIUM PRIORITY'],
            flightRoute: 'SFO → SEA', client: 'Creative Solutions Inc', date: 'October 25, 2025', passenger: 3, airCraftType: 'Heavy Jet', assign: 'Assigned 3 hours ago', status: ['Accept', 'Reject']},
            {inqueryNumber: 'INQ-2024-005', priority: ['ACCEPTED', 'HIGH PRIORITY'],
            flightRoute: 'YYZ → YVR', client: 'Sunshine Travel Co', date: 'March 18, 2025', passenger: 5, airCraftType: 'Ultra Long Range', assign: 'Assigned 6 hours ago', status: []},
            {inqueryNumber: 'INQ-2024-006', priority: ['REJECTED', 'LOW PRIORITY'],
            flightRoute: 'MIA → ATL', client: 'Maple Leaf Industries', date: 'March 20, 2025', passenger: 4, airCraftType: 'Light Jet', assign: 'Assigned 2 days ago', status: []},
        ])
    }, [])

    return(
       <>
        <Typography component='h1' variant="h1" sx={{color: '#03045E', mb: '24px'}}>Inquiries</Typography>
        <Box sx={{ padding: '24px 0 0 ', border: '1px solid #E6E6E6'  }}>
            <Box sx={{ padding: '0 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component='h4' variant="h4">Assigned Inquiries</Typography>
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
            <Box>
                {inquiries && inquiries.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '30px', padding: '24px', borderTop: '1px solid #E6E6E6' }}>
                        <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', width: '100%'}}>
                            <Box sx={{ display: "flex", gap: '20px', alignItems: 'center' }}>
                                <Typography>{item.inqueryNumber}</Typography>
                                {item?.priority.map((btnText, index) => (
                                    <Button key={index + btnText} variant="contained" 
                                        className={`btn btn-status-rounded ${btnText === 'NEW' ? 'bg-blue' : btnText === 'MEDIUM PRIORITY' ? 'bg-medium' : btnText === 'ACCEPTED' ? 'bg-green' : btnText === 'REJECTED' ? 'bg-red' : btnText === 'LOW PRIORITY' ? 'bg-low' : 'bg-high' }`}
                                    >
                                    {btnText}</Button>
                                ))}
                            </Box>
                            <Box sx={{ display: "flex", gap: '8px', flexDirection: 'column', maxWidth: '840px'}}>
                                <Typography component='h3' variant="h3">{item.flightRoute}</Typography>
                                <Box sx={{ display: "flex", gap: '16px', justifyContent: 'space-between' }}>
                                    <Typography className="fs14">Client: {item.client}</Typography>
                                    <Typography className="fs14">Date: {item.date}</Typography>
                                    <Typography className="fs14">Passengers: {item.passenger}</Typography>
                                    <Typography className="fs14">Aircraft: {item.airCraftType}</Typography>
                                </Box>
                                <Typography className='fs12' sx={{color: '#808080'}}>{item.assign}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{maxWidth: '470px', width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                            <Button variant="contained" className="btn btn-status bg-blue" onClick={ () => openInqueryModal(item)}>
                                <RemoveRedEyeIcon sx={{mr: '8px'}} /> View Details
                            </Button>
                            {item?.status.map((sts, index) => (
                                sts === 'Accept' ? 
                                <Button key={index + sts} variant="contained" className="btn btn-status bg-green">
                                    <TaskAltIcon sx={{mr: '8px'}} /> {sts}
                                </Button> :
                                <Button variant="contained" className="btn btn-status bg-red">
                                    <CancelOutlinedIcon sx={{mr: '8px'}} /> Reject
                                </Button>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>

        <CustomModal open={inqueryModal} setOpen={setInqueryModal} dataClose={() => setInqueryModal(false)} headerText="Inquiry Details - INQ-2024-001">
            <Grid container spacing={2}>
                <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                    <Typography component='h4' variant="h4" sx={{mb: '12px'}}>Flight Details</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <Box sx={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                            <Typography component='h6' variant="h6">Route:</Typography>
                            <Typography sx={{color: '#4D4D4D'}}>LHR → JFK</Typography>
                        </Box>
                        <Box sx={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                            <Typography component='h6' variant="h6">Date:</Typography>
                            <Typography sx={{color: '#4D4D4D'}}>March 15, 2025</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                    <Typography component='h4' variant="h4" sx={{mb: '12px'}}>Client Information</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <Box sx={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                            <Typography component='h6' variant="h6">Client:</Typography>
                            <Typography sx={{color: '#4D4D4D'}}>Sterling Enterprises</Typography>
                        </Box>
                        <Box sx={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                            <Typography component='h6' variant="h6">Priority:</Typography>
                            <Typography sx={{color: '#4D4D4D'}}>High</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                   <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: "center", gap: '10px'}} className='modal-footer'>
                        <Button variant="contained" className="btn btn-status bg-green" onClick={ () => setInqueryModal(false)}>
                            <TaskAltIcon sx={{mr: '8px', fontSize: '14px'}} /> Accept Inquiry
                        </Button>
                        <Button variant="contained" className="btn btn-status bg-red" onClick={ () => setInqueryModal(false)}>
                            <CancelOutlinedIcon sx={{mr: '8px', fontSize: '14px'}} /> Reject Inquiry
                        </Button>
                        <Button variant="outlined" className="btn btn-status" sx={{border: '1px solid #cccccc', color: '#333333'}} onClick={ () => setInqueryModal(false)}>
                            Request More Info
                        </Button>
                   </Box>
                </Grid>
            </Grid>
        </CustomModal>
       </>
    )
}

export default Inquiries;