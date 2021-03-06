import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private notification:NotificationService, private router:Router) {}

	intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {

		return next.handle(req).pipe( catchError((error:any) => this.handleError(error)))
	}


	handleError(error:any) {

		console.log(error.error);

		if(error.error.url == 'api/signup') {

			this.notification.showErrorMsg('User already exists for the specified email!');
		} 

		else if(error.error.url == 'api/login') {

			this.notification.showErrorMsg('Incorrect username or password');
		}

		else if(error.error.url == 'api/account/activate') {

			this.notification.showErrorMsg('Invalid activation token');
		}

		else if(error.error.url == 'api/sendpasswordresetmail') {

			this.notification.showErrorMsg('User does not exist for the specified email');
		}


		else if(error.error.url == 'api/password/reset/verifytoken') {

			if(error.error.error == 'Invalid Token') {

				this.notification.showErrorMsg('Invalid token');
			}

			if(error.error.error == 'Expired Token') {

				this.notification.showErrorMsg('Expired Token');
			}

			this.router.navigate(['/login']);	
		}

		else {

			this.notification.showErrorMsg('An error occured');
		}

		return of(error);
	}
} 