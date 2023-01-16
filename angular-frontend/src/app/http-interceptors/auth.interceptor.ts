import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

export interface IUser {
  email: string;
  role: string;
  isAuth: boolean;
  id: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient) {}
  refreshdUrl: string = 'http://127.0.0.1:5000/user/refresh';
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': 'http://127.0.0.1:4200',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(req.headers.keys());
        if (error.status == 401) {
          this.http.get(this.refreshdUrl);
        }
        throw error;
      })
    );
  }
}
