import { Component, OnInit, OnDestroy, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from '../../services/notification.service';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-single-period',
  templateUrl: './single-period.component.html',
  styleUrls: ['./single-period.component.css']
})
export class SinglePeriodComponent implements OnInit, OnDestroy {

  periodForm:FormGroup;
  month:string;

  private onDestroy$:Subject<void>=new Subject<void>();

  chartType:string='line';
  chartDataset=[];
  chartLabels=[];
  chartOptions={responsive:true,legend:{labels:{fontFamily:'Raleway', padding:10}},
  				 scales:{ yAxes:[{gridLines:{zeroLineColor:'transparent'},ticks: { padding: 10,fontColor: "rgba(0,0,0,0.8)", beginAtZero: true, fontFamily:'Raleway'}}],
						  xAxes: [{gridLines:{zeroLineColor:'transparent', display:false},ticks: {padding: 10,fontColor: "rgba(0,0,0,0.8)", fontFamily:'Raleway'}}]}
				};
  chartColors=[
  				{backgroundColor: 'rgba(0,0,0,0.035)',
			    borderColor: 'rgb(87, 160, 211)',
			    pointBackgroundColor: 'rgb(87, 160, 211)',
			    pointBorderColor: 'rgb(87, 160, 211)',
			    // pointHoverBackgroundColor: '#fff',
			    // pointHoverBorderColor: 'rgba(103, 58, 183, .8)'}
  				}]
  fetchedData:boolean=false;

  constructor(private fb:FormBuilder,  private notification:NotificationService,
  			  private expenses:ExpensesService) { }

  ngOnInit() {

  	this.periodForm=this.fb.group({
  		from:[null, [Validators.required]],
  		to:[null, Validators.required]
  	})

  	this.setInitialDate();
  }


  ngOnDestroy() {

      this.onDestroy$.next();
  }


  // setting the default values of the datepickers

  setInitialDate() {

  	let date=new Date();
  	let fromDateNum=date.getTime() - (1000 * 60 * 60 * 24 * 7);
  	let fromDate=new Date(fromDateNum);

  	this.periodForm.patchValue({to:{

  		date:{
              year:date.getFullYear(),
              month:date.getMonth() + 1,
              day:date.getDate()
          },
          formatted:this.getDateString(date)
  	}, from:{

  		date:{
              year:fromDate.getFullYear(),
              month:fromDate.getMonth() + 1,
              day:fromDate.getDate()
          },
          formatted:this.getDateString(fromDate)
  	}})
  }


  // getting the passed in date object in the form YYY-MMM-DDD

  getDateString(date:Date) {

      let year=date.getFullYear();
      let month=date.getMonth() + 1;
      let day=date.getDate();

      if(month < 10) {

          this.month=`0${month}`;
      }

      return `${year}-${this.month}-${day}`;
  }


  submit(form:FormGroup) {

  	let from=form.get('from').value.formatted;
  	let to=form.get('to').value.formatted;

  	if(this.validateInputs(from,to)){

  		this.expenses.singlePeriod(from,to).pipe(takeUntil(this.onDestroy$)).subscribe((res:any) => {

  			this.fetchedData=true;
  			this.chartLabels=res.data[0];

  			let data={data:res.data[1], label:`Graphical Spending Analysis for ${from} - ${to}`, borderWidth:2, pointBorderWidth:2}
  			this.chartDataset=[];
  			this.chartDataset.push(data);
  		});
  	}
  }


  validateInputs(from:string, to:string):boolean {

  	let fromDateNum=new Date(from).getTime();
  	let toDateNum=new Date(to).getTime();
  	let difference=1000 * 60 * 60 * 24 * 7;

  	if(toDateNum < fromDateNum) {

  		this.notification.showErrorMsg('Please select a to Date ahead of the from Date');
  		return false;  		
  	}

  	if(toDateNum == fromDateNum) {

  		this.notification.showErrorMsg('Please select different dates');
  		return false;
  	}

  	if((toDateNum - fromDateNum) > difference) {

  		this.notification.showErrorMsg('Dates selected are more than 7 days apart');
  		return false;
  	}

  	return true;
  }

}
