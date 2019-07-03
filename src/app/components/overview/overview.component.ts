import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  totalIncome:number;
  remIncome:number;
  amountSpent:number;
  expensesCount:number;
  avgSpend:number;
  frequentItems=[{},{},{}];
  dateJoined:string;

  constructor(private dash:DashboardService) { }

  ngOnInit() {

  	this.dash.getOverViewData().subscribe((res:any) => {

  		console.log(res);

  		this.totalIncome=res.incomeData.totalIncome;
  		this.amountSpent=res.incomeData.amountSpent;
  		this.remIncome=res.incomeData.remIncome;
  		this.avgSpend=res.avgSpend;
  		this.frequentItems=res.frequentItems;
  		this.dateJoined=res.dateJoined;
  	})
  }


  getItemName(i:number):string {

  	return this.frequentItems[i]['name'];
  }


  getItemCost(i:number):string {

  	return this.frequentItems[i]['total'];
  }

}
