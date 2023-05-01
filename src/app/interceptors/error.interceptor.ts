import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err:HttpErrorResponse)=>{
        let errorMessage='';
        if(err.error instanceof ErrorEvent)
        {
          console.log('client side Error');
          errorMessage=`Error:${err.error.message}`
        }
        else
        {
          console.log('server side Error');
          errorMessage=`Error Code: ${err.status} ,Message:${err.message}`
        }
        console.log(errorMessage);
        return throwError(() => (errorMessage))
        
      }));
  }
}
