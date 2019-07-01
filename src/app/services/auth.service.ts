import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(userInfo:any) {

  	return this.http.post(environment.url+'login',userInfo, this.httpOptions);
  }	


  isAuthenticated():boolean {

  	if(localStorage.thrift_api_token != undefined && localStorage.thrift_api_token.length > 0) {

  		return true;
  	}

  	return false;
  }


  get getToken() {

      return localStorage.thrift_api_token;
  }

  setData(token:string, user:any) {

  	localStorage.thrift_api_token=token;
    localStorage.thrift_user=JSON.stringify(user);

  }


  unsetData() {

     localStorage.removeItem('thrift_api_token');
     localStorage.removeItem('thrift_user');
  }


  get httpOptions() {

  	return {headers:new HttpHeaders({'Content-Type':'application/json'})};
  }
}
