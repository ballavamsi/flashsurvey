import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from './storage/storage.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private _storageService: StorageService,
    private _router: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    req = this.addUserToken(req);
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      })
      // catchError((error: HttpErrorResponse) => {
      //   let data = {};
      //   data = {
      //     reason:
      //       error && error.error && error.error.reason
      //         ? error.error.reason
      //         : '',
      //     status: error.status,
      //   };
      //   if (error.status == 401) {
      //     this._storageService.clearAllSession();
      //     this._router.navigate(['/login']);
      //     return throwError(error);
      //   }
      //   return null;
      // })
    );
  }

  private addUserToken(request: HttpRequest<any>): HttpRequest<any> {
    var userDetails = this._storageService.getUserSessionDetails();
    if (userDetails != null) {
      return request.clone({
        headers: request.headers
          .set('UserToken', userDetails?.userGuid)
          .set('Bypass-Tunnel-Reminder', 'True'),
      });
    } else {
      return request.clone({
        headers: request.headers.set('Bypass-Tunnel-Reminder', 'True'),
      });
    }
  }
}
