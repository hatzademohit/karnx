import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, Box } from '@mui/material';

export interface AlertMassageProps {
  severity?: 'success' | 'info' | 'warning' | 'error' | any;
  alertText?: string;
  onClose?: () => void;
}

function AlertMassage({ severity, alertText, onClose }: AlertMassageProps) {
  return ReactDOM.createPortal(
    <Box
      sx={{
        position: 'fixed',
        zIndex: 999999999,
        right: '20px',
        minWidth: '250px',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        top: '10px',
        '&:has(.MuiAlert-colorSuccess)': { borderLeft: '5px solid #039a00' },
        '&:has(.MuiAlert-colorError)': { borderLeft: '5px solid #ff0000' },
        '& .MuiPaper-root': {
          borderRadius: 0,
          padding: '7px 12px 7px 12px !important',
        },
        '& .MuiAlert-message': {
          fontFamily: 'kyn-md',
          fontSize: '16px',
          padding: '7px 0',
        },
      }}
    >
      <Alert severity={severity} onClose={onClose}>
        {alertText}
      </Alert>
    </Box>,
    document.body
  );
}

export default AlertMassage;
