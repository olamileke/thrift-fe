import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
}
