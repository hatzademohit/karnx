"use client"
import { CustomDateTimePicker, CustomTextField } from "@/components";
import { Box, Grid, IconButton } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';

const OneWayFlights = () => {

      const [date, setDate] = useState<Dayjs | null>(dayjs());
    
    return(
        <Box sx={{border: '1px solid #E5E7EB', boxShadow: '0px 10px 15px -3px #0000001A', padding: '20px', borderRadius: '10px'}}>
            <Grid container spacing={2}>
                <Grid item lg={4} md={4}>
                    <CustomTextField 
                        inputLabel="From"
                        placeholder="Departure airport"
                        size='medium'
                    />
                </Grid>
                <Box>
                    <IconButton onClick={() => alert('hello')}><SwapHorizRoundedIcon /></IconButton>
                </Box>
                <Grid item lg={4} md={4}>
                    <CustomTextField 
                        inputLabel="To"
                        placeholder="Destination airport"
                        size='medium'
                    />
                </Grid>
                <Grid item lg={4} md={4}>
                    <CustomDateTimePicker
                        Datatimelabel="With Clock"
                        value={date}
                        onChange={setDate}
                        withClock
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default OneWayFlights;