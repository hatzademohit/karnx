"use client";

import { Box, Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { ConfirmationModal, CustomModal, CustomTextField, MUIDataGrid } from "@/components";
import PageInfoBox from "@/components/PageInfoBox/PageInfoBox";
import SettingsIcon from '@mui/icons-material/Settings';
const SetupList = () => {   


    // const user_role_per = [
    //     { pageName: 'User Master', pathName: '/dashboard' },
    //     { pageName: 'Dashboard', pathName: '/dashboard' },
    //  ];
     const items = {
            user_role_per: [
                { pageName: 'User Master', pathName: '/configuration/user-master' },
                { pageName: 'Role Master', pathName: '/configuration/role-master' },
                { pageName: 'Permission Master', pathName: '/configuration/permission-master' },
                { pageName: 'Role & User Has Permission', pathName: '/configuration/role-user-permission' },
            ],
            client: [
                { pageName: 'Client Master', pathName: '/configuration/client-master' },
            ]
        };
    return(
        <Box>
            <Typography component='h1' variant="h1" sx={{color: '#03045E', mb: '24px'}}>Configuration List</Typography>
                <Grid container spacing={2}>
                    <Grid item lg={4}>
                        <PageInfoBox Icon={<SettingsIcon />} Heading='Manage Auth Setup' listData={items.user_role_per} />
                    </Grid>
                    <Grid item lg={4}>
                        <PageInfoBox Icon={<SettingsIcon />} Heading='Client Setup' listData={items.client} />
                    </Grid>
                    
                </Grid>
        </Box>
    )
}

export default SetupList;
