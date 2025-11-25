import { InfoCard, MUIDataGrid } from '@/components'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FlightIcon from '@mui/icons-material/Flight';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { RecentInquiries, Next24Hours, InquiryDetails } from '@/components/DashboardComponents';
import { apiBaseUrl } from '@/karnx/api';
import { useApi } from '@/karnx/Hooks/useApi';
import { useInquiryDetails } from '@/app/context/InquiryDetailsContext';

interface AircraftOperatorCardCount {
    assigned_inquiries?: number;
    quote_pending?: number;
    upcoming_flights?: number;
    live_flights?: number;
    completed_bookings?: number | string;
}
const AircraftOperator = () => {

    const [columns, setColumns] = useState([])
    const [inqueryData, setInqueryData] = useState(null);
    const { setShowDetailsTabs, showDetailsTabs, setInquiryId, setinquiryRowData } = useInquiryDetails()

    /** get card count from API*/
    useEffect(() => {
        fetchCardCount();
        fetchInquiries();
    }, []);

    const { data: result, refetch: fetchCardCount } = useApi<AircraftOperatorCardCount>(
        `${apiBaseUrl}/dashboard/aircraft-operator-cardcount`
    );

    const cardInfoData = [
        { count: result?.assigned_inquiries || 0, label: 'Assigned Inquiries', icon: <DescriptionOutlinedIcon /> },
        { count: result?.quote_pending || 0, label: 'Pending Quotes', icon: <AccessTimeOutlinedIcon /> },
        { count: result?.upcoming_flights || 0, label: 'Upcoming Flights', icon: <AirplanemodeActiveIcon /> },
        { count: result?.live_flights || 0, label: 'Live Flights', icon: <LocationOnOutlinedIcon /> },
        { count: result?.completed_bookings || 0, label: 'Completed Bookings', icon: <CheckOutlinedIcon /> },
    ];

    const viewInquiryDetails = (inquiryRow) => {
        setShowDetailsTabs(true)
        setInqueryData(inquiryRow);
        setInquiryId(inquiryRow?.id);
        setinquiryRowData(inquiryRow);
    }

    const { data, refetch: fetchInquiries } = useApi<any[]>(
        `${apiBaseUrl}/dashboard/aircraft-operator-charter-inquiries`
    );

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
            // { headerName: 'Operators', flex: 1, field: 'operators' },
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
                <Grid container spacing={{ md: 3, xs: 2 }}>
                    {cardInfoData && cardInfoData.map((item, index) => (
                        <Grid size={{ lg: 2.4, md: 3, sm: 6, xs: 12 }} key={index}>
                            <InfoCard InfoNumber={item.count} InfoText={item.label} InfoIcon={item.icon} />
                        </Grid>
                    ))}
                    <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                        <Box sx={{ p: { md: 2, xs: '8px' }, border: '1px solid #E6E6E6' }}>
                            <MUIDataGrid
                                headingText="Charter Inquiries"
                                gridColumns={columns}
                                gridRows={data}
                                rowHeight={70}
                            />
                        </Box>
                    </Grid>
                    {/* <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                        <RecentInquiries />
                    </Grid>
                    <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                        <Next24Hours />
                    </Grid> */}
                </Grid>
            }
            {showDetailsTabs &&
                <InquiryDetails inquiryData={inqueryData} hideOperatorTabs={true} />
            }
        </>
    )
}

export default AircraftOperator;