"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import MainLayout from "@/karnx/MainLayout";
import { PageLoader, AlertMassage } from "@/components";
import axios from "axios";
import {apiBaseUrl} from '@/karnx/api';
import { set } from "react-hook-form";
interface User {
  userId: number;
  name: string;
  email: string;
  company_id?: number;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  login: (userData: User) => void;
  logout: () => void;
  currentTime?: string | null;
  loader?: boolean;
  setLoader?: React.Dispatch<React.SetStateAction<boolean>>;
  openAlert?: boolean;
  setOpenAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  severity?: string;
  setSeverity?: React.Dispatch<React.SetStateAction<string>>;
  alertMessage?: string;
  setAlertMessage?: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser : () => { },
  login: () => { },
  logout: () => { },
  currentTime: null,
  loader: false,
  setLoader: () => {},
  openAlert: false,
  setOpenAlert: () => {},
  severity: '',
  setSeverity: () => {},
  alertMessage: '',
  setAlertMessage: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [logUser, setLogUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [severity, setSeverity] = useState<string>('success')
  const [alertMessage, setAlertMessage] = useState<string>();
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = [ '/', '/forgot-password', '/reset-password', '/activate-account'];
  const fullDate = new Date();
  const formattedTime = `${String(fullDate.getHours()).padStart(2, '0')}:${String(fullDate.getMinutes()).padStart(2, '0')}`;

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const storedLoginTime = localStorage.getItem("loginTime");
    const isPublicRoute = publicRoutes.includes(pathname);
    if (!storedUser && !isPublicRoute) {
      router.push("/");
      return;
    }
    if (storedUser) {
      setLogUser(JSON.parse(storedUser));
    }
    if (!storedLoginTime) return;
    // Parse stored login time (HH:mm)
    const [loginHourStr, loginMinuteStr] = storedLoginTime.split(':');
    const loginHour = parseInt(loginHourStr, 10);
    const loginMinute = parseInt(loginMinuteStr, 10);
    if (isNaN(loginHour) || isNaN(loginMinute)) return;
    // Compute time difference
    const currentTotalMinutes = fullDate.getHours() * 60 + fullDate.getMinutes();
    const loginTotalMinutes = loginHour * 60 + loginMinute;
    const diffMinutes = currentTotalMinutes - loginTotalMinutes;
      // Session expired
    if (diffMinutes > 60) {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loginTime");
      setUser(null);
      router.push("/");
    } else {
      localStorage.setItem("loginTime", formattedTime);
    }
  }, [pathname]);

  useEffect(() => {
    if (logUser) {
      setUser(logUser);
    }
  }, [logUser]);

  useEffect(() => {
    setTimeout(() => {
      setOpenAlert(false);
    },5000);
  }, [openAlert]);

  const login = (userData: User) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    localStorage.setItem("loginTime", formattedTime);
    setUser(userData);
  };

  const logout = () => {
    setLoader(true);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${apiBaseUrl}/logout`,
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loginTime");
      window.location.href = '/';
    })
    .catch((error) => {
      console.log(error);
    });
    
    // setTimeout(() => {
    //   window.location.href = '/';
    //   setLoader(false);
    // }, 2000)
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, currentTime:formattedTime, setLoader, openAlert, setOpenAlert, severity
    , setSeverity, alertMessage, setAlertMessage }}>
      { loader && <PageLoader /> }
      { openAlert && <AlertMassage severity={severity} alertText={alertMessage} onClose={() => setOpenAlert(false)} /> }

      {publicRoutes.includes(pathname) ? (
        children
      ) : user ? (
        <MainLayout>{children}</MainLayout>
      ) : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
