import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';

import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

	constructor(private loader:LoaderService) {}

	intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {

		this.loader.show();
		return next.handle(req).pipe(finalize(() => this.loader.hide()));
	}

}