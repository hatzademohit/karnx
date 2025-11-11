'use client';
import React from 'react'
import { DrawerHeader } from '../Sidebar/Sidebarheader';
import { Drawer } from '../Sidebar/Sidebarheader';
import { List, ListItemButton, ListItemIcon, ListItemText, ListItem } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FlightIcon from '@mui/icons-material/Flight';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import BusinessIcon from '@mui/icons-material/Business';
import { useAuth } from '@/app/context/AuthContext';

interface SeperateDrawerProps {
  open: boolean;
  theme?: any;
  handleDrawerOpen?: () => void;
}

export default function SeperateDrawer({
  open,
  theme,
  handleDrawerOpen,
}: SeperateDrawerProps) {

  const pathname = usePathname();
  const { hasPermission } = useAuth();

  const collapseMenu = [
    { menu: 'Navination', icon: <MenuIcon />, path: '/navigation' },
    { menu: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    // { menu: 'Inquiries', icon: <SearchOutlinedIcon />, path: '/inquiries', permission: 'user read' },
    { menu: 'Flight Ops', icon: <FlightIcon />, path: '/flight-ops', permission: 'flight read' },
    { menu: 'Fleet', icon: <BuildOutlinedIcon />, path: '/fleet', permission: 'fleet read' },
    { menu: 'Crew', icon: <Groups2OutlinedIcon />, path: '/crew-roster', permission: 'crew read' },
    { menu: 'Company Profile', icon: <BusinessIcon />, path: '/company-profile', permission: 'crew read' },
    // { menu: 'Crew Roster', icon: <Groups2OutlinedIcon />, path: '/cre-roster', permission: 'crew read' },
    // { menu: 'Booking Inquiry', icon: <Groups2OutlinedIcon />, path: '/booking-inquiry', permission: 'user read' },
  ]

  return (
    <>
      <Drawer
        className={`sidebar ${open ? "open-sidebar" : "close-sidebar"}`}
        variant="permanent"
        open={open}
        sx={{ position: 'absolute' }}
      >
        <DrawerHeader />
        <List component='ul' className="List-menu-sidebar">
          {collapseMenu
            .filter((item) => !item.permission || hasPermission(item.permission))
            .map((data) => (
              <React.Fragment key={data.path}>
                <Tooltip
                  title={data.menu}
                  placement="left"
                  disableInteractive
                  slotProps={{
                    popper: {
                      sx: {
                        boxShadow: '1px 0px 2px 0px rgba(0, 0, 0, 0.3)', backgroundColor: '#ffffff', opacity: open ? "0 !important" : 1,
                        [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: { marginLeft: "0px" },
                        [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .MuiTooltip-tooltip`]:
                          { margin: "0px", backgroundColor: "#ffffff", color: "#000000", fontFamily: "poppins", fontSize: "13px", padding: "11px 18px 11px 0", borderRadius: "0 12px 12px 0", height: 40 },
                      },
                    },
                  }}
                >
                  <ListItem
                    disablePadding
                    sx={{ display: "block", color: '#202531', '& a': { color: 'inherit', textDecoration: 'none' } }}
                  >
                    {
                      data.menu == 'Navination' ?
                        <ListItemButton className={`menu-icon-btn`}
                          sx={{ minHeight: 40, height: 40, justifyContent: open ? "initial" : "center", px: "10.5px", mb: '8px' }}
                          disableRipple
                          onClick={handleDrawerOpen}
                        >
                          <ListItemIcon className="menu-icon"
                            sx={{ minWidth: 0, mr: open ? 3 : "0px", justifyContent: "center", transition: "all 0.3s ease", color: 'inherit' }}
                          >
                            {data.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={data.menu}
                            sx={{ opacity: open ? 1 : 0, flex: open ? "1 1 auto" : 0 }}
                          />
                        </ListItemButton>
                        :
                        <Link href={data.path}>
                          <ListItemButton className={`menu-icon-btn ${pathname == data.path ? "active" : "inactive"}`}
                            sx={{ minHeight: 40, height: 40, justifyContent: open ? "initial" : "center", px: "10.5px", mb: '8px' }}
                            disableRipple
                          >
                            <ListItemIcon className="menu-icon"
                              sx={{ minWidth: 0, mr: open ? 3 : "0px", justifyContent: "center", transition: "all 0.3s ease", color: 'inherit' }}
                            >
                              {data.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={data.menu}
                              sx={{ opacity: open ? 1 : 0, flex: open ? "1 1 auto" : 0 }}
                            />
                          </ListItemButton>
                        </Link>
                    }
                  </ListItem>
                </Tooltip>
              </React.Fragment>
            ))}
        </List>
      </Drawer>
    </>
  );
}