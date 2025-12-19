import React, { useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface TableCompProps {
  data?: any[];
  columns?: any[];
  onclick?: any;
  buttonText?: any;
  addButton?: boolean;
  selectFilter?: any;
  headingText?: string;
  isExport?: boolean;
  className?: string;
  clearFilter?: any;
}

const TableComp: React.FC<TableCompProps> = ({
  data,
  columns,
  onclick,
  buttonText,
  addButton = false,
  selectFilter,
  headingText,
  className = '',
  clearFilter,
}) => {

  const [value, setValue] = useState<number>(80);
  const theme = useTheme();

  return (
    <Box className={`react-table ${className}`}
      data-btn={addButton}
      sx={{
        '& .MuiToolbar-root.MuiToolbar-gutters > div:has(.MuiCollapse-root.MuiCollapse-horizontal .MuiFormControl-root .MuiInputBase-root)': { marginLeft: 'auto', padding: '4px 0', alignItems: 'center' }, '.MuiToolbar-root.MuiToolbar-gutters': { minHeight: '36px' },
        '& .MuiPaper-root': { boxShadow: 'unset' },
        '& .MuiTableContainer-root': { border: '1px solid #dddddd', scrollbarWidth: 'thin' },
        '& div:has(.MuiTablePagination-root)': { boxShadow: 'unset' },
        '& table thead th .MuiDivider-fullWidth.MuiDivider-vertical': { borderWidth: 1 },
        '& div:has(.h3)': { padding: '0', alignItems: 'center' }
      }}
    >
      <MaterialReactTable
        columns={columns}
        data={data}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableColumnActions={false}
        enableHiding={false}
        enableTopToolbar
        enableColumnResizing
        // enableColumnFilters={false}
        layoutMode="grid"
        enableColumnFilters={true}
        enableStickyHeader
        muiSearchTextFieldProps={{
          placeholder: 'Search...',
          sx: { maxWidth: '250px', width: '100%' },
          variant: 'outlined',
          size: 'small',
        }}
        initialState={{
          showColumnFilters: false, showGlobalFilter: true, pagination: { pageSize: 10, pageIndex: 0 },
          density: 'compact', // 'compact' | 'comfortable' | 'spacious'
        }}
        muiTableContainerProps={{ sx: { maxHeight: 'calc(100vh - 210px)' } }}
        renderTopToolbarCustomActions={({ table }) => (
          <>
            {addButton && (
              <Box className="add-data-btn" sx={{ display: 'flex', width: '100%', maxWidth: '500px', gap: '10px', '& .black-btn': { boxShadow: 'unset' } }}>
                <Button onClick={onclick} variant="contained" className="btn black-btn" disableElevation>
                  {buttonText}
                </Button>
                {selectFilter}
              </Box>
            )}
            {headingText && <Typography className='h3' component='h3' variant="h3" sx={{ color: theme?.common?.redColor }}>{headingText}</Typography>}
            {clearFilter &&
              <Button size="small" variant="outlined" color="inherit"
                onClick={() => { clearFilter(); table.setGlobalFilter(''); table.setColumnFilters([]) }}
                sx={{ whiteSpace: 'nowrap', fontFamily: 'poppins', minWidth: 'unset', ml: 'auto', borderColor: '#a9a9a9', height: '34px' }}
              >
                <CloseIcon sx={{ fontSize: '16px' }} /> Clear Fliter
              </Button>
            }
          </>
        )}
      />
    </Box>
  );
};

export default TableComp;