import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DashboardService } from '../../services/dashboard.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-update-monthly-data',
  templateUrl: './update-monthly-data.component.html',
  styleUrls: ['./update-monthly-data.component.css']
})
export class UpdateMonthlyDataComponent implements OnInit {

  months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  month:string=this.getCurrentMonth();
  name:string=JSON.parse(localStorage.thrift_user).name.split(' ')[1]; 
  initialIncome:number;
  initialSavingsTarget:number;
  @Output() close=new EventEmitter();

  updateForm:FormGroup;

  constructor(private fb:FormBuilder, private dash:DashboardService, private notification:NotificationService) { }

  ngOnInit() {

  	this.updateForm=this.fb.group({

  		income:[null, [Validators.required]],
  		savingsTarget:[null, [Validators.required]]
  	});
  }


  getCurrentMonth() {

      let date=new Date();
      let month=this.months[date.getMonth()];
      let year=date.getFullYear();

      return `${month} ${year}`;
  }


  setValues(incomeamt:number, savings:number) {

  	 this.initialIncome=incomeamt;
  	 this.initialSavingsTarget=savings;

 	 this.updateForm.patchValue({income:incomeamt, savingsTarget:savings})
  }


  emitClose() {

  	this.close.emit();
  }


  submit(form:FormGroup) {

  	let addedAmt=form.get('income').value - this.initialIncome;

  	 if(this.validateInputs(form)) {
  		
  	 	this.dash.updateMonthlyData(form.value).subscribe(() => {

  	 		this.notification.showSuccessMsg('Income data updated!');
  	 		this.dash.currentDetails['data'].total_income=form.get('income').value;
  	 		this.dash.currentDetails['data'].current_income+=addedAmt;
  	 		this.dash.currentDetails['data'].savings_target=form.get('savingsTarget').value;
  	 		this.close.emit(this.dash.currentDetails);
  	 	})
  	 }
  }


  validateInputs(form:FormGroup):boolean {

  	if(form.get('savingsTarget').value < this.initialSavingsTarget) {

  		this.notification.showErrorMsg('Please enter a higher savings target');
  		return false;
  	}

  	if(form.get('income').value < this.initialIncome) {

  		this.notification.showErrorMsg('Please enter a higher income');
  		return false;
  	}

  	return true;
  }


}
 