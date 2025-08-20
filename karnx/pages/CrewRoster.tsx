'use client'
import { Box, Typography } from "@mui/material";
import { SimpleTable } from "@/components";
import { useEffect, useState } from "react";

const CrewRoster = () => {
    
    const [columns, setcolumns] = useState<any>([])
    const [data, setData] = useState([])

    useEffect(() => {
        setcolumns([
            { header: 'Name', apiKey: 'name' },
            { header: 'Position', apiKey: 'position' },
            { header: 'Status', apiKey: 'status' },
            { header: 'FDTL Remaining', apiKey: 'fdtlRemaining' },
            { header: 'Next Assignment', apiKey: 'nextAssignment' },
            { header: 'Action', apiKey: 'action' },
        ]);

        setData([
            {name: 'Capt. Johnson', position: 'Captain', status: 'AVAILABLE', fdtlRemaining : '6h 30m', nextAssignment: 'FL-001 (Today 14.30)'},
            {name: 'FO Smith', position: 'First Officer', status: 'REST', fdtlRemaining : '8h 15m', nextAssignment: 'FL-001 (Today 14.30)'},
        ])
        
     }, [])

    return(
        <Box>
            <Typography component='h1' variant="h1" sx={{color: '#03045E', mb: '24px'}}>Crew Roster</Typography>
             <SimpleTable
                tableHeader={columns}
                tableData={data}
            />
        </Box>
    )
}

export default CrewRoster;