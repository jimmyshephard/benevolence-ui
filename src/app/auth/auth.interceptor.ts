import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this
      .authService
      .isAuthenticated$
      .subscribe(isAuthenticated => {
        console.log(`is Auth ${isAuthenticated}`);
        if (!isAuthenticated) {
          this.router.navigate(['/public/landing']);
          return;
        }
      });

    if (request.url.includes('/secure')) {
      return this
        .authService
        .getAccessTokenSilently()
        .pipe(
          switchMap(token => {
            const clone = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${token}`)
            });
            return next.handle(clone);
          })
        );
    }
    return next.handle(request);

  }

}
