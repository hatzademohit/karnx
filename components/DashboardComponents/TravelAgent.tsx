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

const TravelAgent = () => {

    const router = useRouter()
    const searchParams = useSearchParams();
    const [columns, setColumns] = useState([])
    const [inqueryData, setInqueryData] = useState(null);
    const [showDetailsTabs, setShowDetailsTabs] = useState<boolean>(false)

    const [data, setData] = useState([
       {
            "id": 92,
            "inquiryId": "BQ-REF-00092",
            "priority": [
                "NEW",
                "MEDIUM PRIORITY"
            ],
            "route": "NAG → PNQ",
            "clientName": "KarnX",
            "clientEmail": null,
            "inquiryDate": "Sep/05/2025",
            "date": "September 25, 2025",
            "passangers": 4,
            "aircraft": "Light Waight",
            "assign": "Assigned",
            "status": "Requested",
            "status_color": "#cccccc",
            "operators": "opt",
            "value": "val"
        },
    ])
   const [cardInfoData, setCardInfoData] = useState([
        { count: 24, label: 'My Bookings', status: 'This Month', icon: <ErrorOutlineIcon /> },
        { count: 3, label: 'Active Clients', status: 'Currently booking with you', icon: <ErrorOutlineIcon /> },
        { count: 15, label: 'Total Inquiries', status: 'This Month', icon: <AccessTimeOutlinedIcon /> },
        { count: 6, label: 'Inquiries Pending', status: 'This Month', icon: <AlarmOnIcon /> },
        { count: 12, label: 'Confirmed Bookings', status: 'This Week', icon: <CheckOutlinedIcon /> },
        { count: '$15750', label: 'Earnings', status: '+22% from BLRt month', icon: <CheckOutlinedIcon /> },
    ])  

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

    return(
        <>
            {!showDetailsTabs &&
                <Grid container spacing={{ md: 3, xs: 2 }}>
                    {cardInfoData && cardInfoData.map((item, index) => (
                        <Grid size={{ xl: 3, lg: 4, md: 4, sm: 6, xs: 12 }} key={index}>
                            <InfoCard InfoNumber={item.count} InfoText={item.label} InfoStatus={item.status} InfoIcon={item.icon}/>
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
                </Grid>
            }
            {showDetailsTabs &&
                <InquiryDetails inquiryData={inqueryData} hideOperatorTabs={true} itsTravelAgent={true} />
            }
        </>
    )
}

export default TravelAgent;