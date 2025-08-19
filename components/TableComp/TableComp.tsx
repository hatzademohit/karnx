import React, { useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Typography } from '@mui/material';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export interface TableCompProps {
  data?: any[];
  columns?: any[];
  onclick?: any;
  buttonText?: any;
  addButton?: boolean;
  selectFilter?: any;
  isText?: string;
  isExport?: boolean;
  className?: string;
}

const TableComp: React.FC<TableCompProps> = ({
  data,
  columns,
  onclick,
  buttonText,
  addButton = true,
  selectFilter,
  isText,
  className = '',
}) => {
  const [isButton, setIsButton] = useState(addButton);
  const [value, setValue] = useState<number>(80);

  return (
    <Box className={`react-table database-tbl ${className}`} sx={{ '& .MuiToolbar-root.MuiToolbar-gutters > div:has(.MuiCollapse-root.MuiCollapse-horizontal .MuiFormControl-root .MuiInputBase-root)' : { marginLeft: 'auto', padding: '4px 0', alignItems: 'center' }, '.MuiToolbar-root.MuiToolbar-gutters': {minHeight: '36px'}}} data-btn={addButton}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableColumnActions={false}
        enableHiding={false}
        enableColumnFilters={false}
        enableStickyHeader
        muiSearchTextFieldProps={{
          placeholder: 'Search...',
          sx: { maxWidth: '250px', width: '100%' },
          variant: 'outlined',
          size: 'small',
          className: 'input-search',
        }}
        initialState={{ showColumnFilters: false, showGlobalFilter: true, pagination: { pageSize: 10, pageIndex: 0 } }}
        muiTableContainerProps={{ sx: { maxHeight: 'calc(100vh - 210px)' } }}
        renderTopToolbarCustomActions={(table) => (
          <>
            {isButton && (
              <Box className="add-data-btn" sx={{ display: 'flex', width: '100%', maxWidth: '500px', gap: '10px', '& .black-btn': { boxShadow: 'unset' } }}>
                <Button onClick={onclick} variant="contained" className="btn black-btn" disableElevation>
                  {buttonText}
                </Button>
                {selectFilter}
              </Box>
            )}
            {isText && <Typography sx={{ fontFamily: 'kyn', fontSize: '16px', mt: '5px' }}>{isText}</Typography>}
          </>
        )}
      />
    </Box>
  );
};

export default TableComp;