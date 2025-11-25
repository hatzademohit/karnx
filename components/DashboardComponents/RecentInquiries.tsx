import { Box, Button, Divider, Typography } from "@mui/material"
import { MultiSelectCheckbox, SingleSelectRadio } from "@/components"
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

const RecentInquiries = () => {
    const { theme } = useAuth()
    const [assignAt, setassignAt] = useState<string>("");
    const [status, setstatus] = useState<string[]>([]);

    const cardContainData = [
        { headhing: 'LHR → JFK', text: 'Sterling Enterprises • 4 pax', assign: 'Assigned 2 hours ago', status: 'new' },
        { headhing: 'CDG → DXB', text: 'Global Trading Corp • 6 pax', assign: 'Assigned 5 hours ago', status: 'QUOTE PENDING' },
    ]
    return (
        <Box className='card'>
            <Box className='card-header'>
                <Typography component='h3' variant="h3" sx={{ color: theme?.common?.redColor }}>Recent Inquiries</Typography>
                <Button className="btn" variant="text" size="small">View All</Button>
            </Box>
            <Box className='bellow-header-part'>
                {/* <SingleSelectRadio
                    label="Assign At"
                    options={['Today', 'This Week', 'This Month', 'Last Three Months']}
                    value={assignAt}
                    onChange={setassignAt}
                /> 
                <MultiSelectCheckbox
                    label="Status"
                    options={['Accepted', 'New', 'Quote Pending', 'Rejected']}
                    value={status}
                    onChange={setstatus}
                /> */}
                <Divider className="cust-divider" />
                <Box className="filter-selected">
                    <Box className='option-selected'>Today X</Box>
                    <Box className='option-selected'>New X</Box>
                </Box>
            </Box>
            <Box className="card-body" sx={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '260px' }}>
                {cardContainData && cardContainData.map((item, index) => (
                    <Box className="card-contain" key={index}>
                        <Typography component='h3' variant="h3" sx={{ color: theme?.common?.blueColor }}>{item.headhing}</Typography>
                        <Box>
                            <Typography sx={{ fontSize: '14px' }}>{item.headhing}</Typography>
                            <Typography sx={{ fontSize: '10px', color: theme?.common?.blueColor }}>{item.assign}</Typography>
                        </Box>
                        <Button className={`btn btn-status-rounded ${item.status === 'QUOTE PENDING' && 'bg-yellow'}`} variant="contained">{item.status}</Button>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default RecentInquiries