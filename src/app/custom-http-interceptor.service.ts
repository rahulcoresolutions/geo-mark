import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class CustomHttpInterceptorService implements HttpInterceptor {

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
		request = request.clone({headers: request.headers.set('x-api-key', 'wJ3JZ5R90tBYPEWvt3ZGnnerQBEG34NWBiBy3BmDFtbokawC27')});
		request = request.clone({headers: request.headers.set('x-api-secret', 'JDSCigLiZ9ggReL57uMt0ipR4GY4OBQCCozxfZEGPwICvcwDeJ')});
		return next.handle(request);
	}
}
