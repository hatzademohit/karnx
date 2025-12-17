import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Box, Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockResetIcon from '@mui/icons-material/LockReset';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import { fileStorageUrl } from "@/karnx/api";
import { get } from 'http';
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
    sx={{
      zIndex: '999999',
    }}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: '4px',
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      fontFamily: 'poppins-lt',
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function MyAccount() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [userData, setUserData] = React.useState(null);

  const { logout, user, role, theme } = useAuth();
  const router = useRouter();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updatePass = () => {
    setAnchorEl(null);
    router.push('/profile/update-password')
  }

  const myProfile = () => {
    setAnchorEl(null);
    router.push('/profile/my-profile');
  }
  let userSesion: any = null;
  userSesion = typeof window !== 'undefined' ? localStorage.getItem('loggedInUser') : null;
  userSesion = userSesion ? JSON.parse(userSesion) : null;
  return (
    <Box>
      <Button
        disableRipple
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        sx={{
          backgroundColor: 'transparent',
          height: '40px',
          padding: '4px 3px 4px 4px',
          borderRadius: '26px',
          gap: { md: '14px', sm: '10px', xs: '6px' },
          textTransform: 'capitalize',
          width: 'fit-content',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '& img': { width: { md: 30, sm: 25, xs: 20 }, height: { md: 30, sm: 25, xs: 20 } }
        }}
      >
        {
          user?.avatar ? <Image src={fileStorageUrl + user?.avatar} alt='img-not-found' width={30} height={30} style={{ borderRadius: '50%', objectFit: 'cover' }} /> :
            <Typography component="span" sx={{ backgroundColor: '#F6F7FF', padding: '6px', borderRadius: '50%', width: '40px', height: '40px' }}>
              <AccountCircleOutlinedIcon sx={{ fontSize: '22px', position: 'relative', top: '3px', color: theme?.common?.blueColor }} />
            </Typography>
        }
        <Typography sx={{ display: 'flex', flexDirection: 'column', textAlign: 'start' }}>
          <Typography component='span' sx={{ color: '#333333', lineHeight: '16px' }}>
            {(user?.name) ? user.name : 'Operator'}
          </Typography>
          <Typography component='span' variant='body2' sx={{ fontSize: '14px !important' }}>
            {userSesion.roles[0].description ? userSesion.roles[0].description : ''}
          </Typography>
        </Typography>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', padding: "6px 16px", gap: '15px' }}>
          {
            user?.avatar ? <Image src={fileStorageUrl + user?.avatar} alt='img-not-found' width={30} height={30} style={{ borderRadius: '50%', objectFit: 'cover' }} /> :
              <Typography component="span">
                <AccountCircleOutlinedIcon sx={{ fontSize: '22px', position: 'relative', top: '3px', color: theme?.common?.blueColor }} />
              </Typography>
          }
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component='h5' variant='h5'>
              {(user?.name) ? user.name : 'Operator'}
            </Typography>
            <Typography>
              User Role: {role ? role : ''}
            </Typography>
            <Typography>
              User Id: {(user?.id) ? user.id : ''}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={myProfile} disableRipple>
          <AccountCircleOutlinedIcon sx={{ fontSize: '25px !important' }} />
          My Profile
        </MenuItem>
        <MenuItem onClick={updatePass} disableRipple>
          <LockResetIcon sx={{ fontSize: '25px !important' }} />
          Update Password
        </MenuItem>
        <MenuItem onClick={logout} disableRipple>
          <LoginOutlinedIcon sx={{ fontSize: '25px !important' }} />
          Logout
        </MenuItem>
      </StyledMenu>
    </Box>
  );
}