import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // const token = window.localStorage.getItem('token');

    // if (token) { 
    //   req = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer ' + token),
    //   });
    // }

    return next.handle(req).pipe(

      map(response => { 
        if (response instanceof HttpResponse) {
          console.log('RESPONSE')
          console.log(response)
          return response
        }
      }),

      catchError(error => {
        console.log(error)
        console.log('THIS IS AN ERROR')
        let { statusCode } = error.error;
        
        switch (statusCode) { 
          case 401: 
            this.router.navigate(['/login'])
          default: 
            return throwError(error.message);

        }
      })
    );
  }
}
