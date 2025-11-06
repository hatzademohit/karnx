import { InfoCard, MUIDataGrid } from '@/components'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FlightIcon from '@mui/icons-material/Flight';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { useRouter, useSearchParams } from 'next/navigation';
import { InquiryDetails } from '@/components/DashboardComponents';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { apiBaseUrl } from '@/karnx/api';
import { useApi } from '@/karnx/Hooks/useApi';

interface TravelAgentCardCount {
    this_month_mybooking?: number;
    my_booking_active_clients?: number;
    total_inquiries_this_month?: number;
    inquiry_pending_this_month?: number;
    confirmed_booking_this_week?: number;
    earning?: number | string;
}

const TravelAgent = () => {

    const router = useRouter()
    const searchParams = useSearchParams();
    const [columns, setColumns] = useState([])
    const [inqueryData, setInqueryData] = useState(null);
    const [showDetailsTabs, setShowDetailsTabs] = useState<boolean>(false)

    /** get card count from API*/
    useEffect(() => {
        fetchCardCount();
        fetchCharterInquiries();
    }, []);

    const { data: result, refetch: fetchCardCount } = useApi<TravelAgentCardCount>(
        `${apiBaseUrl}/dashboard/travelagent-cardcount`
    );

    const cardInfoData = [
        { count: result?.this_month_mybooking, label: 'My Bookings', status: 'This Month', icon: <ErrorOutlineIcon /> },
        { count: result?.my_booking_active_clients, label: 'Active Clients', status: 'Currently booking with you', icon: <ErrorOutlineIcon /> },
        { count: result?.total_inquiries_this_month, label: 'Total Inquiries', status: 'This Month', icon: <AccessTimeOutlinedIcon /> },
        { count: result?.inquiry_pending_this_month, label: 'Inquiries Pending', status: 'This Month', icon: <AlarmOnIcon /> },
        { count: result?.confirmed_booking_this_week, label: 'Confirmed Bookings', status: 'This Week', icon: <CheckOutlinedIcon /> },
        { count: '$' + result?.earning, label: 'Earnings', status: '+22% from BLRt month', icon: <CheckOutlinedIcon /> },
    ];

    const { data: data, refetch: fetchCharterInquiries } = useApi<any[]>(
        `${apiBaseUrl}/dashboard/travelagent-charter-inquiries`
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

    return (
        <>
            {!showDetailsTabs &&
                <Grid container spacing={3}>
                    {cardInfoData && cardInfoData.map((item, index) => (
                        <Grid size={{ lg: 2, md: 3, sm: 6, xs: 12 }} key={index}>
                            <InfoCard InfoNumber={item.count} InfoText={item.label} InfoStatus={item.status} InfoIcon={item.icon} />
                        </Grid>
                    ))}
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
                <InquiryDetails inquiryData={inqueryData} hideOperatorTabs={true} itsTravelAgent={true} />
            }
        </>
    )
}

export default TravelAgent;