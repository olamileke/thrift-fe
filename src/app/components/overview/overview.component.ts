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
  dateJoined:string;

  chartType:string='bar';
  chartDataset=[];
  chartLabels=[];
  chartOptions={responsive:true,legend:{labels:{fontFamily:'Raleway', fontSize:15, padding:5}},
  				 scales:{ yAxes:[{gridLines:{zeroLineColor:'transparent'},ticks: { padding: 10,fontColor: "rgba(0,0,0,0.8)", beginAtZero: true, fontFamily:'Raleway'}}],
						  xAxes: [{barPercentage:0.4,gridLines:{zeroLineColor:'transparent', display:false},ticks: {padding: 10,fontColor: "rgba(0,0,0,0.8)", fontFamily:'Raleway'}}]}
				};
  chartColors=[
  				{backgroundColor: 'rgb(129, 216, 208)',
			    borderColor: 'rgb(129, 216, 208)',
			    pointBackgroundColor: 'rgb(87, 160, 211)',
			    pointBorderColor: 'rgb(87, 160, 211)',
  				}]
  fetchedData:boolean=false;

  constructor(private dash:DashboardService) { }

  ngOnInit() {

  	this.dash.getOverViewData().subscribe((res:any) => {

  		this.fetchedData=true;
  		this.totalIncome=res.incomeData.totalIncome;
  		this.amountSpent=res.incomeData.amountSpent;
  		this.remIncome=res.incomeData.remIncome;
  		this.avgSpend=res.avgSpend;
  		this.dateJoined=res.dateJoined;

  		let data={data:this.getChartData(res.frequentItems), label:`Top 3 Expense Items`, borderWidth:2}

  		this.chartLabels=this.getLabels(res.frequentItems);
  		this.chartDataset.push(data);
  	})
  }


  getLabels(array:any[]) {

  	let labels=[];

  	for(let i=0; i < array.length; i++) {

  		labels.push(array[i]['name']);
  	}

  	return labels;
  }


  getChartData(array:any[]) {

  	let data=[];

  	for(let i=0; i < array.length; i++) {

  		data.push(array[i]['total']);
  	}

  	return data;
  }

}
