"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import MainLayout from "@/karnx/MainLayout";
import { PageLoader, AlertMassage } from "@/components";
import axios from "axios";
import { apiBaseUrl } from '@/karnx/api';
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
interface User {
  id: number;
  name: string;
  email: string;
  client_id?: number;
  avatar?: any;
  access_type?: string; // e.g., 'admin', 'operator', etc.
  [key: string]: any;
  roles: any;
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
  hasPermission?: any;
  role?: string;
  karnxToken?: string;
  theme?: any;
  setKarnxToken: React.Dispatch<React.SetStateAction<string>>;
  validateSession?: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => { },
  login: () => { },
  logout: () => { },
  currentTime: null,
  loader: false,
  setLoader: () => { },
  openAlert: false,
  setOpenAlert: () => { },
  severity: '',
  setSeverity: () => { },
  alertMessage: '',
  setAlertMessage: () => { },
  hasPermission: [],
  role: '',
  karnxToken: '',
  theme: null,
  setKarnxToken: () => { },
  validateSession: async () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [logUser, setLogUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [karnxToken, setKarnxToken] = useState<string>()
  const [permissions, setPermissions] = useState<string[]>([]);
  const [role, setRole] = useState<string>("");
  const [loaderCount, setLoaderCount] = useState(0);
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [severity, setSeverity] = useState<string>('success')
  const [alertMessage, setAlertMessage] = useState<string>();
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = ['/', '/forgot-password', '/reset-password', '/activate-account'];
  const fullDate = new Date();
  const formattedTime = `${String(fullDate.getHours()).padStart(2, '0')}:${String(fullDate.getMinutes()).padStart(2, '0')}`;

  const setLoader = (value: boolean) => {
    setLoaderCount((prev) => (value ? prev + 1 : Math.max(prev - 1, 0)));
  };
  const loader = loaderCount > 0;

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const storedLoginTime = localStorage.getItem("loginTime");
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!storedUser && !isPublicRoute) {
      router.push("/");
      return;
    }
    // if (storedUser) {
    //   setLogUser(JSON.parse(storedUser));
    // }
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setLogUser(parsedUser);
      } catch (error) {
        console.error("Invalid JSON in localStorage.user", error);
        localStorage.removeItem("user"); // cleanup bad value
      }
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
    if (diffMinutes > 60 || diffMinutes <= 60) {
      localStorage.clear();
      logout();
      // setUser(null);
      router.push("/");
    } else {
      localStorage.setItem("loginTime", formattedTime);
    }
  }, [pathname]);

  useEffect(() => {
    if (logUser) {
      setUser(logUser);
      setKarnxToken(localStorage.getItem("token"))
    }
  }, [logUser]);

  useEffect(() => {
    setTimeout(() => {
      setOpenAlert(false);
    }, 5000);
  }, [openAlert]);

  const theme = useTheme()

  useEffect(() => {
    const storedPermissions = localStorage.getItem("permissions");
    try {
      if (storedPermissions) {
        const parsed = JSON.parse(storedPermissions);
        if (Array.isArray(parsed)) setPermissions(parsed as string[]);
      }
    } catch {
      // ignore bad data
    }
    const storedRole = localStorage.getItem("role");
    if (storedRole && typeof storedRole === "string") {
      setRole(storedRole);
    }
  }, []);

  const hasPermission = (permission: string | string[]) => {
    if (!permissions || permissions.length === 0) return false;
    if (Array.isArray(permission)) {
      return permission.some((p) => permissions.includes(p));
    }
    return permissions.includes(permission);
  };

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
      .then(async (response) => {
        localStorage.clear();
        // Clear middleware session cookies
        // try {
        //   await fetch("/api/session/clear", { method: "POST" });
        // } catch { }
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setLoader(false);
        router.push("/");
      })
  };

  const handleSessionExpired = () => {
    localStorage.clear();
    toast.error("Your session has expired. Please log in again");
    router.push("/");
  };

  const validateSession = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/check-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${karnxToken}`,
        },
      })
      if (res.ok != true) {
        handleSessionExpired()
        return false;
      }
    } catch (error) {
      handleSessionExpired()
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user, setUser, login, logout, currentTime: formattedTime, setLoader, openAlert, setOpenAlert, severity
      , setSeverity, alertMessage, setAlertMessage, hasPermission, role, karnxToken, theme, setKarnxToken, validateSession
    }}>
      {loader && <PageLoader />}
      {openAlert && <AlertMassage severity={severity} alertText={alertMessage} onClose={() => setOpenAlert(false)} />}

      {publicRoutes.includes(pathname) ? (
        children
      ) : user ? (
        <MainLayout>{children}</MainLayout>
      ) : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
