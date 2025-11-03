import React, { useState, useEffect } from 'react';
import { InfoCard, MUIDataGrid } from '@/components'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { ActivityTimeLine, PriorityTasks, InquiryDetails } from '@/components/DashboardComponents';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FlightIcon from '@mui/icons-material/Flight';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { apiBaseUrl } from '@/karnx/api';
import { useRouter, useSearchParams } from "next/navigation";
import { useApi } from '@/karnx/Hooks/useApi';

const KXManager = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [cardInfoData, setCardInfoData] = useState([
        { count: 2, label: 'New Inquiries', status: 'Unprocessed', desc: '+2 today', icon: <ErrorOutlineIcon /> },
        { count: 15, label: 'Quotes Pending', status: 'Operator Response', desc: 'Avg 4.2h response', icon: <AccessTimeOutlinedIcon /> },
        { count: 12, label: 'Client Decisions', status: 'Pending Review', desc: '2 expiring soon', icon: <AlarmOnIcon /> },
        { count: 3, label: 'Confirmed Bookings', status: 'This Week', desc: '$2.4M revenue', icon: <CheckCircleOutlineIcon /> },
        { count: 10, label: 'Response Time', status: 'Average', desc: '12% improvement', icon: <TrendingUpIcon /> },
    ])    
    const [columns, setColumns] = useState([])
    // const [data, setData] = useState([])
    const [inqueryData, setInqueryData] = useState(null);
    const [showDetailsTabs, setShowDetailsTabs] = useState<boolean>(false)

    const { data, refetch: fetchInquiries } = useApi<any[]>(
        `${apiBaseUrl}/booking-inquiries`
    );

    const viewInquiryDetails = (inquiryRow) => {
        setShowDetailsTabs(true)
        setInqueryData(inquiryRow);
    }

    useEffect(() => {
        setColumns([
            {
                headerName: 'Inquiry ID', flex: 1, field: 'inquiryId', minWidth: 175, renderCell: (params) => (
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
                headerName: 'Client', flex: 1, field: 'client', minWidth: 100, renderCell: (params) => (
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
                    <Button variant="contained" className="btn btn-status-rounded" sx={{ backgroundColor: params.row.status_color }}>
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
                    <Button variant="contained" onClick={() => viewInquiryDetails(params.row)} className="btn btn-status bg-blue">
                        <RemoveRedEyeIcon sx={{ mr: '8px' }} /> View Details
                    </Button>
                ),
            },
        ])
    }, []);

    useEffect(() => {
        fetchInquiries();
    }, []);

    return(
        <>
            {!showDetailsTabs &&
                <Grid container spacing={3}>
                    {cardInfoData && cardInfoData.map((item, index) => (
                        <Grid size={{ lg: 2.4, md: 3, sm: 6, xs: 12 }} key={index}>
                            <InfoCard InfoNumber={item.count} InfoText={item.label} InfoStatus={item.status} InfoDesc={item.desc} InfoIcon={item.icon}/>
                        </Grid>
                    ))}
                    <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                        <ActivityTimeLine />
                    </Grid>
                    <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                        <PriorityTasks />
                    </Grid>
                    <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                        <Box sx={{ padding: '24px', border: '1px solid #E6E6E6' }}>
                            <MUIDataGrid
                                headingText="Charter Inquiries"
                                gridColumns={columns}
                                gridRows={data}
                                rowHeight={70}
                            />
                        </Box>
                    </Grid>
                </Grid>
            }
            {showDetailsTabs &&
                <InquiryDetails inquiryData={inqueryData} />
            }
            
        </>
    )
}

export default KXManager;