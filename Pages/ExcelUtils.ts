
import * as ExcelJS from 'exceljs';



export async function replaceNumberInTextInExcel(
  inputPath: string,
  outputPath: string,
  findValue: string,
  replaceValue: string
) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(inputPath);

  const findStr = findValue.toString();
  const replaceStr = replaceValue.toString();

  workbook.eachSheet((worksheet) => {
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        if (cell.value !== null) {
          const cellStr = cell.value?.toString();
          if (cellStr?.includes(findStr)) {
            cell.value = cellStr.replace(new RegExp(findStr, 'g'), replaceStr);
          }
        }
      });
    });
  });

  await workbook.xlsx.writeFile(outputPath);
  console.log(`Saved updated file as ${outputPath}`);
}


export async function updateExcelWithMapping(filePath: string, outputPath: string,valueMap:Record<string, string>) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1); // first sheet

  worksheet?.eachRow((row, rowNumber) => {
    const key = row.getCell(1).value?.toString().trim();
    if (key && valueMap[key]) {
      row.getCell(2).value = valueMap[key];
    }
  });

  await workbook.xlsx.writeFile(outputPath);
  console.log(`Saved updated file as ${outputPath}`);
}

//Find and replace value. Also set value depending on property name
export async function FullPackage(filePath: string, outputPath: string, findValue: string, replaceValue: string, valueMap:Record<string, string>) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  

  //Find and replace start
  const findStr = findValue.toString();
  const replaceStr = replaceValue.toString();

  workbook.eachSheet((worksheet) => {
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        if (cell.value !== null) {
          const cellStr = cell.value?.toString();
          if (cellStr?.includes(findStr)) {
            cell.value = cellStr.replace(new RegExp(findStr, 'g'), replaceStr);
          }
        }
      });
    });
  });//Find and replace ends


  //Set value as per key value
  const worksheet = workbook.getWorksheet(1); // first sheet
  worksheet?.eachRow((row, rowNumber) => {
    const key = row.getCell(1).value?.toString().trim();
    if (key && valueMap[key]) {
      row.getCell(2).value = valueMap[key];
    }
  });

  await workbook.xlsx.writeFile(outputPath);
  console.log(`Saved updated file as ${outputPath}`);
}

/*
//Does not replace number in text
export async function replaceTextInExcel(inputPath: string, outputPath: string, findText: string, replaceText: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(inputPath);

  workbook.eachSheet((worksheet) => {
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        if (typeof cell.value === 'string' && cell.value.includes(findText)) {
          cell.value = cell.value.replace(new RegExp(findText, 'g'), replaceText);
        }
      });
    });
  });

  await workbook.xlsx.writeFile(outputPath);
}

export async function updatemultiple(filePath: string, FieldName: string, FieldValue: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1); // assuming first sheet

  worksheet?.eachRow((row, rowNumber) => {
    const firstColValue = row.getCell(1).value;

    // Example logic: if first column is "Pass", set second column to "✓"
    if (firstColValue === FieldName) {
      row.getCell(2).value = FieldValue;
    } else if (firstColValue === 'Fail') {
      row.getCell(2).value = '✗';
    }
  });

  await workbook.xlsx.writeFile(filePath);
  console.log(`Updated Excel file: ${filePath}`);
}
*/