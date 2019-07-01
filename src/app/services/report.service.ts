import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  EXCEL_TYPE='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION='.xlsx';

  constructor() { }

  generateReport(purchases:any[], fileName:string):void {

  	const worksheet:XLSX.WorkSheet=XLSX.utils.json_to_sheet(purchases);
  	const workbook:XLSX.WorkBook={Sheets:{'Purchases':worksheet}, SheetNames:['Purchases']};

  	const buffer=XLSX.write(workbook, {bookType:'xlsx', type:'array'});

  	this.downloadReport(buffer, fileName);
  }


  private downloadReport(buffer:any, fileName:string) {

  	const data:Blob=new Blob([buffer], {type:this.EXCEL_TYPE});

  	FileSaver.saveAs(data, fileName);
  }


}
