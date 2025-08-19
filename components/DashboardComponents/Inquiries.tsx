import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { CustomModal, CustomTextField } from "@/components";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from "react";

const Inquiries = () => {

    const [inqueryModal, setInqueryModal] = useState(false)

    return(
       <>
        <Typography component='h1' variant="h1" sx={{color: '#03045E', mb: '24px'}}>Inquiries</Typography>
        <Box sx={{ padding: '24px 0 0 ', border: '1px solid #E6E6E6'  }}>
            <Box sx={{ padding: '0 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component='h4' variant="h4">Assigned Inquiries</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <CustomTextField variant='outlined' size='small' placeholder="Search" />
                    <IconButton>
                        <FilterAltOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px', padding: '24px', borderTop: '1px solid #E6E6E6' }}>
                    <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', width: '100%'}}>
                        <Box sx={{ display: "flex", gap: '20px', alignItems: 'center' }}>
                            <Typography>INQ-2024-001</Typography>
                            <Button variant="contained" className="btn btn-status-rounded bg-blue">New</Button>
                            <Button variant="contained" className="btn btn-status-rounded bg-high">HIGH PRIORITY</Button>
                        </Box>
                        <Box sx={{ display: "flex", gap: '8px', flexDirection: 'column', maxWidth: '840px'}}>
                            <Typography component='h3' variant="h3">LHR → JFK</Typography>
                            <Box sx={{ display: "flex", gap: '16px', justifyContent: 'space-between' }}>
                                <Typography className="fs14">Client: Sterling Enterprises</Typography>
                                <Typography className="fs14">Date: March 15, 2025</Typography>
                                <Typography className="fs14">Passengers: 4</Typography>
                                <Typography className="fs14">Aircraft: Heavy Jet</Typography>
                            </Box>
                            <Typography className='fs12' sx={{color: '#808080'}}>Assigned 2 hours ago</Typography>
                        </Box>
                    </Box>
                    <Box sx={{maxWidth: '470px', width: '100%', display: 'flex', gap: '10px'}}>
                        <Button variant="contained" className="btn btn-status bg-blue" onClick={ () => setInqueryModal(true)}>
                            <RemoveRedEyeIcon sx={{mr: '8px'}} /> View Details
                        </Button>
                        <Button variant="contained" className="btn btn-status bg-green">
                            <TaskAltIcon sx={{mr: '8px'}} /> Accept
                        </Button>
                        <Button variant="contained" className="btn btn-status bg-red">
                            <CancelOutlinedIcon sx={{mr: '8px'}} /> Reject
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px', padding: '24px', borderTop: '1px solid #E6E6E6' }}>
                    <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', width: '100%'}}>
                        <Box sx={{ display: "flex", gap: '20px', alignItems: 'center' }}>
                            <Typography>INQ-2024-001</Typography>
                            <Button variant="contained" className="btn btn-status-rounded bg-pending">QUOTE PENDING</Button>
                            <Button variant="contained" className="btn btn-status-rounded bg-medium">MEDIUM PRIORITY</Button>
                        </Box>
                        <Box sx={{ display: "flex", gap: '8px', flexDirection: 'column', maxWidth: '840px'}}>
                            <Typography component='h3' variant="h3">LHR → JFK</Typography>
                            <Box sx={{ display: "flex", gap: '16px', justifyContent: 'space-between' }}>
                                <Typography className="fs14">Client: Sterling Enterprises</Typography>
                                <Typography className="fs14">Date: March 15, 2025</Typography>
                                <Typography className="fs14">Passengers: 4</Typography>
                                <Typography className="fs14">Aircraft: Heavy Jet</Typography>
                            </Box>
                            <Typography className='fs12' sx={{color: '#808080'}}>Assigned 2 hours ago</Typography>
                        </Box>
                    </Box>
                    <Box sx={{maxWidth: '470px', width: '100%', display: 'flex', gap: '10px'}}>
                        <Button variant="contained" className="btn btn-status bg-blue" onClick={ () => setInqueryModal(true)}>
                            <RemoveRedEyeIcon sx={{mr: '8px'}} /> View Details
                        </Button>
                        <Button variant="contained" className="btn btn-status bg-yellow">
                            <EditOutlinedIcon sx={{mr: '8px'}} /> Build Quote
                        </Button>
                        <Button variant="contained" className="btn btn-status bg-red">
                            <CancelOutlinedIcon sx={{mr: '8px'}} /> Reject
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>

        <CustomModal open={inqueryModal} setOpen={setInqueryModal} dataClose={() => setInqueryModal(false)} headerText="Inquiry Details - INQ-2024-001">
            <Grid container>
                <Grid item lg={6} md={6} sm={12} xs={12}>
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
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
                <Grid item lg={12}>
                    <Button variant="contained" className="btn btn-status bg-green" onClick={ () => setInqueryModal(false)}>
                        <TaskAltIcon sx={{mr: '8px', fontSize: '14px'}} /> Accept Inquiry
                    </Button>
                    <Button variant="contained" className="btn btn-status bg-red" onClick={ () => setInqueryModal(false)}>
                        <CancelOutlinedIcon sx={{mr: '8px', fontSize: '14px'}} /> Reject Inquiry
                    </Button>
                    <Button variant="outlined" className="btn btn-status" sx={{border: '1px solid #cccccc', color: '#333333'}} onClick={ () => setInqueryModal(false)}>
                        Request More Info
                    </Button>
                </Grid>
            </Grid>
        </CustomModal>
       </>
    )
}

export default Inquiries;