import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';

import { ExpensesService } from '../../services/expenses.service';
import { ReportService } from '../../services/report.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reportsForm:FormGroup;
 
  constructor(private fb:FormBuilder, private expenses:ExpensesService,
  			  private notification:NotificationService, private report:ReportService) { }

  ngOnInit() {

  	this.reportsForm=this.fb.group({

  		from:[null, [Validators.required]],
  		to:[null, [Validators.required]]
  	})


  	this.setInitialDates();
  }


  setInitialDates() {

  	let toDate=new Date();

  	let difference=1000 * 60 * 60 * 24 * 7;
  	let fromDate=new Date(toDate.getTime() - difference); 

  	this.reportsForm.patchValue({from:{

  		date:{
  			year:fromDate.getFullYear(),
  			month:fromDate.getMonth() + 1,
  			day:fromDate.getDate()
  		},
  		formatted:this.getDateString(fromDate)
  	}, to:{

  		date:{
  			year:toDate.getFullYear(),
  			month:toDate.getMonth() + 1,
  			day:toDate.getDate()
  		},
  		formatted:this.getDateString(toDate)
  	}})
  }


  getDateString(date:Date) {

  	let year=date.getFullYear();
      let month=String(date.getMonth() + 1);
      let day=String(date.getDate());

      if(month.length == 1) {

          month='0'+month;
      }

      if(day.length == 1) {

      	  day='0'+day;
      }

      return `${year}-${month}-${day}`;
  }


  submit(form:FormGroup) {

  	let from=form.get('from').value.formatted;
  	let to=form.get('to').value.formatted;

  	if(this.validateInputs(from, to)) {

  		this.expenses.fetchReportPurchases(from, to).subscribe((res:any) => {

  			let name=JSON.parse(localStorage.thrift_user).name + ' spending report for ' +  from + ' - ' + to;

  			this.report.generateReport(res.data, name);
  		})
  	}
  }


  validateInputs(from, to):boolean {

  	let fromDateNum=new Date(from).getTime();
  	let toDateNum=new Date(to).getTime();

  	if(fromDateNum > toDateNum) {

  		this.notification.showErrorMsg('Please select a to Date ahead of the from Date');
  		return false;
  	}

  	if(fromDateNum == toDateNum) {

  		this.notification.showErrorMsg('Please select different dates');
  		return false;
  	}

  	return true;
  }

}
