import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import React from "react";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

interface TableHeader {
  header: string;      // Use string instead of any
  apiKey: string;
}

interface SimpleTableProps {
  tableHeader?: TableHeader[];
  tableData?: Record<string, any>[]; // Better than any[]
}

const SimpleTable: React.FC<SimpleTableProps> = ({
  tableHeader = [],
  tableData = []
}) => {
  return (
    <TableContainer
      className="table-responsive"
      sx={{ "& table tbody tr td[colspan]": { padding: "15px !important" } }}
    >
      <Table className="table-border" size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeader.map((column) => (
              <TableCell key={column.apiKey} sx={{ fontWeight: "bold" }}>
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length > 0 ? (
            tableData.map((data, rowIndex) => (
              <TableRow key={rowIndex}>
                {tableHeader.map((column) => {
                  const tdValue = data[column.apiKey];
                  const isNumber = typeof tdValue === "number";

                  return (
                    <TableCell
                      key={column.apiKey}
                      sx={{
                        textAlign: isNumber ? "end" : "start"
                      }}
                    >
                      {/* ✅ Custom rendering for Status column */}
                      {column.apiKey === "status" ? (
                        <Button  variant="contained" className={`btn btn-status-rounded ${tdValue === 'AVAILABLE' ? 'bg-green' : tdValue === 'REST' ? 'bg-yellow' : ''}`}>
                          {tdValue}
                        </Button>
                      ) : column.apiKey === "action" ? (
                          <Button variant="contained" className="btn">
                            <CheckCircleOutlinedIcon sx={{fontSize: '16px', mr: '5px'}} /> Assign
                          </Button>
                      ) : column.apiKey === "columnName" ||
                        column.apiKey === "dataType" ? (
                        <>{tdValue ?? "-"}</>
                      ) : tdValue?.length > 20 ? (
                        <Tooltip title={tdValue} placement="top" arrow>
                          <Typography component="span" sx={{ fontSize: "inherit" }}>
                            {tdValue.substring(0, 20)}...
                          </Typography>
                        </Tooltip>
                      ) : (
                        <>{tdValue ?? "-"}</>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableHeader.length || 1}
                align="center"
                sx={{
                  fontStyle: "italic !important",
                  textAlign: "center !important",
                  border: "1px solid #afacac !important"
                }}
              >
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
