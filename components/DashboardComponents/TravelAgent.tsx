import { InfoCard, MUIDataGrid } from '@/components'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FlightIcon from '@mui/icons-material/Flight';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { InquiryDetails } from '@/components/DashboardComponents';
import { apiBaseUrl } from '@/karnx/api';
import { useApi } from '@/karnx/Hooks/useApi';
import { useInquiryDetails } from '@/app/context/InquiryDetailsContext';
import useApiFunction from '@/karnx/Hooks/useApiFunction';
import { toast } from 'react-toastify';

interface TravelAgentCardCount {
    this_month_mybooking?: number;
    this_month_mybooking_ids?: string;
    my_booking_active_clients?: number;
    total_inquiries_this_month?: number;
    total_inquiries_this_month_ids?: string;
    inquiry_pending_this_month?: number;
    inquiry_pending_this_month_ids?: string;
    confirmed_booking_this_week?: number;
    confirmed_booking_this_week_ids?: string;
    earning?: number | string;
}
type cardActiveProps = {
    class: string;
    index: number;
}

const TravelAgent = () => {
    const callApi = useApiFunction();
    const [columns, setColumns] = useState([])
    const [inqueryData, setInqueryData] = useState(null);
    const { setInquiryId, setinquiryRowData, showDetailsTabs, setShowDetailsTabs } = useInquiryDetails();
    const [data, setInqueryTableData] = useState([]);
    const [isCardActiveClass, setIsCardActiveClass] = useState<cardActiveProps>();
    /** get card count from API*/
    useEffect(() => {
        if (!showDetailsTabs) {
            fetchCharterInquiries('');
            fetchCardCount();
            setIsCardActiveClass(undefined)
        }
    }, [showDetailsTabs]);

    const { data: result, refetch: fetchCardCount } = useApi<TravelAgentCardCount>(
        `${apiBaseUrl}/dashboard/travelagent-cardcount`
    );

    const cardInfoData = [
        { count: result?.this_month_mybooking || 0, ids: result?.this_month_mybooking_ids, label: 'My Bookings', status: 'This Month' },
        //{ count: result?.my_booking_active_clients || 0, label: 'Active Clients', status: 'Currently booking with you' },
        { count: result?.total_inquiries_this_month || 0, ids: result?.total_inquiries_this_month_ids, label: 'Total Inquiries', status: 'This Month' },
        { count: result?.inquiry_pending_this_month || 0, ids: result?.inquiry_pending_this_month_ids, label: 'Inquiries Pending', status: 'This Month' },
        { count: result?.confirmed_booking_this_week || 0, ids: result?.confirmed_booking_this_week_ids, label: 'Confirmed Bookings', status: 'This Week' },
        //{ count: '$' + result?.earning || 0, label: 'Earnings', status: '+22% from BLRt month' },
    ];

    // const { data: data, refetch: fetchCharterInquiries } = useApi<any[]>(
    //     `${apiBaseUrl}/dashboard/travelagent-charter-inquiries`
    // );

    const fetchCharterInquiries = async (param: any) => {
        try {
            const ids = param ? `?ids=${param}` : '';
            const res = await callApi({ method: 'GET', url: `${apiBaseUrl}/dashboard/travelagent-charter-inquiries${ids}` });
            if (res?.status === true) {
                setInqueryTableData(res.data);
            } else {
                toast.error(res?.message || '');
            }
        } catch (e) {
            //toast.error('Network error while fetching aircraft');
        }
    }

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
            // {
            //     headerName: 'Client', flex: 1, field: 'client', minWidth: 100, renderCell: (params) => (
            //         <Box sx={{ alignContent: 'center', height: '100%' }}>
            //             <Typography className="fs14"> {params.row.clientName} </Typography>
            //             <Typography className="fs12" sx={{ color: '#808080' }}> {params.row.clientEmail} </Typography>
            //         </Box>
            //     ),
            // },
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
            { headerName: 'Operator', flex: 1, field: 'operator' },
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
                <Grid container spacing={{ md: 2, xs: 2 }}>
                    {cardInfoData && cardInfoData.map((item, index) => (
                        <Grid size={{ xl: 3, lg: 4, md: 4, sm: 6, xs: 12 }} key={index} onClick={() => { fetchCharterInquiries((item.ids).toString()); setIsCardActiveClass({ class: 'active', index: index }) }}>
                            <InfoCard InfoNumber={(item.count != undefined) ? item.count : 0} InfoText={item.label} InfoStatus={item.status} className={index === isCardActiveClass?.index && isCardActiveClass?.class} />
                        </Grid>
                    ))}
                    <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
                        <Box sx={{ p: { md: 2, xs: '8px' }, border: '1px solid #E6E6E6' }}>
                            <MUIDataGrid
                                headingText="Charter Inquiries"
                                gridColumns={columns}
                                gridRows={data}
                                rowHeight={70}
                                clearFilter={() => { isCardActiveClass && fetchCharterInquiries(''); setIsCardActiveClass(undefined) }}
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