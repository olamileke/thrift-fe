import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-daily-expenses',
  templateUrl: './daily-expenses.component.html',
  styleUrls: ['./daily-expenses.component.css']
})
export class DailyExpensesComponent implements OnInit, OnDestroy {

  dateForm:FormGroup;
  month:string;
  purchases=[];
  fetchedData:boolean=false;

  private onDestroy$:Subject<void>=new Subject<void>();

  constructor(private fb:FormBuilder, private expenses:ExpensesService) {}

  ngOnInit() {

  	this.dateForm=this.fb.group({

  		day:[null, [Validators.required]]
  	});

    this.setDate();
  }


  ngOnDestroy() {

      this.onDestroy$.next();
  }


  // setting the default value of the datepicker to today's date

  setDate() {

      let date=new Date();

      this.dateForm.patchValue({day: {
          date:{

              year:date.getFullYear(),
              month:date.getMonth() + 1,
              day:date.getDate()
          },
          formatted:this.getCurrentDay(date)
      }});
  }


  getCurrentDay(date:Date) {

      let year=date.getFullYear();
      let month=date.getMonth() + 1;
      let day=date.getDate();

      if(month < 10) {

          this.month=`0${month}`;
      }

      return `${year}-${this.month}-${day}`;
  }


  submit(form:FormGroup) {

  	this.expenses.fetchDaily(form.get('day').value.formatted).pipe(takeUntil(this.onDestroy$)).subscribe((res:any) => {

         this.fetchedData=true;
         this.purchases=res.data;
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

}
