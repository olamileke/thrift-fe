import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	
  totalIncome:string;
  remIncome:string;
  savingsTarget:string;
  remPercent:string;
  styles:any={};
  purchases:any={};
  dataFetched:boolean=false;

  private onDestroy$:Subject<void>=new Subject<void>();

  constructor(private dash:DashboardService) { }

  ngOnInit() {

     // checking if the income details have been fetched before and then setting them appropriately

    if(Object.keys(this.dash.currentDetails).length == 0) {

      this.fetchInitialValues();      
    }
    else {

        this.setInitialValues(this.dash.currentDetails);
    }
  }


  ngOnDestroy() {

  	this.onDestroy$.next();
  }


  fetchInitialValues():void {

  	this.dash.fetchCurrentDetails().pipe(takeUntil(this.onDestroy$)).subscribe((res:any) => {

      this.dash.currentDetails=res;
      this.setInitialValues(res);
  	});
  }
  

  setInitialValues(res:any) {

    this.dataFetched=true;

    console.log(res);
    
    this.totalIncome='N '+res.data.total_income;
    this.remIncome='N '+res.data.current_income;
    this.purchases=res.data.purchases;

    // calculating the percentage of income remaining to use in the loader

    this.remPercent=String((res.data.current_income/res.data.total_income) * 100)+'%';
    this.styles['width']=this.remPercent;
    this.savingsTarget='N '+res.data.savings_target
  }

 

  getPurchaseDetails():string {

  	if(this.purchases.length > 0) {

		return `You have ${this.purchases.length} expense items today totalling ${this.getPurchaseTotal()}`;
	}

	return 'You have no expense items today';
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
