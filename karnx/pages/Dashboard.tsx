'use client'
import { CustomTabs, TableComp } from "@/components";
import { Box, Button, IconButton, Typography } from "@mui/material"
import { KXManager, AircraftOperator, TravelAgent, GHS } from '@/components/DashboardComponents'
import { useAuth } from "@/app/context/AuthContext";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Dashboard = () => {
    const { user } = useAuth();
    const { showDetailsTabs, setShowDetailsTabs, setAdultsChild, setbookingDetails, setQuoteDetails, setCreateNewQuote } = useInquiryDetails();

    return (
        <Box className="dashbaord-page">
            <Box sx={{ mb: '10px', display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
                {/* <Typography component='h1' variant="h1">Dashboard</Typography> */}
                {showDetailsTabs &&
                    <Button sx={{ ml: 'auto' }} onClick={() => { setShowDetailsTabs(false); setAdultsChild([]); setbookingDetails([]); setQuoteDetails([]); setCreateNewQuote(false) }}><KeyboardBackspaceIcon sx={{ mr: 0.5 }} />Back to Inquiries</Button>
                }
            </Box>
            {/* <CustomTabs defaultValue={0}> */}
            {user.access_type === 'Portal Admin' &&
                // <CustomTabs.Tab label="KX Manager">
                <KXManager />
                // </CustomTabs.Tab>
            }

            {user.access_type === 'Aircraft Operator' &&
                // <CustomTabs.Tab label="Aircraft Operator">
                <AircraftOperator />
                // </CustomTabs.Tab>
            }

            {user.access_type === 'Aircraft Travel Agent' &&
                // <CustomTabs.Tab label="Travel Agent">
                <TravelAgent />
                // </CustomTabs.Tab>
            }

            {user.access_type === 'Portal GHS' &&
                // <CustomTabs.Tab label="GHS">
                <GHS />
                // </CustomTabs.Tab>
            }
            {/* </CustomTabs> */}

        </Box>
    )
}

export default Dashboard;