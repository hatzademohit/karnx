"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { CustomTextField } from "@/components";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import {apiBaseUrl} from '@/karnx/api';
import { useSearchParams, useRouter } from "next/navigation";

interface ResetFormInputs {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetFormInputs>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
   
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const {setAlertMessage, setLoader, setOpenAlert, setSeverity, theme} = useAuth();
  const onSubmit = async (data: ResetFormInputs) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/reset-password`, {
        email: email,
        token: token,
        password: data.password,
        password_confirmation: data.confirmPassword
      });

      setAlertMessage(response.data.message);
      setOpenAlert(true);
      setSeverity('success');
      router.push('/');
    } catch (error: any) {
      if (error.response) {
        setAlertMessage(error.response.data.message);
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
        <Image src={theme.images.loginBg} alt="img-not-found" />
      </Box>

      <Box className="input-section">
        <Image className="img-fluid" src={theme.images.logo} alt="logo" />
        <Typography component="h3" variant="h3" sx={{ width: "100%" }}>
          Reset Your Password
        </Typography>

        <Typography component='form' sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: '28px'}} onSubmit={handleSubmit(onSubmit)}>
          
          <Box sx={{ position: "relative" }}>
            {/* <Link href="/" className="forgot-link">
              Go to Login
            </Link> */}
            <Controller
                name="password"
                control={control}
                rules={{ required: "New Password is required" }}
                render={({ field }) => (
                    <CustomTextField
                        {...field}
                        inputLabel="New Password"
                        placeholder="New password"
                        variant="outlined"
                        size="small"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                )}
            />
          </Box>
          <Box sx={{ position: "relative" }}>
            <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: "Confirm Password is required" }}
                render={({ field }) => (
                    <CustomTextField
                        {...field}
                        inputLabel="Confirm Password"
                        placeholder="Confirm password"
                        variant="outlined"
                        size="small"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
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
            Reset Password
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPassword;
