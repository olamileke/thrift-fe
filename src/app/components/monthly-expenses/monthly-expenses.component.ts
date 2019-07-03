import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-monthly-expenses',
  templateUrl: './monthly-expenses.component.html',
  styleUrls: ['./monthly-expenses.component.css']
})
export class MonthlyExpensesComponent implements OnInit {
 
  monthForm:FormGroup;
  months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  purchases=[];
  monthIncome:any;
  savings:any;
  fetchedData:boolean=false;

  constructor(private fb:FormBuilder, private expenses:ExpensesService) { }

  ngOnInit() {

  	this.monthForm=this.fb.group({

  		month:[this.getCurrentMonth(), [Validators.required]],
        year:['2019', [Validators.required]]
  	});
  }


  getCurrentMonth():string {

    let date=new Date();

    return this.months[date.getMonth()];
  }

  submit(form:FormGroup) {

     let monthnum=this.months.indexOf(form.get('month').value) + 1;
     const data={month:monthnum, year:form.get('year').value};

     this.expenses.fetchMonthly(data).subscribe((res:any) => {

         this.fetchedData=true;
         this.purchases=res.purchases;
         this.monthIncome=res.monthIncome;
         this.savings=res.savings;

         console.log(res);
     });
  }


  getPurchaseDetails():string {

    if(this.purchases.length > 0) {

      return `${this.purchases.length} expense items totalling ${this.getPurchaseTotal()}`;
    }   

    return 'No expense items';
  }


  // sum up purchases

  getPurchaseTotal() {

    let total=0;

    for(let i=0; i < this.purchases.length; i++) {

        total+=this.purchases[i].amount;
    }

    return 'N '+String(total);
  }


  isCurrentMonth():boolean {

      if(this.monthIncome.month == this.getCurrentMonth() && this.monthIncome.year == '2019') {

          return true;
      }

      return false;
  }


  getSavingsStatement():string {


      if(this.isCurrentMonth()) {

          if(this.savings.is_achieved) {

              return `Savings Target of N ${this.savings.amount}`;
          }

          return `Savings Target of N ${this.savings.amount} not achieved`;
      }
      

      if(this.savings.is_achieved) {

          return `Savings Target of N ${this.savings.amount} achieved`;
      }

      return `Savings Target of N ${this.savings.amount} not achieved`;
  }

}
