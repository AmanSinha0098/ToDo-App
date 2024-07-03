import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from '../../models/User';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.userApiurl;

  private tokenKey = 'auth-token';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<string> {
    const body = { username: username, password: password };
    return this.http.post(`${this.url}`, body, { responseType: 'text' }).pipe(
      tap(token => {
        sessionStorage.setItem(this.tokenKey, token);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        sessionStorage.removeItem(this.tokenKey);
        return of('');
      })
    );
  }

  signUp(user: User): Observable<string> {
    return this.http.post<User>(`${this.url}/register`, user).pipe(
      tap((user) => {
        console.log('User registered:', user.toString());
      }),
      catchError((error) => {
        if (error.status == 409) {
          console.log('User already exists');
          return of('User already exists');
        }
        return of('Registration error:', error);
      })
    );
  }


  logout() {
    sessionStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }
}