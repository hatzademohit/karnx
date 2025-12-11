'use client'
import { CustomTabs, TableComp } from "@/components";
import { Box, Button, IconButton, Typography } from "@mui/material"
import { KXManager, AircraftOperator, TravelAgent, GHS } from '@/components/DashboardComponents'
import { useAuth } from "@/app/context/AuthContext";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Dashboard = () => {
    const { user } = useAuth();
    const { showDetailsTabs, setShowDetailsTabs } = useInquiryDetails();

    const data = [
        {
            name: {
                firstName: 'John',
                lastName: 'Doe',
            },
            address: '261 Erdman Ford',
            city: 'East Daphne',
            state: 'Kentucky',
        },
        {
            name: {
                firstName: 'Jane',
                lastName: 'Doe',
            },
            address: '769 Dominic Grove',
            city: 'Columbus',
            state: 'Ohio',
        },
        {
            name: {
                firstName: 'Joe',
                lastName: 'Doe',
            },
            address: '566 Brakus Inlet',
            city: 'South Linda',
            state: 'West Virginia',
        },
        {
            name: {
                firstName: 'Kevin',
                lastName: 'Vandy',
            },
            address: '722 Emie Stream',
            city: 'Lincoln',
            state: 'Nebraska',
        },
        {
            name: {
                firstName: 'Joshua',
                lastName: 'Rolluffs',
            },
            address: '32188 Larkin Turnpike',
            city: 'Omaha',
            state: 'Nebraska',
        },
    ];

    const columns = [
        {
            accessorKey: 'name.firstName', //access nested data with dot notation
            header: 'First Name',
            size: 150,
        },
        {
            accessorKey: 'name.lastName',
            header: 'Last Name',
            size: 150,
        },
        {
            accessorKey: 'address', //normal accessorKey
            header: 'Address',
            size: 200,
        },
        {
            accessorKey: 'city',
            header: 'City',
            size: 150,
        },
        {
            accessorKey: 'state',
            header: 'State',
            size: 150,
        },
    ]

    return (
        <Box>
            <Box sx={{ mb: '10px', display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
                {/* <Typography component='h1' variant="h1">Dashboard</Typography> */}
                {showDetailsTabs &&
                    <Button sx={{ ml: 'auto' }} onClick={() => setShowDetailsTabs(false)}><KeyboardBackspaceIcon sx={{ mr: 0.5 }} />Back to Inquiries</Button>
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
            {/* <TableComp columns={columns} data={data} /> */}
        </Box>
    )
}

export default Dashboard;