import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import Image from 'next/image'
import ReactDOM from 'react-dom';

function PageLoader() {
 return ReactDOM.createPortal(
    <Box
        sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto',
            display: 'flex',
            justifyContent: "center",
            alignItems: 'center',
            zIndex: 999999,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}
    >
      {/* <Image src={pageGIF} alt='loader' width={120} /> */}
      <CircularProgress />
    </Box>,
    document.body
  )
}

export default PageLoader
