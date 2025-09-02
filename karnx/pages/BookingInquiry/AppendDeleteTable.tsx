"use client";
import React, { useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, IconButton, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { CustomDateTimePicker, SwapComp } from "@/components";
import dayjs, { Dayjs } from "dayjs";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useStep } from "@/app/context/StepProvider";

interface RowData {
  id: number;
  from: string;
  to: string;
  date: Dayjs | null;
}

const AppendDeleteTable: React.FC = () => {

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [rows, setRows] = useState<RowData[]>([
    { id: 1, from: 'DELHI', to: 'NGP', date: dayjs("08/30/2025 02:16 PM") },
    { id: 2, from: 'MUB', to: 'PUNE', date: dayjs("08/30/2025 02:16 PM") },
    { id: 3, from: 'MUB', to: 'PUNE', date: dayjs("08/30/2025 02:16 PM") },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        from: "",
        to: "",
        date: dayjs(), // each row gets its own date
      },
    ]);
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSwapChange = (id: number, from: string, to: string) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, from, to } : row
      )
    );
  };

  const handleDateChange = (id: number, value: Dayjs | null) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, date: value } : row
      )
    );
  };

  const { airportCity, formData, setFormData } = useStep();
    // Sync local state with context state, use context as the single source of truth
    const departureTime = formData.flightDetails?.departure_time[0]
      ? dayjs(formData.flightDetails.departure_time[0])
      : dayjs();
  
    // Defensive mapping for options
    const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map(airport => ({
      label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
      id: airport.id,
      code: airport.code,
    }));
  return (
    <Box>
      <TableContainer className="table-append">
        <Table size="small">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell colSpan={2}>
                  <SwapComp
                    defaultFrom={row.from}
                    defaultTo={row.to}
                    onChange={(from, to) =>
                      handleSwapChange(row.id, from, to)
                    }
                  />
                </TableCell>
                <TableCell>
                  <CustomDateTimePicker
                    datatimelabel="Departure Date & Time"
                    value={row.date}
                    onChange={(value) =>
                      handleDateChange(row.id, value)
                    }
                    withClock
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    <ClearRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
                <TableCell colSpan={2}>
                    <SwapComp options={["DEL", "BOM", "NGP", "BLR"]} onChange={(from, to) => console.log("From:", from, "To:", to)} />
                </TableCell>
                <TableCell colSpan={2}>
                    <CustomDateTimePicker
                        datatimelabel="Return Date & Time"
                        value={date}
                        onChange={setDate}
                        withClock
                    />
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" startIcon={<Add />} onClick={handleAddRow} className="btn btn-blue" sx={{mt: '14px'}}>
        Add Stop
      </Button>
    </Box>
  );
};

export default AppendDeleteTable;
