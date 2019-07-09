import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '../../services/notification.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-add-monthly-data',
  templateUrl: './add-monthly-data.component.html',
  styleUrls: ['./add-monthly-data.component.css']
})
export class AddMonthlyDataComponent implements OnInit {

  months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  month:string=this.getCurrentMonth();
  name:string=JSON.parse(localStorage.thrift_user).name.split(' ')[1];

  @Output() close=new EventEmitter();

  addMonthlyDataForm:FormGroup;

  constructor(private fb:FormBuilder, private notification:NotificationService, private dash:DashboardService) { }

  ngOnInit() {

  	this.addMonthlyDataForm=this.fb.group({

  		income:[,[Validators.required]],
  		savingsTarget:[, [Validators.required]]
  	});
  }


  getCurrentMonth() {

      let date=new Date();
      let month=this.months[date.getMonth()];
      let year=date.getFullYear();

      return `${month} ${year}`;
  }


  submit(form:FormGroup) {

  	if(form.get('savingsTarget').value > form.get('income').value) {

  		this.notification.showErrorMsg('Income must be greater than savings target!');
  	}
  	else{

  		let data={data:{total_income:form.get('income').value, 
  				  current_income:form.get('income').value,
  				  savings_target:form.get('savingsTarget').value, purchases:[]}};

  		this.dash.addMonthlyData(JSON.stringify(form.value)).subscribe(() => {

  			this.notification.showSuccessMsg('Income details recorded!');
  			this.close.emit(data);
  		})
  	}

  	form.reset();
  }

}
