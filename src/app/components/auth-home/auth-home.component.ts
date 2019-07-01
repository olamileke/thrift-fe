import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoaderService } from '../../services/loader.service';
import { ExpensesService } from '../../services/expenses.service';
import { DashboardService } from '../../services/dashboard.service';
import { NotificationService } from '../../services/notification.service';

import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.css']
})
export class AuthHomeComponent implements OnInit {

  isLoading:Subject<boolean>=this.loader.isLoading;
  searchTerm:string;
  addExpenseForm:FormGroup;
  views={dashboard:false, dailyExpenses:false, monthlyExpenses:false, 
        singlePeriod:false, comparison:false, reports:false, search:false};

  @ViewChild(DashboardComponent) dashboard:DashboardComponent;

  constructor(private loader:LoaderService, private router:Router,
              private route:ActivatedRoute, private fb:FormBuilder,
              private expense:ExpensesService, private notification:NotificationService,
              private dash:DashboardService ) { }

  ngOnInit() {

    this.addExpenseForm=this.fb.group({

        'name':['', [Validators.required]],
        'amount':['', [Validators.required]]
    })

  	this.determineView();
  }


  // checking if the url corresponds to a view

  checkObject(tab:string):boolean {

  	if(this.views.hasOwnProperty(tab)) {

  		return true;
  	}

  	return false;
  }


  determineView() {

  	const tab=this.route.snapshot.paramMap.get('tab');

  	if(this.checkObject(tab)) {

  		this.setActiveView(tab);
  	}
  }


  // determining which view is displayed

  setActiveView(tab:string, searchTerm?:string) {

  	const viewKeys=Object.keys(this.views);

  	for(let i=0; i < viewKeys.length; i++) {

  		this.views[viewKeys[i]]=false;
  	}

  	this.views[tab]=true;

    if(tab == 'search') {
        
        this.setSearchParams(searchTerm);       
    }
  }

  setSearchParams(searchTerm:string) {

      this.searchTerm=searchTerm;
  }


  toggleTab(tab:string) {

  	this.setActiveView(tab);
  }


  addExpense(form:FormGroup) {

      let formattedName=form.get('name').value.charAt(0).toUpperCase()+form.get('name').value.slice(1,).toLowerCase();

      let info={name:formattedName, amount:form.get('amount').value};

      this.expense.add(JSON.stringify(info)).subscribe(() => {

          this.notification.showSuccessMsg('Expense Item successfully added');
          this.setIncomeDetails(info);
          form.reset();
      });
  }


  // making sure that the income information displayed to the user tallies with what
  // is in the db

  setIncomeDetails(values:any) {

      if(Object.keys(this.dash.currentDetails).length != 0) {

          this.dash.currentDetails['data'].current_income-=values.amount;

          if(!this.hasBeenRecorded(values)) {

              this.dash.currentDetails['data'].purchases.push({name:values.name, amount:parseFloat(values.amount), time:this.getTime()});
            }
      }

      if(this.views.dashboard) {

        this.dashboard.remIncome=this.dashboard.remIncome - values.amount;
      }
  }


  // checking if the user already has an expense item recorded for the particular item and 
  // incrementing it instead of creating a new record 

  hasBeenRecorded(values:any):boolean {

      for(let i=0; i < this.dash.currentDetails['data'].purchases.length; i++) {

          if(this.dash.currentDetails['data'].purchases[i].name == values.name) {

              this.dash.currentDetails['data'].purchases[i].amount=this.dash.currentDetails['data'].purchases[i].amount + values.amount;
              this.dash.currentDetails['data'].purchases[i].time_created=this.getTime();
              return true;
              break;
          }
      }

      return false;
  }

  getTime() {

    const date=new Date();

    let hour=date.getHours();

    let minutes=String(date.getMinutes());

    if(minutes.length == 1) {

      minutes=`0${minutes}`;
    }

    if(hour < 12) {

        return `${hour}:${minutes} AM`;
    }
    else if(hour == 12) {

        return `${hour}:${minutes} PM`;            
    }
    else {

        return `${hour - 12}:${minutes} PM`;            
    }
  }
}
