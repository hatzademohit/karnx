import React, { useMemo, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { exportToExcel } from './ExportExcel'

export interface MUIDataGridProps{
  gridColumns?: any;
  gridRows?: any;
  onClick?: () => void;
  buttonText?: any;
  selectFilter?: any;
  extraElement?: any;
  exportButtton?: boolean;
  fileName?: string;
  fileHeading?: string;
  rowHeight?: number;
  getRowClassName?: any;
  sortingMode?: any;
  rowCount?: any;
  page?: any;
  pageSize?: any;
  onPageSizeChange?: any;
  onSortModelChange?: any;
  paginationMode?: any;
}

const MUIDataGrid:React.FC<MUIDataGridProps> = ({
  gridColumns,
  gridRows,
  onClick,
  buttonText,
  selectFilter,
  extraElement,
  exportButtton,
  fileName,
  fileHeading,
  rowHeight= 43,
  getRowClassName,
  sortingMode,
  rowCount,
  page = 0,
  pageSize = 10,
  onPageSizeChange,
  onSortModelChange,
  paginationMode
}) => {
const [searchText, setSearchText] = useState("");

const filteredRows = useMemo(() => {  
  if (!gridRows || gridRows.length === 0) return [];
  if (searchText.trim().length > 0) {
    return gridRows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }
  return gridRows;
}, [searchText, gridRows]);

const handleExportExcel = () => {
  exportToExcel(gridRows, gridColumns, fileName, fileHeading)
}

  return(
    <Box className='page-wrapper' sx={{width: '100%'}}>
      <Box sx={{ display: 'flex', mb: '5px', justifyContent: 'space-between', alignContent: 'center', gap: '10px' }}>
        { buttonText && <Button variant="outlined" className="btn btn-blue" disableElevation onClick={onClick}>{buttonText}</Button> }
        {selectFilter}
        {exportButtton &&
          <Button
            className="export-btn"
            sx={{ color: '#ffffff', backgroundColor: '#404040', ml: 'auto', padding: '4px 8px', borderRadius: '8px', '&:hover': { backgroundColor: '#706c6c' } }}
            onClick={handleExportExcel}
          >
            Export
          </Button>
        }
        {extraElement}
        <TextField
          autoComplete='off'
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder='Search...'
          sx= {{ maxWidth: '250px', width: '100%', ml: 'auto' }}
          size= 'small'
          className='input-search'
          slotProps={{
            input: {
                startAdornment: <SearchIcon sx={{color: "rgba(0, 0, 0, 0.54)"}} />,
                endAdornment: <IconButton size="small" onClick={ () => setSearchText('')}><CloseIcon sx={{color: "rgba(0, 0, 0, 0.54)"}} /></IconButton>,
            },
          }}
        />
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={gridColumns}
        paginationMode={paginationMode}
        initialState={{
          pagination: {
            paginationModel: { page: page, pageSize: pageSize },
          },
        }}  
        pageSizeOptions={[10, 20, 25, 50, 100]}
        disableColumnMenu
        rowHeight={rowHeight}
        getRowClassName={getRowClassName}
        sortingMode={sortingMode}
        rowCount={rowCount}
        onPaginationModelChange={onPageSizeChange}
        onSortModelChange={onSortModelChange}
      />
    </Box>
  )
}

export default MUIDataGrid;
