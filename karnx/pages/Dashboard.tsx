'use client'
import { CustomTabs } from "@/components";
import { Box, Typography } from "@mui/material"
import { AircraftOwner, AircraftOperator, TravelAgent, GHS } from '@/components/DashboardComponents'

const Dashboard = () => {
    return(
        <Box>            
            <Typography component='h1' variant="h1" sx={{mb: '10px'}}>Dashboard</Typography>
            <CustomTabs defaultValue={0}>
                <CustomTabs.Tab label="Aircraft Owner">
                    <AircraftOwner />
                </CustomTabs.Tab>
                <CustomTabs.Tab label="Aircraft Operator">
                    <AircraftOperator />
                </CustomTabs.Tab>
                <CustomTabs.Tab label="Travel Agent">
                    <TravelAgent />
                </CustomTabs.Tab>
                <CustomTabs.Tab label="GHS">
                    <GHS />
                </CustomTabs.Tab>
            </CustomTabs>
        </Box>
    )
}

export default Dashboard;