import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http:HttpClient) { }


  add(data:any) {

  	return this.http.post(environment.url+'expenses/add', data, this.httpOptions);
  }


  // fetching all purchases on a particular day

  fetchDaily(day:string) {

  	day=day.replace(/"/g, '');

  	return this.http.get(environment.url+`expenses/daily/${day}`)
  }


  // fetching all purchases in a particular month

  fetchMonthly(data:any) {

      return this.http.get(environment.url+`expenses/monthly/${data['month']}/${data['year']}`);
  }


  singlePeriod(from:string, to:string) {

      return this.http.get(environment.url+`singlePeriod/${from}/${to}`);
  }


  comparison(period1:any, period2:any) {

      return this.http.get(environment.url+`comparison/${period1['start']}/${period1['end']}/${period2['start']}/${period2['end']}`);
  }


  search(searchTerm:string) {

      return this.http.get(environment.url+`expenses/search/${searchTerm}`);
  }


  fetchReportPurchases(from:string, to:string) {

      return this.http.get(environment.url+`dashboard/fetch-report-purchases/${from}/${to}`);
  }

  get httpOptions() {

     const options={headers:new HttpHeaders({'Content-Type':'application/json'})};

     return options;
  }	
}
