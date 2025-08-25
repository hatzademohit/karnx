"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, InputAdornment, Typography, Paper, Avatar } from "@mui/material";
import { CustomTextField } from "@/components";
import { toast } from "react-toastify";
import { apiBaseUrl, fileStorageUrl } from "@/karnx/api";

const MyProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    avatar: "",
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.token;
        const res = await fetch(apiBaseUrl + "/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        if (json.data) {
          setProfile(json.data);
        }
      } catch (error) {
        toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    formData.append("dob", profile.dob);
    formData.append("gender", profile.gender);
    if (file) {
        formData.append("avatar", file); // include file only if selected
    }

    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${apiBaseUrl}/profile`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`, // DO NOT set Content-Type
            },
            body: formData,
        });

        const json = await res.json();
        if (res.ok) {
            toast.success("Profile updated successfully");
        } else {
            toast.error(json.message || "Failed to update profile");
        }
    } catch (error) {
        toast.error("Error updating profile");
    }
};


  return (
    <Box>
      <Typography component="h1" variant="h1">
        Update Profile
      </Typography>
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6} lg={5}>
        <Paper elevation={3} style={{ padding: "2rem", borderRadius: "10px" }}>

          <Grid container spacing={2}>
            {/* Avatar */}
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Avatar
                src={profile.avatar ? fileStorageUrl + profile.avatar : "/default-avatar.png"}
                alt="avatar"
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </Grid>

            {/* Name */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
            
                inputLabel="Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                
                inputLabel="Email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                
                inputLabel="Phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </Grid>

            {/* DOB */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                
                type="date"
                inputLabel="Date of Birth"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                InputinputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Gender */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                
                inputLabel="Gender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
    </Box>
  );
};

export default MyProfile;
