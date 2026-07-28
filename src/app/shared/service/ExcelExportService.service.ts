import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  exportExcel(
    fileName: string,
    sheetName: string,
    data: any[],
    columnDefs: any[]
  ) {

    const exportData = data.map(row => {

      const item: any = {};

      columnDefs.forEach(col => {

        let value: any = null;


        // Ưu tiên valueGetter giống AG Grid
        if (col.valueGetter) {

          value = col.valueGetter({
            data: row,
            colDef: col,
            node: null,
            column: null,
            api: null,
            columnApi: null,
            context: {}
          });

        }
        // Nếu không có valueGetter thì lấy field
        else if (col.field) {

          value = row[col.field];

        }


        // Không export những column không có dữ liệu
        if (col.headerName && value !== undefined) {

          item[col.headerName] = value;

        }

      });


      return item;
    });


    const worksheet = XLSX.utils.json_to_sheet(exportData);


    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      sheetName
    );


    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });


    saveAs(
      new Blob(
        [excelBuffer],
        { type: 'application/octet-stream' }
      ),
      fileName
    );
  }
}