import { Box, Button, Typography } from "@mui/material"

const Next24Hours = () => {

    const cardContainData = [
        {headhing: 'LHR → JFK', text: 'Today 14:30 • G650 (G-KRNX)', assign: 'Capt. Johnson, FO Smith', status: 'ON Time'},
        {headhing: 'CDG → DXB', text: 'Tomorrow 09:15 • Global 7500 (G-WING)', assign: 'Capt. Brown, FO Wilson', status: 'DELAYED'},
    ]
    return(
        <Box className='card' sx={{maxHeight: '460px'}}>
            <Box className='card-header'>
                <Typography component='h3' variant="h3" sx={{color: '#BC0019'}}>Recent Inquiries</Typography>
                <Button className="btn" variant="text" size="small">View All</Button>
            </Box>
            <Box className="card-body" sx={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '360px' }}>
                { cardContainData && cardContainData.map((item, index) => (
                    <Box className="card-contain" key={index}>
                        <Typography component='h3' variant="h3" sx={{color: '#03045E'}}>{item.headhing}</Typography>
                        <Box>
                            <Typography sx={{fontSize: '14px'}}>{item.headhing}</Typography>
                            <Typography sx={{fontSize: '10px', color: '#03045E'}}>{item.assign}</Typography>
                        </Box>
                        <Button className="btn btn-status-rounded" variant="contained" sx={{backgroundColor: '#2563EB'}}>{item.status}</Button>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Next24Hours;