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

  setToken(token:string) {

  	localStorage.thrift_api_token=token;
  }


  get httpOptions() {

  	return {headers:new HttpHeaders({'Content-Type':'application/json'})};
  }
}
