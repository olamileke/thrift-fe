import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';

import { LoaderService } from '../services/loader.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

	constructor(private loader:LoaderService, private notification:NotificationService) {}

	intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {

		this.loader.show();
		return next.handle(req).pipe(finalize(() => this.loader.hide()),
									 catchError((err:any) => this.handleError(err)));
	}


	handleError(error:any) {

		console.log(error.error);

		if(error.error.message == 'User already exists' && error.status == 403) {

			this.notification.showErrorMsg('Email already exists', 'Error');
			return of(error);
		}

		this.notification.showErrorMsg('Problem processing the request', 'Error');		
		return of(error);
	}	
}