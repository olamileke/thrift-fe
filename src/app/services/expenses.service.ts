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


  fetchDaily(day:string) {

  	day=day.replace(/"/g, '');

  	return this.http.get(environment.url+`expenses/daily/${day}`)
  }


  fetchMonthly(data:any) {

      return this.http.get(environment.url+`expenses/monthly/${data['month']}/${data['year']}`);
  }

  get httpOptions() {

     const options={headers:new HttpHeaders({'Content-Type':'application/json'})};

     return options;
  }	
}
