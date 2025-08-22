import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';

const ConfirmationModal = ({ open, dataAction, setOpen, heading="Are You Sure You Want To Delete This Record?"}) =>   {
  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className='custom-modal' sx={{padding: '20px 20px 15px', maxWidth: "600px !important", backgroundColor: '#ffffff', position: 'absolute', inset: 0,margin: 'auto', height: 'fit-content', borderRadius: '4px', '& .btn': {maxWidth: '100px !important', height: '36px' }}}>
          <Typography component='h4' variant='h4' sx={{mb: '20px'}}>{heading}</Typography>
          <Box 
            sx={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                gap: '10px'
            }}
          >
            <Button variant='contained' className='btn black-btn' onClick={dataAction}>Yes</Button>
            <Button variant='contained' color='error' className='btn black-btn' onClick={() => setOpen(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default ConfirmationModal;
