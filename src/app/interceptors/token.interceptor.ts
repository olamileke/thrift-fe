import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';

@Injectable()
export class TokenInterceptor  implements HttpInterceptor{

	constructor(private auth:AuthService) {}

	intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {

		// checking if the user is authenticated and adding the jwt token to the query string

		if(this.auth.isAuthenticated()) {

			const reqclone=req.clone({url:req.url+`?api_token=${this.auth.getToken}`});
			return next.handle(reqclone)
		}

		return next.handle(req);

	}

}