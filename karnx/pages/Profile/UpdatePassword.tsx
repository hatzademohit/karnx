"use client";

import { Box, Button, Grid, IconButton, InputAdornment, MenuItem, Tooltip, Typography } from "@mui/material";
import { ConfirmationModal, CustomModal, CustomTextField, MUIDataGrid, SingleSelect } from "@/components";
import { useEffect, useState } from "react";
import { apiBaseUrl } from '@/karnx/api';
import { toast } from 'react-toastify';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useAuth } from "@/app/context/AuthContext";
const UpdatePassword = () => {
    const { user } = useAuth();
    const [inputType, setInputType] = useState('password');
    const inputOldPassCheck = () => {
        setInputType(inputType === 'text' ? 'password' : 'text');
    };

    const inputNewPassCheck = () => {
        setInputType(inputType === 'text' ? 'password' : 'text');
    };
    return (
        <Box>
            <Typography component='h1' variant="h1">Update Password</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <CustomTextField inputLabel="Old Password"  placeholder="Enter Old Password" type={inputType} InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size='small' onClick={ () => inputOldPassCheck()}>
                          {inputType === 'password' ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomTextField inputLabel="New Password" placeholder="Enter New Password" type={inputType} InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size='small' onClick={() => inputNewPassCheck()}>
                          {inputType === 'password' ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomTextField inputLabel="Confirm Password" placeholder="Enter Confirm Password" type="text" />
                </Grid>
            </Grid>
        </Box>
    )
}
export default UpdatePassword;