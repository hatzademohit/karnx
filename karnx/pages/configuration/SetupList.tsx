"use client";

import { Box, Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { ConfirmationModal, CustomModal, CustomTextField, MUIDataGrid } from "@/components";
import PageInfoBox from "@/components/PageInfoBox/PageInfoBox";
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from "@/app/context/AuthContext";
const SetupList = () => {   

    const { hasPermission } = useAuth();
    // const user_role_per = [
    //     { pageName: 'User Master', pathName: '/dashboard' },
    //     { pageName: 'Dashboard', pathName: '/dashboard' },
    //  ];
     const items = {
            user_role_per: [
                { pageName: 'User Master', pathName: '/configuration/user-master', permission: 'user read' },
                { pageName: 'Role Master', pathName: '/configuration/role-master', permission: "role read" },
                { pageName: 'Permission Master', pathName: '/configuration/permission-master', permission: 'permission read' },
                { pageName: 'Role & User Has Permission', pathName: '/configuration/role-user-permission', permission: ['role permission update', 'user permission update'] },
            ],
            client: [
                { pageName: 'Client Master', pathName: '/configuration/client-master', permission: 'client read' },
            ],
            booking_status: [
                { pageName: 'Booking Status Master', pathName: '/configuration/booking-status-master', permission: ['booking status read', 'booking status update', 'booking status delete', 'booking status create'] },
            ]
        };
        
    return(
        <Box>
            <Typography component='h1' variant="h1" sx={{color: '#03045E', mb: '24px'}}>Configuration List</Typography>
                <Grid container spacing={2}>
                    {items.user_role_per.filter((item) => hasPermission(item.permission)).length > 0 && (
                    <Grid item lg={3}>
                        <PageInfoBox Icon={<SettingsIcon />} Heading='Manage Auth Setup' listData={items.user_role_per.filter(item => hasPermission(item.permission)) } />
                    </Grid>
                    )}
                    {items.client.filter((item) => hasPermission(item.permission)).length > 0 && (
                    <Grid item lg={3}>
                        <PageInfoBox Icon={<SettingsIcon />} Heading='Client Setup' listData={items.client.filter(item => hasPermission(item.permission))} />
                    </Grid>
                    )}

                    {items.booking_status.filter((item) => hasPermission(item.permission)).length > 0 && (
                    <Grid item lg={3}>
                        <PageInfoBox Icon={<SettingsIcon />} Heading='Booking Status Setup' listData={items.booking_status.filter(item => hasPermission(item.permission))} />
                    </Grid>
                    )}
                </Grid>
        </Box>
    )
}

export default SetupList;
