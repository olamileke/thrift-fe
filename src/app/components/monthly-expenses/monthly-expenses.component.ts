import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-monthly-expenses',
  templateUrl: './monthly-expenses.component.html',
  styleUrls: ['./monthly-expenses.component.css']
})
export class MonthlyExpensesComponent implements OnInit {
 
  monthForm:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {

  	this.monthForm=this.fb.group({

  		month:['', [Validators.required]]
  	});
  }


  submit(form:FormGroup) {

  	 alert(JSON.stringify(form.value));
  }

}
