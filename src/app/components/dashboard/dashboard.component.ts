import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	
  totalIncome:number=0;
  remIncome:number=0;
  savingsTarget:number=0;
  remPercent:string;
  styles:any={};
  purchases=[];
  dataFetched:boolean=false;
  @Input() response;
  save_failed:boolean=false;

  constructor(private dash:DashboardService) { }

  ngOnInit() {

      if(Object.keys(this.response).length > 0) {

          this.setInitialValues(this.response);
      }
  }

  setInitialValues(res:any) {

    this.dataFetched=true;

    this.totalIncome=res.data.total_income;
    this.remIncome=res.data.current_income;
    this.savingsTarget=res.data.savings_target;

    if(res.data.hasOwnProperty('purchases')) {

      this.purchases=res.data.purchases;
    }
    
    // calculating the percentage of income remaining to use in the loader

    this.remPercent=String((res.data.current_income/res.data.total_income) * 100)+'%';
    this.styles['width']=this.remPercent;

    if(this.remIncome < this.savingsTarget) {

        this.styles['background']='#DC3545';
        this.save_failed=true;
    }
    else {

      this.styles['background']='#00A86B';
    }
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
