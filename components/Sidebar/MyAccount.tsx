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

  const { logout, user } = useAuth();
  const router = useRouter();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updatePass = () => {
    setAnchorEl(null);
    router.push('/updatepassword')
  }

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
          padding: '4px 14px 4px 4px',
          borderRadius: '26px',
          gap: '14px',
          textTransform: 'capitalize',
          width: 'fit-content',
          '&:hover': {
            backgroundColor: 'transparent',
          }
        }}
      >
        <Typography component="span" sx={{ backgroundColor: '#F6F7FF', padding: '6px', borderRadius: '50%', width: '40px', height: '40px' }}>
          <AccountCircleOutlinedIcon sx={{ fontSize: '22px', position: 'relative', top:'3px', color: '#03045E' }} />
        </Typography>
        <Typography sx={{display: 'flex', flexDirection: 'column', textAlign: 'start'}}>
          <Typography component='span'
            sx={{
              color: '#333333'
            }}
          >{ (user?.name) ? user.name : 'Operator'  }</Typography>
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
          <Typography component='span'>
            <AccountCircleOutlinedIcon sx={{ fontSize: '22px', position: 'relative',top:'3.5px' }} />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component='h5' variant='h5'>
              { (user?.name) ? user.name : 'Operator'  }
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <AccountCircleOutlinedIcon sx={{ fontSize: '25px !important' }} />
          My Company
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