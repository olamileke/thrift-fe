import { Component, OnInit } from '@angular/core';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '../../services/notification.service';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  comparisonForm:FormGroup;

  // chart configuration options

  chartType:string='line';
  chartDataset=[];
  chartLabels=[];
  chartOptions={responsive:true,legend:{labels:{fontFamily:'Raleway', padding:5, fontSize:15}},
  				 scales:{ yAxes:[{gridLines:{zeroLineColor:'transparent'},ticks: { padding: 10,fontColor: "rgba(0,0,0,0.8)", beginAtZero: true, fontFamily:'Raleway'}}],
						  xAxes: [{gridLines:{zeroLineColor:'transparent', display:false},ticks: {padding: 10,fontColor: "rgba(0,0,0,0.8)", fontFamily:'Raleway'}}]}
				};
  chartColors=[
  				{backgroundColor: 'rgba(0,0,0,0.035)',
			    borderColor: 'rgb(87, 160, 211)',
			    pointBackgroundColor: 'rgb(87, 160, 211)',
			    pointBorderColor: 'rgb(87, 160, 211)',			  
  				},
  				{backgroundColor: 'rgba(0,0,0,0.035)',
			    borderColor: 'rgb(41, 171, 135)',
			    pointBackgroundColor: 'rgb(41, 171, 135)',
			    pointBorderColor: 'rgb(41, 171, 135)',			  
  				}]
  fetchedData:boolean=false;

  constructor(private fb:FormBuilder, private notification:NotificationService, 
              private expenses:ExpensesService) { }

  ngOnInit() {

  	this.comparisonForm=this.fb.group({

  		period1Start:[null, [Validators.required]],
  		period1End:[null, [Validators.required]],
  		period2Start:[null, [Validators.required]],
  		period2End:[null, [Validators.required]]
  	})


  	this.setInitialDates();
  }


  // setting the default values of the datepickers

  setInitialDates() {

  	let difference=1000 * 60 * 60 * 24 * 7;
  	let period2End=new Date();
  	let period2Start=new Date(period2End.getTime() - difference);
  	let period1End=new Date(period2End.getTime() - (difference * 2));
  	let period1Start=new Date(period2End.getTime() - (difference * 3));

  	this.comparisonForm.patchValue({period1Start:{

  		date:{
  			year:period1Start.getFullYear(),
  			month:period1Start.getMonth() + 1,
  			day:period1Start.getDate()
  		},
  		formatted:this.getDateString(period1Start)
  	}, period1End:{

  		date:{
  			year:period1End.getFullYear(),
  			month:period1End.getMonth() + 1,
  			day:period1End.getDate()
  		},
  		formatted:this.getDateString(period1End)
  	}, period2Start:{

  		date:{
  			year:period2Start.getFullYear(),
  			month:period2Start.getMonth() + 1,
  			day:period2Start.getDate()
  		},
  		formatted:this.getDateString(period2Start)
  	}, period2End:{

  		date:{
  			year:period2End.getFullYear(),
  			month:period2End.getMonth() + 1,
  			day:period2End.getDate()
  		},
  		formatted:this.getDateString(period2End)
  	}})
  }


  // getting the passed in date object in the form YYY-MMM-DDD

  getDateString(date:Date) {

      let year=date.getFullYear();
      let month=String(date.getMonth() + 1);
      let day=String(date.getDate());

      if(month.length == 1) {

          month='0'+month;
      }

      if(day.length == 1) {

      	  day='0'+day;
      }

      return `${year}-${month}-${day}`;
  }


  submit(form:FormGroup) {

  	let period1={start:form.get('period1Start').value.formatted, end:form.get('period1End').value.formatted, period:'Period 1'};
  	let period2={start:form.get('period2Start').value.formatted, end:form.get('period2End').value.formatted, period:'Period 2'};

  	if(this.validateInputs(period1, period2)) {

  		this.expenses.comparison(period1, period2).subscribe((res:any) => {

  		this.fetchedData=true;
		this.chartLabels=this.getLabels(res.data.period1[0], res.data.period2[0]);

		let dataset1={data:res.data.period1[1], label:`${period1.start} - ${period1.end}`, borderWidth:2, pointBorderWidth:2};
		let dataset2={data:res.data.period2[1], label:`${period2.start} - ${period2.end}`, borderWidth:2, pointBorderWidth:2};
		this.chartDataset=[];
		this.chartDataset.push(dataset1);
		this.chartDataset.push(dataset2);
  		})
  	}
  }


  getLabels(period1Labels:any, period2Labels:any) {

  	let labels=[];

  	for(let i=0; i < period1Labels.length; i++) {

  		let subLabel=[period1Labels[i], period2Labels[i]];
  		labels.push(subLabel);
  	}

  	return labels;
  }


  validateInputs(period1:any, period2:any):boolean {

  	let periods=[period1, period2];
  	let difference=1000 * 60 * 60 * 24 * 7;

  	let period1difference=new Date(period1.end).getTime() - new Date(period1.start).getTime();
  	let period2difference=new Date(period2.end).getTime() - new Date(period2.start).getTime();

  	if(period2difference != period1difference) {

  		this.notification.showErrorMsg('Please select the same number of days for both periods', 'Error');
  		return false;
  	}

  	for(let i=0; i < periods.length; i++) {

  		let start=new Date(periods[i].start).getTime();
  		let end=new Date(periods[i].end).getTime();

  		if(start > end) {

  			this.notification.showErrorMsg('End date must be greater than the Start date', periods[i].period);
  			return false;
  		}

  		if(start == end) {

  			this.notification.showErrorMsg('Please select different dates', periods[i].period);
  			return false;
  		}

  		if((end - start) > difference) {

  			this.notification.showErrorMsg('Dates selected are more than 7 days apart', periods[i].period);
  			return false;
  		}
  	}

  	return true;
  }

}
