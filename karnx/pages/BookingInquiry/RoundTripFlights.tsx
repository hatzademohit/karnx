"use client"
import { CustomDateTimePicker, SwapComp } from "@/components";
import { Box, Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

const RoundTripFlights = () =>{

    const [date, setDate] = useState<Dayjs | null>(dayjs());
    
    return(
       <Box sx={{border: '1px solid #E5E7EB', boxShadow: '0px 10px 15px -3px #0000001A', padding: '20px', borderRadius: '10px'}}>
            <Grid container spacing={2}>
                <Grid item lg={8} md={8}>
                    <SwapComp  onChange={(from, to) => console.log("From:", from, "To:", to)} />
                </Grid>
                <Grid item lg={4} md={4}>
                    <CustomDateTimePicker
                        datatimelabel="Departure Date & Time"
                        value={date}
                        onChange={setDate}
                        withClock
                    />
                </Grid>
                <Grid item lg={8} md={8}>
                    <SwapComp  onChange={(from, to) => console.log("From:", from, "To:", to)} />
                </Grid>
                <Grid item lg={4} md={4}>
                    <CustomDateTimePicker
                        datatimelabel="Return Date & Time"
                        value={date}
                        onChange={setDate}
                        withClock
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default RoundTripFlights;