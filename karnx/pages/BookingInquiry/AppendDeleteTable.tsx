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
    { id: 1, from: '', to: '', date: dayjs("08/30/2025 02:16 PM") },
    { id: 2, from: '', to: '', date: dayjs("08/30/2025 02:16 PM") },
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

  // const handleSwapChange = (id: number, from: string, to: string) => {
  //   setRows(
  //     rows.map((row) =>
  //       row.id === id ? { ...row, from, to } : row
  //     )
  //   );
  // };

  const handleDateChange = (id: number, value: Dayjs | null) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, date: value } : row
      )
    );
  };
  const { airportCity, formData, setFormData } = useStep();

  // Defensive mapping for options
  const airportOptions: any = (Array.isArray(airportCity) ? airportCity : []).map(airport => ({
    label: `${airport.airport_name} (${airport.code}), ${airport.city_name}, ${airport.country_name}`,
    id: airport.id,
    code: airport.code,
  }));
  const setAtIndex = (arr: any[], index: number, value: any) => {
    const copy = [...arr];
    copy[index] = value;
    return copy;
  };
  const handleSwapChange = (rowIndex: number, fromCode: string, toCode: string) => {
    setFormData({
      ...formData,
      flightDetails: {
        ...formData.flightDetails,
        departure_location: setAtIndex(formData.flightDetails?.departure_location || [], rowIndex, fromCode),
        arrival_location: setAtIndex(formData.flightDetails?.arrival_location || [], rowIndex, toCode),
      }
    });
  };
  const addIndex = rows.length;
  return (
    <Box>
      <TableContainer className="table-append">
        <Table size="small">
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell colSpan={2}>
                  <SwapComp
                    options={airportOptions}
                    defaultFrom={formData.flightDetails?.departure_location?.[index] || ""}
                    defaultTo={formData.flightDetails?.arrival_location?.[index] || ""}
                    onChange={(fromCode, toCode) => handleSwapChange(index, fromCode, toCode)}
                  />
                </TableCell>
                <TableCell>
                  <CustomDateTimePicker
                    datatimelabel="Departure Date & Time"
                    value={
                      formData.flightDetails?.departure_time
                        ? dayjs(formData.flightDetails.departure_time[index])
                        : null
                    }
                    onChange={(newValue) => {
                      console.log(setAtIndex, newValue , 'setAtIndex')
                      setFormData({
                        ...formData,
                        flightDetails: {
                          ...formData.flightDetails,
                          departure_time: setAtIndex(
                            formData.flightDetails?.departure_time || [],
                            index,
                            newValue ? dayjs(newValue).toISOString() : null
                          )
                        }
                      });
                    }}
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
                <SwapComp
                  options={airportOptions}
                  defaultFrom={formData.flightDetails?.departure_location?.[addIndex] || ""}
                  defaultTo={formData.flightDetails?.arrival_location?.[addIndex] || ""}
                  onChange={(fromCode, toCode) => handleSwapChange(addIndex, fromCode, toCode)}
                />
              </TableCell>
              <TableCell colSpan={2} >
                <CustomDateTimePicker
                  datatimelabel="Return Date & Time"
                  value={
                      formData.flightDetails?.departure_time
                        ? dayjs(formData.flightDetails.departure_time[addIndex])
                        : null
                    }
                    onChange={(newValue) => {
                      setFormData({
                        ...formData,
                        flightDetails: {
                          ...formData.flightDetails,
                          departure_time: setAtIndex(
                            formData.flightDetails?.departure_time || [],
                            addIndex,
                            newValue ? dayjs(newValue).toISOString() : null
                          )
                        }
                      });
                    }}
                  withClock
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" startIcon={<Add />} onClick={handleAddRow} className="btn btn-blue" sx={{ mt: '14px' }}>
        Add Stop
      </Button>
    </Box>
  );
};

export default AppendDeleteTable;
