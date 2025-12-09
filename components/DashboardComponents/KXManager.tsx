import React, { useState, useEffect } from 'react';
import { CustomModal, InfoCard, MUIDataGrid } from '@/components'
import { Box, Button, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { ActivityTimeLine, PriorityTasks, InquiryDetails } from '@/components/DashboardComponents';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FlightIcon from '@mui/icons-material/Flight';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { apiBaseUrl } from '@/karnx/api';
import { useApi } from '@/karnx/Hooks/useApi';
import { useInquiryDetails } from '@/app/context/InquiryDetailsContext';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface KXManagerCardCount {
    new_inquiries?: number;
    quote_pending?: number;
    clients_decision?: number;
    confirmed_booking?: number;
    response_time?: number | string;
    clients_decision_expiring_soon?: number;
}

const KXManager = () => {

    const theme = useTheme();
    const { setInquiryId, setinquiryRowData, showDetailsTabs, setShowDetailsTabs } = useInquiryDetails();
    const [introducingPopupOpen, setIntroducingPopupOpen] = useState<boolean>(false);

    const { data: result, refetch: fetchCardCount } = useApi<KXManagerCardCount>(
        `${apiBaseUrl}/dashboard/kxmanager-cardcount`
    );

    const cardInfoData = [
        { count: result?.new_inquiries || 0, label: 'New Inquiries', status: 'Unprocessed', desc: '+2 today' },
        { count: result?.quote_pending || 0, label: 'Quotes Pending', status: 'Operator Response', desc: 'Avg 4.2h response' },
        { count: result?.clients_decision || 0, label: 'Client Decisions', status: 'Pending Review', desc: `${result?.clients_decision_expiring_soon} expiring soon` },
        { count: result?.confirmed_booking || 0, label: 'Confirmed Bookings', status: 'This Week', desc: '$2.4M revenue' },
        { count: result?.response_time || 0, label: 'Response Time', status: 'Average', desc: '12% improvement' },
    ]
    const [columns, setColumns] = useState([])
    const [inqueryData, setInqueryData] = useState(null);

    const { data, refetch: fetchInquiries } = useApi<any[]>(
        `${apiBaseUrl}/dashboard/kxmanager-charter-inquiries`
    );

    const viewInquiryDetails = (inquiryRow) => {
        setShowDetailsTabs(true)
        setInqueryData(inquiryRow);
        setInquiryId(inquiryRow?.id);
        setinquiryRowData(inquiryRow);
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
        if (!showDetailsTabs) {
            fetchInquiries();
            fetchCardCount();
        }
    }, [showDetailsTabs]);

    return (
        <>
            {!showDetailsTabs &&
                <>
                    <Grid container spacing={{ md: 3, xs: 2 }}>
                        {cardInfoData && cardInfoData.map((item, index) => (
                            <Grid size={{ xl: 2.4, lg: 3, md: 4, sm: 6, xs: 12 }} key={index}>
                                <InfoCard InfoNumber={item.count} InfoText={item.label} InfoStatus={item.status} InfoDesc={item.desc} />
                            </Grid>
                        ))}
                    </Grid>
                    <Grid container spacing={{ md: 3, xs: 2 }} mt={2}>
                        <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
                            <ActivityTimeLine />
                        </Grid>
                        <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
                            <PriorityTasks />
                        </Grid>
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
                    </Grid>
                </>
            }
            {showDetailsTabs &&
                <InquiryDetails inquiryData={inqueryData} />
            }

            {/* <Button onClick={() => setIntroducingPopupOpen(true)}>modal open</Button> */}

            {/* Introducing popup */}
            <CustomModal open={introducingPopupOpen} dataClose={() => setIntroducingPopupOpen(false)} headerText="Introducing Astha">
                <Grid container spacing={3} sx={{ alignItems: 'center' }}>
                    <Grid size={6}>
                        <Typography variant='h1' sx={{ color: theme?.common?.blueColor }}>Discover the Spirit of India</Typography>
                        <Typography variant='body1' sx={{ mt: 2 }}>
                            Experience India's rich cultural diversity through sacred pilgrimages. Journey to ancient temples, holy rivers, and spiritual destinations aboard exclusive private charters.
                        </Typography>
                        <Box sx={{ mt: 3, display: 'flex', gap: 1.5, alignItems: 'center', color: theme?.common?.redColor }}>
                            <NotificationsIcon sx={{ color: 'inherit' }} />
                            <Typography variant='h5' sx={{ color: 'inherit' }}>Fly to Faith – Your Spiritual Journey Awaits</Typography>
                        </Box>
                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Button variant="contained" size='large' onClick={() => setIntroducingPopupOpen(false)}>
                                Book Now
                            </Button>
                            <Button variant="contained" size='large' onClick={() => setIntroducingPopupOpen(false)}>
                                Maybe Later
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </CustomModal>
        </>
    )
}

export default KXManager;