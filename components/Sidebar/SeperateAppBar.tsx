import React, { FC } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Myaccount from './MyAccount';
import { useRouter, usePathname } from 'next/navigation'
import { headerHeightLg, headerHeightMd, headerHeightXs, AppBar } from '../Sidebar/Sidebarheader';
import Image from "next/image";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Badge, Box, Button, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TelegramIcon from '@mui/icons-material/Telegram';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import { useAuth } from '@/app/context/AuthContext';
import StartIcon from '@mui/icons-material/Start';
import MenuIcon from '@mui/icons-material/Menu';
import { useResponsive } from '@/karnx/Hooks/useResponsive';

interface SeperateAppBarProps {
  open: boolean;
  theme?: any;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
const SeperateAppBar: FC<SeperateAppBarProps> = ({
  open,
  theme,
  setOpen,
}) => {
  const { isXs } = useResponsive()
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
        <Toolbar className="toolbar" sx={{ minHeight: { lg: `${headerHeightLg}px !important`, md: `${headerHeightMd}px !important`, xs: `${headerHeightXs}px !important` }, paddingRight: { md: '24px', xs: '8px' } }}>
          <Typography noWrap component="div" sx={{ display: 'flex', margin: '-6px 0 -2px -25px', padding: '6px 0 3px 25px' }}>
            <Image src={theme.images.logo} alt='img-not-found' style={{ width: 'auto', height: '50px' }} />
          </Typography>
          <Typography
            noWrap
            component="div"
            sx={{
              ml: 'auto', display: 'flex', alignItems: 'center', gap: '8px',
              minHeight: { lg: `${headerHeightLg}px !important`, md: `${headerHeightMd}px !important`, xs: `${headerHeightXs}px !important` },
              '& .icon': { padding: { xs: '4px', md: '8px' }, '& svg': { fontSize: { lg: 20, xs: 16 } } }
            }}
            className='icons-div'
          >
            {pathname === '/dashboard' && hasPermission(['inquiry create']) &&
              <Box sx={{ display: 'flex', gap: '8px', '& .btn': { width: '160px' }, '& svg': { mr: '4px' } }}>

                <Button className='btn btn-danger' onClick={() => router.push('/booking-inquiry')}><AddIcon /> New Inquiry</Button>
                {/* <Button className='btn btn-blue'><TelegramIcon /> Send Reminder</Button>
                <Button className='btn btn-outlined'><TextSnippetOutlinedIcon sx={{ fontSize: '20px' }} /> Generate Report</Button> */}
              </Box>
            }
            {/*<IconButton sx={{ color: 'rgba(3, 4, 94, 1)' }}>
              <Badge badgeContent={3} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: 'rgba(188, 0, 25, 1)' } }}>
                <NotificationsNoneIcon />
              </Badge>
            </IconButton> */}
            {isXs && <IconButton size='small' className='sidebar-toggle' sx={{ color: 'rgba(3, 4, 94, 1)' }}
              onClick={(e) => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>}
            {/* {isXs && <IconButton size='small' sx={{ color: 'rgba(3, 4, 94, 1)' }} onClick={() => setOpen(!open)}><MenuIcon /></IconButton>} */}
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