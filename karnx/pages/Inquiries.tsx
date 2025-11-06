'use client'
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { CustomModal, MUIDataGrid } from "@/components";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useEffect, useState } from "react";
import FlightIcon from '@mui/icons-material/Flight';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { apiBaseUrl } from '@/karnx/api';
import { useAuth } from "@/app/context/AuthContext";

const Inquiries = () => {
    const {theme} = useAuth();
    const [inqueryModal, setInqueryModal] = useState(false)
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        setColumns([
            {
                headerName: 'Inquiry ID', flex: 1, field: 'inquiryId', minWidth: 125, renderCell: (params) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', height: '100%' }}>
                        <IconButton size="small" className="table-icon-btn"> <FlightIcon /> </IconButton>
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography className="fs14"> {params.row.inquiryId} </Typography>
                            <Typography component='span' sx={{ fontSize: '10px', color: '#6B7280' }}>{params.row.inquiryDate}</Typography>
                        </Box>
                    </Box>
                ),
            },
            {
                headerName: 'Client', flex: 1, field: 'client', minWidth: 230, renderCell: (params) => (
                    <Box sx={{ alignContent: 'center', height: '100%' }}>
                        <Typography className="fs14"> {params.row.clientName} </Typography>
                        <Typography className="fs12" sx={{ color: '#808080' }}> {params.row.clientEmail} </Typography>
                    </Box>
                ),
            },
            {
                headerName: 'Route', flex: 1, field: 'route', minWidth: 115, renderCell: (params) => (
                    <Box>
                        <FlightIcon sx={{ fontSize: '14px' }} /> {params.row.route}
                    </Box>
                ),
            },
            { headerName: 'Dates', flex: 1, field: 'date', minWidth: 148 },
            {
                headerName: 'Passangers', flex: 1, field: 'passangers', minWidth: 138, renderCell: (params) => (
                    <Box sx={{ textAlign: 'center' }}>
                        <GroupOutlinedIcon sx={{ fontSize: '14px' }} />  {params.row.passangers}
                    </Box>
                ),
            },
            { headerName: 'Aircraft', flex: 1, field: 'aircraft' },
            {
                headerName: 'Status',
                field: 'status',
                minWidth: 130,
                width: 130,
                maxWidth: 130,
                renderCell: (params) => (
                    <Button variant="contained" className="btn btn-status-rounded" style={{ backgroundColor: params.row.status_color }}>
                        {params.row.status}
                    </Button>
                ),
            },
            { headerName: 'Operators', flex: 1, field: 'operators' },
            { headerName: 'Value', flex: 1, field: 'value' },
            {
                headerName: 'Action',
                field: 'action',
                sortable: false,
                filterable: false,
                width: 150,
                maxWidth: 150,
                minWidth: 150,
                renderCell: (params) => (
                    <Button variant="contained" onClick={() => console.log(params?.row?.inquiryId)} className="btn btn-status bg-blue">
                        <RemoveRedEyeIcon sx={{ mr: '8px' }} /> View Details
                    </Button>
                ),
            },
        ])
    }, []);
    const fetchInquiries = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/booking-inquiries`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`,
                },
            });
            const data = await response.json();
            setData(data.data);
        } catch (error) {
            console.error("Error fetching inquiries:", error);
        }
    };
    useEffect(() => {
        fetchInquiries();
    }, []);
    return (
        <>
            <Typography component='h1' variant="h1" sx={{color: theme?.heading?.color, mb: theme?.heading?.marginBottom }}>Charter Inquiries</Typography>
            <Box sx={{ p: { md: 2, xs: '8px' }, border: '1px solid #E6E6E6' }}>
                <MUIDataGrid
                    gridColumns={columns}
                    gridRows={data}
                    rowHeight={70}
                />
            </Box>
            
            <CustomModal open={inqueryModal} setOpen={setInqueryModal} dataClose={() => setInqueryModal(false)} headerText="Inquiry Details - INQ-2024-001">
                <Grid container spacing={2}>
                    <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                        <Typography component='h4' variant="h4" sx={{ mb: '12px' }}>Flight Details</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Typography component='h6' variant="h6">Route:</Typography>
                                <Typography sx={{ color: '#4D4D4D' }}>LHR → JFK</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Typography component='h6' variant="h6">Date:</Typography>
                                <Typography sx={{ color: '#4D4D4D' }}>March 15, 2025</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                        <Typography component='h4' variant="h4" sx={{ mb: '12px' }}>Client Information</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Typography component='h6' variant="h6">Client:</Typography>
                                <Typography sx={{ color: '#4D4D4D' }}>Sterling Enterprises</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Typography component='h6' variant="h6">Priority:</Typography>
                                <Typography sx={{ color: '#4D4D4D' }}>High</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", gap: '10px' }} className='modal-footer'>
                            <Button variant="contained" className="btn btn-status bg-green" onClick={() => setInqueryModal(false)}>
                                <TaskAltIcon sx={{ mr: '8px', fontSize: '14px' }} /> Accept Inquiry
                            </Button>
                            <Button variant="contained" className="btn btn-status bg-red" onClick={() => setInqueryModal(false)}>
                                <CancelOutlinedIcon sx={{ mr: '8px', fontSize: '14px' }} /> Reject Inquiry
                            </Button>
                            <Button variant="outlined" className="btn btn-status" sx={{ border: '1px solid #cccccc', color: '#333333' }} onClick={() => setInqueryModal(false)}>
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