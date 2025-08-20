import { InfoCard } from '@/components'
import { Grid } from '@mui/material';
import { useState } from 'react';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { RecentInquiries, Next24Hours } from '@/components/DashboardComponents';

const AircraftOperator = () => {
    const [cardInfoData, setCardInfoData] = useState([
        { count: 8, label: 'Assigned Inquiries', icon: <DescriptionOutlinedIcon /> },
        { count: 5, label: 'Pending Quotes', icon: <AccessTimeOutlinedIcon /> },
        { count: 12, label: 'Upcoming Flights', icon: <AirplanemodeActiveIcon /> },
        { count: 3, label: 'Live Flights', icon: <LocationOnOutlinedIcon /> },
        { count: 10, label: 'Completed Bookings', icon: <CheckOutlinedIcon /> },
    ])

    return(
        <Grid container spacing={3}>
            {cardInfoData && cardInfoData.map((item, index) => (
                <Grid item lg={2.4} md={3} sm={6} xs={12} key={index}>
                    <InfoCard InfoNumber={item.count} InfoText={item.label} InfoIcon={item.icon}/>
                </Grid>
            ))}
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <RecentInquiries />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <Next24Hours />
            </Grid>
        </Grid>
    )
}

export default AircraftOperator;