import React, { FC } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBar } from '../Sidebar/Sidebarheader';
import Myaccount from './MyAccount';
import { useRouter, usePathname } from 'next/navigation'
import { drawerWidth } from '../Sidebar/Sidebarheader';
import { headerHeight } from '../Sidebar/Sidebarheader';
import Image from "next/image";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Badge, Box, Button, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TelegramIcon from '@mui/icons-material/Telegram';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import { useAuth } from '@/app/context/AuthContext';

interface SeperateAppBarProps {
  open: boolean;
  theme?: any;
}
const SeperateAppBar: FC<SeperateAppBarProps> = ({
  open,
  theme,
}) => {

  const router = useRouter()
  const pathname = usePathname();
  const { hasPermission } = useAuth();
  return (
    <>
      <AppBar
        className="header AppBar"
        position="fixed"
        open={open}
        sx={{ backgroundColor: '#ffffff', zIndex: '99999', boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15)' }}
      >
        <Toolbar className="toolbar" sx={{ minHeight: `${headerHeight}px !important` }}>
          <Typography noWrap component="div" sx={{ display: 'flex', width: drawerWidth, margin: '-6px 0 -2px -25px', padding: '6px 0 3px 25px' }}>
            <Image src={theme.images.logo} alt='img-not-found' style={{ width: 'auto', height: '50px' }} />
          </Typography>
          <Typography
            noWrap
            component="div"
            sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: '8px', minHeight: `${headerHeight}px !important` }}
            className='icons-div'
          >
            {pathname === '/dashboard' && hasPermission(['inquiry create']) &&
              <Box sx={{ display: 'flex', gap: '8px', '& .btn': { width: '160px' }, '& svg': { mr: '4px' } }}>

                <Button className='btn btn-danger' onClick={() => router.push('/booking-inquiry')}><AddIcon /> New Inquiry</Button>
                {/* <Button className='btn btn-blue'><TelegramIcon /> Send Reminder</Button>
                <Button className='btn btn-outlined'><TextSnippetOutlinedIcon sx={{ fontSize: '20px' }} /> Generate Report</Button> */}
              </Box>
            }
            <IconButton sx={{ color: 'rgba(3, 4, 94, 1)' }}>
              <Badge badgeContent={3} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: 'rgba(188, 0, 25, 1)' } }}>
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Configuration Setting" arrow placement='top'>
              <IconButton onClick={() => router.push('/configuration')} sx={{ color: 'rgba(3, 4, 94, 1)' }}>
                <SettingsOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Myaccount />
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SeperateAppBar;