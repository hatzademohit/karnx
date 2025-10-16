"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { CustomTextField } from "@/components";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import {apiBaseUrl} from '@/karnx/api';

interface LoginFormInputs {
  email: string;
}

const ForgotPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
    },
  });

  const {setAlertMessage, setLoader, setOpenAlert, setSeverity, theme} = useAuth();
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/forgot-password`, {
        email: data.email
      });

      setAlertMessage(response.data.message);
      setOpenAlert(true);
      setSeverity('success');
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        setAlertMessage(error.response.data.message || "Invalid credentials");
        setOpenAlert(true);
        setSeverity('error');
      } else {
        setAlertMessage("Something went wrong. Please try again.");
        setOpenAlert(true);
        setSeverity('error');
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <Box className="login-page">
      <Box className="img-section">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-100 h-100 object-cover"
        >
          <source src={theme?.images?.loginBg} type="video/mp4" />
        </video>
      </Box>

      <Box className="input-section">
        <Image className="img-fluid" src={theme.images.logo} alt="logo" />
        <Box>
          <Typography component="h3" variant="h3" sx={{ width: "100%" }}>
            Reset Your Password
          </Typography>
          <Typography className="fs14">
            Enter your email address and we'll send you a link to reset your password
          </Typography>
        </Box>

        <Typography component='form' sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: '16px'}} onSubmit={handleSubmit(onSubmit)}>
          
          <Box sx={{ position: "relative" }}>
            <Link href="/" className="forgot-link">
              Go to Login
            </Link>
            <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                    <CustomTextField
                        {...field}
                        inputLabel="Email"
                        placeholder="Enter your email address"
                        variant="outlined"
                        size="small"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                )}
            />
          </Box>

          <Button
            className="btn btn-blue"
            variant="contained"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
