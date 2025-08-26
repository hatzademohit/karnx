import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';

const ConfirmationModal = ({ open, dataAction, setOpen, heading="Are You Sure?", subHeading="You won't be able to revet this!"}) =>   {
  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className='custom-modal' sx={{padding: '30px', maxWidth: "450px !important", backgroundColor: '#ffffff', position: 'absolute', inset: 0, textAlign: 'center', margin: 'auto', border: '1px solid #cccccc', height: 'fit-content', borderRadius: '4px', '& .btn': {maxWidth: '150px', width: '100%', height: '42px' }}}>
          <Typography component='h4' variant='h4' sx={{mb: '20px', color: '#BC0019'}}>{heading}</Typography>
          <Typography sx={{mb: '20px', fontFamily: 'poppins-lt'}}>{subHeading}</Typography>
          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15px'
            }}
          >
            <Button variant='contained' className='btn btn-blue' onClick={dataAction}>Yes, delete it! </Button>
            <Button variant='contained' className='btn btn-danger' onClick={() => setOpen(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default ConfirmationModal;
