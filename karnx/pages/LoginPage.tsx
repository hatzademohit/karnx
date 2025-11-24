"use client";

import { useState } from "react";
import { Box, Button, IconButton, InputAdornment, Typography } from "@mui/material";
import Image from "next/image";
import { CustomTextField } from "@/components";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { apiBaseUrl } from '@/karnx/api';
import { useRouter } from "next/navigation";

interface LoginFormInputs {
  userId: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      userId: "",
      password: "",
      rememberMe: true,
    },
  });

  const router = useRouter();
  const [inputType, setInputType] = useState('password');

  const inputChange = () => {
    setInputType(inputType === 'text' ? 'password' : 'text');
  };
  const { setAlertMessage, setLoader, setOpenAlert, setSeverity, currentTime, theme } = useAuth();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/login`, {
        email: data.userId,
        password: data.password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("permissions", JSON.stringify(response.data.permissions));
      localStorage.setItem("role", response.data.role);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem('loginTime', currentTime); // session manager

      // Set session cookies for middleware-based access control
      await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          role: response.data.role,
          access_type: response.data.access_type,
          permissions: response.data.permissions,
        }),
      });

      setAlertMessage(response.data.message);
      setOpenAlert(true);
      setSeverity('success');
      router.push("/dashboard");
    } catch (error: any) {
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
          <source src={theme?.images?.loginBgVideo} type="video/mp4" />
        </video>
        {/* <Image src={theme?.images?.loginBg} alt="img-not-found" /> */}
      </Box>

      <Box className="input-section">
        <Image className="img-fluid" src={theme.images.logo} alt="logo" />
        <Typography component="h3" variant="h3" sx={{ width: "100%" }}>
          Login to your account
        </Typography>

        <Typography component='form' sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="userId"
            control={control}
            rules={{ required: "User email is required" }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                inputLabel="User Email"
                placeholder="Enter your user email"
                variant="outlined"
                size="small"
                error={!!errors.userId}
                helperText={errors.userId?.message}
              />
            )}
          />

          <Box sx={{ position: "relative" }}>
            <Link href="/forgot-password" className="forgot-link">
              Forgot password
            </Link>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  inputLabel="Password"
                  type={inputType}
                  placeholder="Password"
                  variant="outlined"
                  size="small"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size='small' onClick={inputChange}>
                          {inputType === 'password' ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} size="small" checked={field.value} />}
                  label="Remember for 30 days"
                />
              )}
            /> */}
          </Box>

          <Button
            className="btn btn-blue"
            variant="contained"
            type="submit"
            fullWidth
          >
            Login
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
