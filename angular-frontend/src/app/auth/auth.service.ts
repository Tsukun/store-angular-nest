import { AuthActions } from './../store/auth/auth.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
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

@Injectable({ providedIn: 'root' })
export class AuthService {
  backendUrl: string = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient, private store: Store) {}
  async login(email: string, password: string) {
    this.http
      .post<AuthResponse>(
        this.backendUrl + '/user/login',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .subscribe((data: AuthResponse) => {
        localStorage.setItem('token', data.refreshToken);
        console.log(data.refreshToken);
        this.store.dispatch(AuthActions.loginUser(data.user));
      });
  }

  async registration(email: string, password: string) {
    this.http.post(this.backendUrl + '/registration', {
      email: email,
      password: password,
    });
  }
}
