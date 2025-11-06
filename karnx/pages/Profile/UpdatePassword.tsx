"use client";

import { Box, Button, Grid, IconButton, InputAdornment, Typography, Paper } from "@mui/material";
import { CustomTextField } from "@/components";
import { useState } from "react";
import { apiBaseUrl } from "@/karnx/api";
import { toast } from "react-toastify";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useAuth } from "@/app/context/AuthContext";

const UpdatePassword = () => {
    const { user } = useAuth();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [oldPassType, setOldPassType] = useState("password");
    const [newPassType, setNewPassType] = useState("password");
    const [confirmPassType, setConfirmPassType] = useState("password");

    const toggleOldPass = () => setOldPassType(oldPassType === "password" ? "text" : "password");
    const toggleNewPass = () => setNewPassType(newPassType === "password" ? "text" : "password");
    const toggleConfirmPass = () => setConfirmPassType(confirmPassType === "password" ? "text" : "password");

    const handleSubmit = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }
        if (oldPassword === newPassword) {
            toast.error("New password cannot be the same as old password");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }
        const current_password = oldPassword;
        const new_password = newPassword;
        const new_password_confirmation = confirmPassword;
        try {
            const res = await fetch(`${apiBaseUrl}/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`,
                },
                body: JSON.stringify({ userId: user?.id, current_password, new_password, new_password_confirmation }),
            });

            if (!res.ok) {
                const err = await res.json();
                toast.error(err.message || "Failed to update password");
                return;
            }

            toast.success("Password updated successfully!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <Box>
            <Grid container justifyContent="center" alignItems="center">
                <Grid size={{ lg: 5, md: 6, sm: 8, xs: 12 }}>
                    <Paper elevation={3} sx={{ padding: "2rem", pt: 2, borderRadius: "10px" }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <Typography component="h1" variant="h1">
                                    Update Password
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Old Password"
                                    placeholder="Enter Old Password"
                                    type={oldPassType}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton size="small" onClick={toggleOldPass}>
                                                    {oldPassType === "password" ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <CustomTextField
                                    inputLabel="New Password"
                                    placeholder="Enter New Password"
                                    type={newPassType}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton size="small" onClick={toggleNewPass}>
                                                    {newPassType === "password" ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Confirm Password"
                                    placeholder="Enter Confirm Password"
                                    type="text"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                // InputProps={{
                                //   endAdornment: (
                                //     <InputAdornment position="end">
                                //       <IconButton size="small" onClick={toggleConfirmPass}>
                                //         {confirmPassType === "password" ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                //       </IconButton>
                                //     </InputAdornment>
                                //   ),
                                // }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Button variant="contained" className="btn btn-blue" onClick={handleSubmit}>
                                    Update Password
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UpdatePassword;
