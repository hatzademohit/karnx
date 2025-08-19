import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Paper,
  Box,
  Tooltip,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Draggable from 'react-draggable';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

function PaperComponent(props: any) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} bounds="parent">
      <Paper {...props} />
    </Draggable>
  );
}

export interface ModalCompProps {
  headerText?: any;
  open?: boolean;
  setOpen?: (value: boolean) => any;
  children?: any;
  fbText?: string;
  dataAction?: any;
  dataClose?: any;
  testConnection?: any;
  testConnectionClick?: any;
  className?: string;
  style?: any;
  actionBtnDisabled?: boolean;
  scrollPosition?: boolean;
  showTooltipText?: string;
  hideTooltipText?: string;
  isFooterButton?: boolean;
}

const CustomModal: React.FC<ModalCompProps> = ({
  headerText,
  open,
  setOpen,
  children,
  fbText,
  dataAction,
  dataClose,
  testConnection,
  testConnectionClick,
  actionBtnDisabled = false,
  scrollPosition,
  className,
  showTooltipText,
  isFooterButton = false
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        behavior: 'smooth',
        top: scrollPosition === true ? 0 : scrollRef.current.scrollHeight,
      });
    }, 300);
  };

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ behavior: 'smooth', top: 0 });
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === 'backdropClick') {
          return;
        }
        if (reason === 'escapeKeyDown') {
          return;
        }
        dataClose
      }}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      className='dialog-modal'
    >
      <Box className={`custom-modal ${className}`}>
        <DialogTitle className='modal-header' component='h2' variant='h2'>
          {headerText}
          <IconButton
            sx={{ ml: 'auto', color: '#808080', '&:hover': {backgroundColor: '#ffffff', color: '#03045E'} }}
            size="small"
            onClick={dataClose}
          >
            <CancelOutlinedIcon sx={{fontSize: '27px'}} />
          </IconButton>
        </DialogTitle>
        <DialogContent ref={scrollRef} className='modal-body'>
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
