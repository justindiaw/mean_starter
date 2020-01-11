import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { localTokenName } from '../model/token';
import { AppState } from '../store/app.state';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const localToken = localStorage.getItem(localTokenName);
        const token = localToken && localToken.length ? localToken : this.store.selectSnapshot(AppState.token);
        if (token) {
            req = this.addToken(req, token);
        }
        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                //   return this.handle401Error(req, next);
            } else {
                return throwError(error);
            }
        }));
    }

    private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }
}
