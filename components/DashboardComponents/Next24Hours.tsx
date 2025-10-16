import { Box, Button, Typography } from "@mui/material"

const Next24Hours = () => {

    const cardContainData = [
        {headhing: 'LHR → JFK', text: 'Today 14:30 • G650 (G-KRNX)', assign: 'Capt. Johnson, FO Smith', status: 'ON TIME'},
        {headhing: 'CDG → DXB', text: 'Tomorrow 09:15 • Global 7500 (G-WING)', assign: 'Capt. Brown, FO Wilson', status: 'DELAYED'},
        {headhing: 'CDG → DXB', text: 'Tomorrow 09:15 • Global 7500 (G-WING)', assign: 'Capt. Brown, FO Wilson', status: 'SCHEDULED'},
    ]
    return(
        <Box className='card' sx={{maxHeight: '460px'}}>
            <Box className='card-header'>
                <Typography component='h3' variant="h3" sx={{color: theme?.common?.redColor}}>Next 24 Hours</Typography>
                <Button className="btn" variant="text" size="small">View All</Button>
            </Box>
            <Box className="card-body" sx={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '360px' }}>
                { cardContainData && cardContainData.map((item, index) => (
                    <Box className="card-contain" key={index}>
                        <Typography component='h3' variant="h3" sx={{color: theme?.common?.blueColor}}>{item.headhing}</Typography>
                        <Box>
                            <Typography sx={{fontSize: '14px'}}>{item.headhing}</Typography>
                            <Typography sx={{fontSize: '10px', color: theme?.common?.blueColor}}>{item.assign}</Typography>
                        </Box>
                        <Button className={`btn btn-status-rounded ${item.status === 'ON TIME' ? 'bg-green' : item.status === 'DELAYED' ? 'bg-red' : ''}`} variant="contained">{item.status}</Button>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Next24Hours;