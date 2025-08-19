"use client";

import { Box, Button, Typography, MenuItem } from "@mui/material";
import loginBg from "@/public/imgs/loginbg.png";
import karnxLogo from "@/public/imgs/karnx_logo.svg";
import Image from "next/image";
import { CustomTextField } from "@/components";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import {apiBaseUrl} from '@/karnx/api';
import { useSearchParams, useRouter } from "next/navigation";
import SingleSelect from "@/components/SelectOption/SingleSelect";

interface ResetFormInputs {
    name: string;
    email: string;
    contact_number: string;
    dob: string;
    gender: string;
    password: string;
    confirmPassword: string;
}

const ActivateAccount = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      contact_number: "",
      dob: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
  });
   
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const {setAlertMessage, setLoader, setOpenAlert, setSeverity} = useAuth();
  const onSubmit = async (data: ResetFormInputs) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/activate-account`, {
        email: email,
        token: token,
        name: data.name,
        phone: data.contact_number,
        dob: data.dob,
        gender: data.gender,
        password: data.password,
        confirm_password: data.confirmPassword
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
        <Image src={loginBg} alt="img-not-found" />
      </Box>

      <Box className="input-section">
        <Image className="img-fluid" src={karnxLogo} alt="logo" />
        <Typography component="h3" variant="h3" sx={{ width: "100%" }}>
          Activate Your Account  
            <Typography 
                className="ml-3"
                component="span"
                variant="body2"
                sx={{ color: "text.secondary", fontSize: "0.7rem" }}
            >
                ({email})
            </Typography>
        </Typography>

        <Typography component='form' sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: '28px'}} onSubmit={handleSubmit(onSubmit)}>

          <Box sx={{ position: "relative" }}>
            <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                    <CustomTextField
                        {...field}
                        inputLabel="Name"
                        placeholder="Name"
                        variant="outlined"
                        size="small"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                )}
            />
          </Box>
          <Box sx={{ position: "relative" }}>
            <Controller
                name="contact_number"
                control={control}
                rules={{ required: "Contact number is required" }}
                render={({ field }) => (
                    <CustomTextField
                        {...field}
                        inputLabel="Contact Number"
                        placeholder="Enter Contact Number"
                        variant="outlined"
                        size="small"
                        error={!!errors.contact_number}
                        helperText={errors.contact_number?.message}
                    />
                )}
            />
          </Box>
          <Box sx={{ position: "relative" }}>
            <Controller
                name="dob"
                control={control}
                rules={{ required: "Date of birth is required" }}
                render={({ field }) => (
                <CustomTextField
                    {...field}
                    inputLabel="Date of Birth"
                    type="date"
                    variant="outlined"
                    size="small"
                    error={!!errors.dob}
                    helperText={errors.dob?.message}
                    InputLabelProps={{
                    shrink: true, // keeps label visible above date field
                    }}
                />
                )}
            />
            </Box>

            <Box sx={{ position: "relative" }}>
            <Controller
                name="gender"
                control={control}
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                    <SingleSelect
                    {...field}   // gives value and onChange from react-hook-form
                    label="Gender"
                    size="small"
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                    >
                    <MenuItem value="" disabled>Select Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="femail">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                    </SingleSelect>
                )}
            />
            </Box>

          <Box sx={{ position: "relative" }}>
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
            Activate Account
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default ActivateAccount;