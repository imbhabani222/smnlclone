import react from 'react';
import * as XLSX from 'xlsx';
//@ts-ignore
import ExcelJS from 'exceljs';
import { dateFormat } from '../../../../libs/common/utils/common';
import moment from 'moment';

const handleExport = (e: any, name?: any) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileName = name || 'Employee_list' + '.xlsx';

  const ws = XLSX.utils.json_to_sheet(e);
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: fileType });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

export default handleExport;

export const handleDownloadSampleExcel = async (
  tabledata: any,
  name?: any,
  tittle?: any
) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileName = name || 'Employee_list' + '.xlsx';
  const headers = Object.keys(tabledata?.[0]);
  const columns = headers.map((i: any) => ({ key: i }));
  const workbook = new ExcelJS.Workbook();
  let worksheet = workbook.addWorksheet(`${name}`);
  worksheet.properties.defaultRowHeight = 15;
  worksheet.mergeCells('B1', 'G2');
  worksheet.getCell('B1').value =
    'SHREE MARUTINANDAN LOGISTICS PRIVATE LIMITED';
  // worksheet.mergeCells('B3', 'F4');
  worksheet.getCell('B3').value = tittle;
  worksheet.getCell('B1').font = {
    bold: true,
    size: 16,
    color: { argb: '000000' },
  };
  worksheet.getCell('B3').font = {
    bold: true,
    size: 14,
    color: { argb: '000000' },
  };
  worksheet.mergeCells('B3', 'G4');
  worksheet.getCell('B3').value =
    'C/O Adani Krishnapatnam Port Ltd. Muthukur, Nellore';
  // worksheet.getCell('GH').font = {
  //   italic: true,
  // };
  // worksheet.mergeCells('G4', 'H4');
  // worksheet.getCell('G4').value = `Generated On: ${dateFormat(
  //   moment().format('YYYY-MM-DD')
  // )}`;
  worksheet.getCell('G4').font = {
    italic: true,
  };
  worksheet.getRow(6).values = headers.map((i: any) => i.toUpperCase());
  worksheet.getRow(6).eachCell({ includeEmpty: true }, (cell: any) => {
    cell.font = {
      bold: true,
      italic: true,
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'dfdfdf' },
    };
    cell.border = {
      right: { style: 'thin', color: { argb: 'F0F0F0' } },
    };
  });
  worksheet.columns = columns;
  tabledata.forEach((item: any) => {
    worksheet.addRow(item);
  });
  // Iterate over all rows that have values in a worksheet
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell: any, colNumber) => {
      worksheet.getCell(cell?.['_address']).alignment = {
        wrapText: true,
        indent: 1,
      };
    });
  });
  worksheet.columns.forEach((column: any, i) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell: any) => {
      let columnLength = cell.value ? cell.value.toString().length + 5 : 10;
      if (
        [
          'C1',
          'C2',
          'D1',
          'D2',
          'E1',
          'E2',
          'F1',
          'F2',
          'C3',
          'C4',
          'D3',
          'D4',
          'E3',
          'E4',
          'F3',
          'F4',
          'G4',
          'H4',
          'G2',
          'H2',
          'I2',
        ].find((i: any) => i === cell['_address'])
      ) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        // Do Nothing
      } else if (cell?.['_row']?.['_number'] === 6) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        maxLength = columnLength;
      } else if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });
  const excelBuffer = await workbook.xlsx.writeBuffer({ useStyles: true });
  // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: fileType });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

export const handleExportforMisreports = async (
  tabledata: any,
  name?: any,
  tittle?: any
) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileName = name || 'Employee_list' + '.xlsx';
  const headers = Object?.keys(tabledata?.[0]);
  const columns = headers.map((i: any) => ({ key: i }));
  const workbook = new ExcelJS.Workbook();
  let worksheet = workbook.addWorksheet(`${name}`);
  worksheet.properties.defaultRowHeight = 15;
  worksheet.mergeCells('B1', 'F2');
  worksheet.getCell('B1').value =
    'SHREE MARUTINANDAN LOGISTICS PRIVATE LIMITED';
  worksheet.mergeCells('B3', 'F4');
  worksheet.getCell('B3').value = tittle;
  worksheet.getCell('B1').font = {
    bold: true,
    size: 16,
    color: { argb: '000000' },
  };
  worksheet.getCell('B3').font = {
    bold: true,
    size: 14,
    color: { argb: '000000' },
  };
  worksheet.mergeCells('G2', 'I2');
  worksheet.getCell('G2').value =
    'C/O Adani Krishnapatnam Port Ltd. Muthukur, Nellore';
  worksheet.getCell('G2').font = {
    italic: true,
  };
  worksheet.mergeCells('G4', 'H4');
  worksheet.getCell('G4').value = `Generated On: ${dateFormat(
    moment().format('YYYY-MM-DD')
  )}`;
  worksheet.getCell('G4').font = {
    italic: true,
  };
  worksheet.getRow(6).values = headers.map((i: any) => i.toUpperCase());
  worksheet.getRow(6).eachCell({ includeEmpty: true }, (cell: any) => {
    cell.font = {
      bold: true,
      italic: true,
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'dfdfdf' },
    };
    cell.border = {
      right: { style: 'thin', color: { argb: 'F0F0F0' } },
    };
  });
  worksheet.columns = columns;
  tabledata.forEach((item: any) => {
    worksheet.addRow(item);
  });
  // Iterate over all rows that have values in a worksheet
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell: any, colNumber) => {
      worksheet.getCell(cell?.['_address']).alignment = {
        wrapText: true,
        indent: 1,
      };
    });
  });
  worksheet.columns.forEach((column: any, i) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell: any) => {
      let columnLength = cell.value ? cell.value.toString().length + 5 : 10;
      if (
        [
          'C1',
          'C2',
          'D1',
          'D2',
          'E1',
          'E2',
          'F1',
          'F2',
          'C3',
          'C4',
          'D3',
          'D4',
          'E3',
          'E4',
          'F3',
          'F4',
          'G4',
          'H4',
          'G2',
          'H2',
          'I2',
        ].find((i: any) => i === cell['_address'])
      ) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        // Do Nothing
      } else if (cell?.['_row']?.['_number'] === 6) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        maxLength = columnLength;
      } else if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });
  const excelBuffer = await workbook.xlsx.writeBuffer({ useStyles: true });
  // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: fileType });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

export const handleExportforEmployeeList = async (
  tabledata: any,
  name?: any,
  tittle?: any
) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileName = name || 'Employee_list' + '.xlsx';
  const headers = Object.keys(tabledata?.[0]);
  const columns = headers.map((i: any) => ({ key: i }));
  const workbook = new ExcelJS.Workbook();
  let worksheet = workbook.addWorksheet(`${name}`);
  worksheet.properties.defaultRowHeight = 15;
  worksheet.mergeCells('B1', 'D2');
  worksheet.getCell('B1').value = tittle;
  worksheet.getCell('B1').font = {
    bold: true,
    size: 14,
    color: { argb: '000000' },
  };

  worksheet.mergeCells('E2', 'F2');
  worksheet.getCell('E2').value = `Generated On: ${dateFormat(
    moment().format('YYYY-MM-DD')
  )}`;
  worksheet.getCell('E2').font = {
    italic: true,
  };
  worksheet.getRow(4).values = headers.map((i: any) => i.toUpperCase());
  worksheet.getRow(4).eachCell({ includeEmpty: true }, (cell: any) => {
    cell.font = {
      bold: true,
      italic: true,
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'dfdfdf' },
    };
    cell.border = {
      right: { style: 'thin', color: { argb: 'F0F0F0' } },
    };
  });
  worksheet.columns = columns;
  tabledata.forEach((item: any) => {
    worksheet.addRow(item);
  });
  // Iterate over all rows that have values in a worksheet
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell: any, colNumber) => {
      worksheet.getCell(cell?.['_address']).alignment = {
        wrapText: true,
        indent: 1,
      };
    });
  });
  worksheet.columns.forEach((column: any, i) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell: any) => {
      let columnLength = cell.value ? cell.value.toString().length + 5 : 10;
      if (
        ['C1', 'C2', 'D1', 'D2', 'E2', 'F2'].find(
          (i: any) => i === cell['_address']
        )
      ) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        // Do Nothing
      } else if (cell?.['_row']?.['_number'] === 4) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        maxLength = columnLength;
      } else if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });
  const excelBuffer = await workbook.xlsx.writeBuffer({ useStyles: true });
  // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: fileType });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

export const handleExportInventory = async (
  tabledata: any,
  name?: any,
  tittle?: any
) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileName = name + '.xlsx';
  const headers = Object.keys(tabledata?.[0]);
  const columns = headers.map((i: any) => ({ key: i }));
  const workbook = new ExcelJS.Workbook();
  let worksheet = workbook.addWorksheet(`${name}`);
  worksheet.properties.defaultRowHeight = 15;
  worksheet.mergeCells('C1', 'F2');
  worksheet.getCell('C1').value = tittle;
  worksheet.getCell('C1').font = {
    bold: true,
    size: 14,
    color: { argb: '000000' },
  };

  worksheet.mergeCells('C3', 'F3');
  // worksheet.getCell('C3').value = `Generated On: ${dateFormat(
  //   moment().format('YYYY-MM-DD')
  // )}`;
  // worksheet.getCell('C3').font = {
  //   italic: true,
  // };
  worksheet.getRow(4).values = headers.map(
    (i: any) => i.charAt(0).toUpperCase() + i.slice(1)
  );

  worksheet.getRow(4).eachCell({ includeEmpty: true }, (cell: any) => {
    cell.font = {
      bold: true,
      italic: false,
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'dfdfdf' },
    };
    cell.border = {
      right: { style: 'thin', color: { argb: 'F0F0F0' } },
    };
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
  });
  worksheet.columns = columns;
  tabledata.forEach((item: any) => {
    worksheet.addRow(item);
  });
  // Iterate over all rows that have values in a worksheet
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell: any, colNumber) => {
      worksheet.getCell(cell?.['_address']).alignment = {
        wrapText: true,
        indent: 1,
      };
    });
  });
  worksheet.columns.forEach((column: any, i) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell: any) => {
      let columnLength = cell.value ? cell.value.toString().length + 5 : 10;
      if (
        ['C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2', 'G2', 'H2'].find(
          (i: any) => i === cell['_address']
        )
      ) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        // Do Nothing
      } else if (cell?.['_row']?.['_number'] === 4) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        maxLength = columnLength;
      } else if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });
  const excelBuffer = await workbook.xlsx.writeBuffer({ useStyles: true });
  // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: fileType });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};
export const handleExportAccounts = async (
  tabledata: any,
  name?: any,
  tittle?: any
) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileName = name || 'Employee_list' + '.xlsx';
  const headers = Object.keys(tabledata?.[0]);
  const columns = headers.map((i: any) => ({ key: i }));
  const workbook = new ExcelJS.Workbook();
  let worksheet = workbook.addWorksheet(`${name}`);
  worksheet.properties.defaultRowHeight = 15;
  worksheet.mergeCells('C1', 'F2');
  worksheet.getCell('C1').value = tittle;
  worksheet.getCell('C1').font = {
    bold: true,
    size: 14,
    color: { argb: '000000' },
  };

  worksheet.mergeCells('C3', 'F3');
  worksheet.getCell('C3').value = `Generated On: ${dateFormat(
    moment().format('YYYY-MM-DD')
  )}`;
  worksheet.getCell('C3').font = {
    italic: true,
  };
  worksheet.getRow(5).values = headers.map(
    (i: any) => i.charAt(0).toUpperCase() + i.slice(1)
  );

  worksheet.getRow(5).eachCell({ includeEmpty: true }, (cell: any) => {
    cell.font = {
      bold: true,
      italic: false,
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'dfdfdf' },
    };
    cell.border = {
      right: { style: 'thin', color: { argb: 'F0F0F0' } },
    };
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
  });
  worksheet.columns = columns;
  tabledata.forEach((item: any) => {
    worksheet.addRow(item);
  });
  // Iterate over all rows that have values in a worksheet
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell: any, colNumber) => {
      worksheet.getCell(cell?.['_address']).alignment = {
        wrapText: true,
        indent: 1,
      };
    });
  });
  worksheet.columns.forEach((column: any, i) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell: any) => {
      let columnLength = cell.value ? cell.value.toString().length + 5 : 10;
      if (
        ['C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2', 'G2', 'H2'].find(
          (i: any) => i === cell['_address']
        )
      ) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        // Do Nothing
      } else if (cell?.['_row']?.['_number'] === 4) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        maxLength = columnLength;
      } else if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });
  const excelBuffer = await workbook.xlsx.writeBuffer({ useStyles: true });
  // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: fileType });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};
const dummy = [
  {
    'VEHICLE NO': 'ZWL',
    'VEHICLE TYPE': 'TRACTOR',
    vehicle_make: null,
    vehicle_model_no: null,
    'TOTAL COST': 10520.0,
    'LAST SERVICE': null,
    job_cards: [
      {
        job_card_no: 'JC/0070',
        status: 'Closed',
        total_job_card_cost: 10520.0,
        date: '2024-02-08',
        driver: 'Akkaiahgari Sekhar',
        supervisor: 'Akkaiahgari Sekhar',
        machanic: 'Akkaiahgari Sekhar',
        products: [
          {
            name: 'ERP/IM/PINE/335',
            part_no: 'ERP/PC/PM/3503',
            part_name: '02 Tone 02mtr Sealing Rope',
            quantity: '1',
            amount: 960.0,
            total_cost: 960.0,
          },
          {
            name: 'ERP/IM/PINE/336',
            part_no: 'ERP/PC/PM/3499',
            part_name: '(Tube Heating Machine) Vulcanize Machine',
            quantity: '1',
            amount: 4300.0,
            total_cost: 4300.0,
          },
          {
            name: 'ERP/IM/PINE/337',
            part_no: 'ERP/PC/PM/3503',
            part_name: '02 Tone 02mtr Sealing Rope',
            quantity: '1',
            amount: 960.0,
            total_cost: 960.0,
          },
          {
            name: 'ERP/IM/PINE/338',
            part_no: 'ERP/PC/PM/3499',
            part_name: '(Tube Heating Machine) Vulcanize Machine',
            quantity: '1',
            amount: 4300.0,
            total_cost: 4300.0,
          },
        ],
      },
    ],
  },
  {
    'VEHICLE NO': 'ZWL',
    'VEHICLE TYPE': 'TRACTOR',
    vehicle_make: null,
    vehicle_model_no: null,
    'TOTAL COST': 10520.0,
    'LAST SERVICE': null,
    job_cards: [
      {
        job_card_no: 'JC/0070',
        status: 'Closed',
        total_job_card_cost: 10520.0,
        date: '2024-02-08',
        driver: 'Akkaiahgari Sekhar',
        supervisor: 'Akkaiahgari Sekhar',
        machanic: 'Akkaiahgari Sekhar',
        products: [
          {
            name: 'ERP/IM/PINE/335',
            part_no: 'ERP/PC/PM/3503',
            part_name: '02 Tone 02mtr Sealing Rope',
            quantity: '1',
            amount: 960.0,
            total_cost: 960.0,
          },
          {
            name: 'ERP/IM/PINE/336',
            part_no: 'ERP/PC/PM/3499',
            part_name: '(Tube Heating Machine) Vulcanize Machine',
            quantity: '1',
            amount: 4300.0,
            total_cost: 4300.0,
          },
          {
            name: 'ERP/IM/PINE/337',
            part_no: 'ERP/PC/PM/3503',
            part_name: '02 Tone 02mtr Sealing Rope',
            quantity: '1',
            amount: 960.0,
            total_cost: 960.0,
          },
          {
            name: 'ERP/IM/PINE/338',
            part_no: 'ERP/PC/PM/3499',
            part_name: '(Tube Heating Machine) Vulcanize Machine',
            quantity: '1',
            amount: 4300.0,
            total_cost: 4300.0,
          },
        ],
      },
    ],
  },
];
export const handleExportforVehiclewisereports = async (
  tabledata: any,
  name?: any,
  tittle?: any
) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileName = name || 'Employee_list' + '.xlsx';
  const headers = Object.keys(tabledata?.[0]);
  // const columns = headers.map((i: any) => ({ key: i }));
  const haederRows: any = { 6: true };
  const workbook = new ExcelJS.Workbook();
  let worksheet = workbook.addWorksheet(`${name}`);
  worksheet.properties.defaultRowHeight = 15;
  worksheet.mergeCells('B1', 'F2');
  worksheet.getCell('B1').value =
    'SHREE MARUTINANDAN LOGISTICS PRIVATE LIMITED';
  worksheet.mergeCells('B3', 'F4');
  worksheet.getCell('B3').value = tittle;
  worksheet.getCell('B1').font = {
    bold: true,
    size: 16,
    color: { argb: '000000' },
  };
  worksheet.getCell('B3').font = {
    bold: true,
    size: 14,
    color: { argb: '000000' },
  };
  worksheet.mergeCells('G2', 'I2');
  worksheet.getCell('G2').value =
    'C/O Adani Krishnapatnam Port Ltd. Muthukur, Nellore';
  worksheet.getCell('G2').font = {
    italic: true,
  };
  worksheet.mergeCells('G4', 'H4');
  worksheet.getCell('G4').value = `Generated On: ${dateFormat(
    moment().format('YYYY-MM-DD')
  )}`;
  worksheet.getCell('G4').font = {
    italic: true,
  };
  worksheet.getRow(6).values = [
    'SL NO',
    'VEHICLE NO',
    'VEHICLE TYPE',
    'LAST SERVICE',
    'TOTAL COST',
  ];
  worksheet.getRow(6).eachCell({ includeEmpty: true }, (cell: any) => {
    cell.font = {
      bold: true,
      italic: true,
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'dfdfdf' },
    };
    cell.border = {
      right: { style: 'thin', color: { argb: 'F0F0F0' } },
    };
  });
  worksheet.columns = [
    'SL NO',
    'VEHICLE NO',
    'VEHICLE TYPE',
    'LAST SERVICE',
    'TOTAL COST',
  ].map((i: any) => ({ key: i }));

  // Add data for the sub-tables
  tabledata.forEach((item: any, index: any) => {
    worksheet.addRow({
      'SL NO': `${index + 1}`,
      'VEHICLE NO': item?.vehicle_no || '-',
      'VEHICLE TYPE': item?.vehicle_type || '-',
      'TOTAL COST': `Rs. ${item?.total_job_cards_cost}` || '0',
      'LAST SERVICE': item?.last_service || '-',
    });
    worksheet.addRow([
      '',
      '',
      'SL NO',
      'JOB CARD NO',
      'CREATION DATE',
      'TOTAL JOB CARD COST',
      'CLOSING DATE',
      'DRIVER',
      'SUPERVISOR',
      'MACHANIC',
    ]);
    const lastrow = worksheet.lastRow;
    // @ts-ignore
    haederRows[lastrow?.['_number']] = true;
    // @ts-ignore
   worksheet.getRow(lastrow?.['_number']) 
      .eachCell({ includeEmpty: true }, (cell: any) => {
        if (cell['_value']?.value?.length > 0) {
          cell.font = {
            bold: true,
            italic: true,
          };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'e6e6ef' },
          };
          cell.border = {
            right: { style: 'thin', color: { argb: 'F0F0F0' } },
          };
        }
      });
    item?.job_cards.forEach((products: any, jindex: any) => {
      worksheet.addRow([
        '',
        '',
        `${jindex + 1}`,
        products?.job_card_no || '-',
        products?.date || '-',
        `Rs. ${products?.total_job_card_cost}` || '-',
        products?.closeDate || '-',
        products?.driver || '-',
        products?.supervisor || '-',
        products?.machanic || '-',
      ]);
      worksheet.addRow([
        '',
        '',
        '',
        '',
        'SL NO',
        'PRODUCT ID',
        'PRODUCT',
        'PRODUCT COST',
        'QUANTITY',
        'RETURN QUANTITY',
        'TOTAL COST',
      ]);
      const lastrow = worksheet.lastRow;
              // @ts-ignore
      haederRows[lastrow?.['_number']] = true;
              // @ts-ignore
      worksheet.getRow(lastrow?.['_number'])
        .eachCell({ includeEmpty: true }, (cell: any) => {
          if (cell['_value']?.value?.length > 0) {
            cell.font = {
              bold: true,
              italic: true,
            };
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'e6e6ef' },
            };
            cell.border = {
              right: { style: 'thin', color: { argb: 'F0F0F0' } },
            };
          }
        });
      products?.products?.map((i: any, pindex: any) => {
        worksheet.addRow([
          '',
          '',
          '',
          '',
          `${pindex + 1}`,
          i?.part_no || '-',
          i?.part_name || '-',
          `Rs. ${i?.amount}` || '-',
          `${i?.quantity}` || '-',
          `${i?.return_qty}` || '-',
          `Rs. ${i?.total_cost_after_return}` || '-',
        ]);
      });
    });
    worksheet.addRow([]);
  });
  // Iterate over all rows that have values in a worksheet
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell: any, colNumber) => {
      worksheet.getCell(cell?.['_address']).alignment = {
        wrapText: true,
        indent: 1,
      };
    });
  });
  worksheet.columns.forEach((column: any, i) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell: any) => {
      let columnLength = cell.value ? cell.value.toString().length + 5 : 10;
      if (
        [
          'C1',
          'C2',
          'D1',
          'D2',
          'E1',
          'E2',
          'F1',
          'F2',
          'C3',
          'C4',
          'D3',
          'D4',
          'E3',
          'E4',
          'F3',
          'F4',
          'G4',
          'H4',
          'G2',
          'H2',
          'I2',
        ].find((i: any) => i === cell['_address'])
      ) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        // Do Nothing
      } else if (haederRows[cell?.['_row']?.['_number']]) {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      } else if (columnLength > maxLength) {
        maxLength = columnLength;
      }
      if (cell.value === '-') {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        cell.font = {
          bold: true,
          color: { argb: 'FF0000' },
        };
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });
  const excelBuffer = await workbook.xlsx.writeBuffer({ useStyles: true });
  // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: fileType });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};
