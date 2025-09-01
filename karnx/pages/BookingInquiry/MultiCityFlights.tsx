"use client"
import { AppendDeleteTable } from "@/karnx/pages/BookingInquiry";
import { Box, Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

const MultiCityFlights = () => {

    const [date, setDate] = useState<Dayjs | null>(dayjs());

    return(
        <Box sx={{border: '1px solid #E5E7EB', boxShadow: '0px 10px 15px -3px #0000001A', padding: '20px', borderRadius: '10px'}}>
            <AppendDeleteTable />
        </Box>
    )
}

export default MultiCityFlights;