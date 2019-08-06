import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  register(userInfo:any) {

  	return this.http.post(environment.url+'signup', userInfo, this.httpOptions);
  }


  activateAccount(token:string) {

  	return this.http.post(environment.url+`account/activate/${token}`, this.httpOptions);
  }


  sendPasswordResetMail(data:any) {

     return this.http.post(environment.url+`sendpasswordresetmail`, data, this.httpOptions);
  }


  verifyResetToken(token:string) {

     return this.http.get(environment.url+`password/reset/verifytoken/${token}`);
  }


  resetPassword(data:any) {

      return this.http.post(environment.url+`password/reset`, data, this.httpOptions);
  }


  uploadImage(formData:FormData) {

    return this.http.post(environment.url+`image/upload`, formData);
  }


  get httpOptions() {

     const options={headers:new HttpHeaders({'Content-Type':'application/json'})};

     return options;
  }	
}
