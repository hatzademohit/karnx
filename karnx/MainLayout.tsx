"use client";

import React from 'react';
import Sidebarheader from '../components/Sidebar/Sidebarheader';
import { Main } from '../components/Sidebar/Sidebarheader';
import { useTheme } from '@mui/material';
import { useAuth } from '../app/context/AuthContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MainLayoutProps {
  className?: string;
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ className, children }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);

  if (!user) return null; // optionally show a loading spinner here

  return (
    <>
      <Sidebarheader>
        <Main theme={theme} open={open} className={`main-content ${className}`}>
          {children}
        </Main>
        <ToastContainer position="top-right" autoClose={3000} newestOnTop  closeOnClick  pauseOnFocusLoss pauseOnHover />
      </Sidebarheader> 
    </>
  );
};

export default MainLayout;
