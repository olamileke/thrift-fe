import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http:HttpClient) { }


  add(data:any) {

  	return this.http.post(environment.url+'expense/add', data, this.httpOptions);
  }

  get httpOptions() {

     const options={headers:new HttpHeaders({'Content-Type':'application/json'})};

     return options;
  }	
}
