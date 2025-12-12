"use client"
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import SeperateAppBar from './SeperateAppBar';
import SeperateDrawer from './SeperateDrawer';
import { Theme } from '@mui/system';

export const drawerWidth = 240;
export const headerHeightLg = 70;
export const headerHeightMd = 60;
export const headerHeightXs = 40;
const closeDrawerWidth = 48;

interface MainProps {
  theme?: Theme;
  open: boolean;
}

export const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<MainProps>(({ theme, open }) => ({
  flexGrow: 1,
  padding: '10px',
  [theme.breakpoints.up('sm')]: {
    padding: 16,
    width: `calc(100% - ${closeDrawerWidth}px)`,
    marginLeft: `${closeDrawerWidth}px`,
  },
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: '100%',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: 'calc(100% - 200px)',
  }),
  overflow: 'hidden',
  marginLeft: `0`,
  marginTop: headerHeightXs + 10,
  [theme.breakpoints.up('md')]: {
    marginTop: headerHeightMd,
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: headerHeightLg,
  },
}));

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden' as const,
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden' as const,
  width: 0,
  [theme.breakpoints.up('sm')]: {
    width: `${closeDrawerWidth}px`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  minHeight: `${headerHeightXs + 10}px !important`,
  [theme.breakpoints.up('md')]: {
    minHeight: `${headerHeightMd}px !important`,
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: `${headerHeightLg}px !important`,
  },
}));

interface AppBarProps {
  theme?: Theme;
  open: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    width: `100%`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface DrawerProps {
  theme?: Theme;
  open: boolean;
}

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Sidebarheader({ children }: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <CssBaseline />
      <SeperateAppBar
        open={open}
        theme={theme}
        setOpen={setOpen}
      />

      <SeperateDrawer
        open={open}
        setOpen={setOpen}
      />
      {children}
    </>
  );
}