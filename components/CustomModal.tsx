import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export interface ModalCompProps {
  headerText?: any;
  open?: boolean;
  setOpen?: (value: boolean) => any;
  children?: any;
  fbText?: string;
  dataAction?: any;
  dataClose?: any;
  isFooterButton?: boolean;
  className?: string;
}

const CustomModal: React.FC<ModalCompProps> = ({
  headerText,
  open,
  setOpen,
  children,
  fbText,
  dataAction,
  dataClose,
  className,
  isFooterButton = false
}) => {

  return (
    <Dialog
      open={open}
      onClose={ () => setOpen(false)}
      // onClose={(event, reason) => {
      //   if (reason === 'backdropClick') {
      //     return;
      //   }
      //   if (reason === 'escapeKeyDown') {
      //     return;
      //   }
      //   dataClose
      // }}
      aria-labelledby="draggable-dialog-title"
      className='dialog-modal'
    >
      <Box className={`custom-modal ${className}`}>
        <DialogTitle className='modal-header' component='h2' variant='h2'>
          {headerText}
          <IconButton
            sx={{ ml: 'auto', color: '#808080', '&:hover': {backgroundColor: '#ffffff', color: theme?.common?.blueColor} }}
            size="small"
            onClick={dataClose}
          >
            <CancelOutlinedIcon sx={{fontSize: '27px'}} />
          </IconButton>
        </DialogTitle>
        <DialogContent className='modal-body'>
          {children}
        </DialogContent>
        {/* <DialogActions className='modal-footer'>
          <Button variant="contained" className="btn btn-status bg-green" onClick={dataClose}>
            <TaskAltIcon sx={{mr: '8px', fontSize: '14px'}} /> Accept Inquiry
          </Button>
          <Button variant="contained" className="btn btn-status bg-red" onClick={dataClose}>
            <CancelOutlinedIcon sx={{mr: '8px', fontSize: '14px'}} /> Reject Inquiry
          </Button>
          <Button variant="outlined" className="btn btn-status" sx={{border: '1px solid #cccccc', color: '#333333'}} onClick={dataClose}>
            Request More Info
          </Button>
        </DialogActions> */}
      </Box>
    </Dialog>
  );
};

export default CustomModal;
