'use client'
import { CustomTabs } from "@/components";
import { Box, Typography } from "@mui/material"
import { KXManager, AircraftOperator, TravelAgent, GHS } from '@/components/DashboardComponents'
import { useAuth } from "@/app/context/AuthContext";
import { InquiryDetailsProvider } from "@/app/context/InquiryDetailsContext";

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <InquiryDetailsProvider>
            <Box>
                <Typography component='h1' variant="h1" sx={{ mb: '10px' }}>Dashboard</Typography>
                <CustomTabs defaultValue={0}>
                    {user.access_type === 'Portal Admin' &&
                        <CustomTabs.Tab label="KX Manager">
                            <KXManager />
                        </CustomTabs.Tab>
                    }

                    {user.access_type === 'Aircraft Operator' &&
                        <CustomTabs.Tab label="Aircraft Operator">
                            <AircraftOperator />
                        </CustomTabs.Tab>
                    }

                    {user.access_type === 'Aircraft Travel Agent' &&
                        <CustomTabs.Tab label="Travel Agent">
                            <TravelAgent />
                        </CustomTabs.Tab>
                    }

                    {user.access_type === 'Portal GHS' &&
                        <CustomTabs.Tab label="GHS">
                            <GHS />
                        </CustomTabs.Tab>
                    }
                </CustomTabs>
            </Box>
        </InquiryDetailsProvider>
    )
}

export default Dashboard;