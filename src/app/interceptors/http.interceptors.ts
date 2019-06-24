import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './loader.interceptor';
import { TokenInterceptor } from './token.interceptor';


export const HttpInterceptorProviders=[
	{provide:HTTP_INTERCEPTORS, useClass:LoaderInterceptor, multi:true},
	{provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true}
];