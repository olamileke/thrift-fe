import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  currentDetails={};

  public fetchCurrentDetails():Observable<any> {

  	return this.http.get(environment.url+`dashboard/current-details`);
  }


  getOverViewData() {

  	return this.http.get(environment.url+`dashboard/overview`);
  }


  addMonthlyData(data:any) {

  	return this.http.post(environment.url+`dashboard/addmonthlydata`, data, this.httpOptions)
  }


  updateMonthlyData(data:any) {

      return this.http.post(environment.url+`dashboard/updatemonthlydata`, data, this.httpOptions);
  }


  get httpOptions() {

    const options={headers:new HttpHeaders({'Content-Type':'application/json'})};

    return options;
  }	
}
