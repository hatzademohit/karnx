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
          <Typography component='h1' sx={{fontFamily: 'kyn-md', fontSize: '24px', mb: '10px'}}>{heading}</Typography>
          <Box 
            sx={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                gap: '10px'
            }}
          >
            <Button variant='contained' className='btn black-btn' onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant='contained' className='btn black-btn' onClick={dataAction}>Yes</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default ConfirmationModal;
