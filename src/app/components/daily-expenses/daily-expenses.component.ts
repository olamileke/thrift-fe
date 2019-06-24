import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-daily-expenses',
  templateUrl: './daily-expenses.component.html',
  styleUrls: ['./daily-expenses.component.css']
})
export class DailyExpensesComponent implements OnInit {

  // model:NgbDateStruct;
  dateForm:FormGroup;
  expenses:any;

  constructor(private fb:FormBuilder) {}

  ngOnInit() {

  	this.dateForm=this.fb.group({

  		day:['', [Validators.required]]
  	});

    this.initToday();
  }


  submit(form:FormGroup) {

  	alert(JSON.stringify(form.value));
  }


  initToday() {

      // this.model=this.calendar.getToday();
  }

}
