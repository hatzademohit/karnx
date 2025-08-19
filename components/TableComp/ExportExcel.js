import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const exportToExcel = async (data, columns, fileName = 'report.xlsx', sheetHeading = 'Report Title') => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  const totalColumns = columns.length;

  // 1️⃣ Main heading row with blue background
  const headingRow = worksheet.addRow([]);
  worksheet.mergeCells(1, 1, 1, totalColumns);
  const headingCell = headingRow.getCell(1);
  headingCell.value = sheetHeading;
  headingCell.alignment = { vertical: 'middle', horizontal: 'center' };
  headingCell.font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  headingCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '4472C4' }, // Excel Blue
  };

  const headerRow = worksheet.addRow(columns.map(col => col.headerName || ''));
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9E1F2' }, // Light blue background
    };
  });

  // 3️⃣ Data Rows
  data.forEach((rowData) => {
    const row = worksheet.addRow(columns.map(col => rowData[col.field]));
    row.eachCell((cell) => {
      cell.alignment = { vertical: 'middle', horizontal: 'left' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  // 4️⃣ Auto Width
  columns.forEach((col, index) => {
    const headerLength = (col.headerName || '').toString().length;
    worksheet.getColumn(index + 1).width = headerLength < 12 ? 12 : headerLength + 4;
  });

  // 5️⃣ Export
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, fileName);
};
