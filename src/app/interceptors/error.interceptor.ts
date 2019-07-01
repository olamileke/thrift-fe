import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';

import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private notification:NotificationService) {}

	intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {

		return next.handle(req).pipe( catchError((error:any) => this.handleError(error)))
	}


	handleError(error:any) {

		console.log(error.error);

		if(error.error.url == 'api/signup') {

			this.notification.showErrorMsg('User already exists for the specified email!');
		} 

		if(error.error.url == 'api/login') {

			this.notification.showErrorMsg('Username or Password is incorrect', 'Authentication failed');
		}

		if(error.error.url == 'api/account/activate') {

			this.notification.showErrorMsg('Invalid activation token');
		}

		if(error.error.url == 'api/sendpasswordresetmail') {

			this.notification.showErrorMsg('User does not exist for the specified email');
		}

		return of(error);
	}
} 