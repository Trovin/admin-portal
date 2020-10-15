import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '@models/user/input-user.dto';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  private userSubject = new BehaviorSubject<User>(null);
  private refreshTokenTimeout;

  get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { email, password }, { withCredentials: true })
      .pipe(map(user => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        localStorage.setItem('jwt-refresh-token-users', JSON.stringify(user));
        return user;
      }));
  }

  register(firstName: string, lastName: string, email: string, password: string, selectedCountry: string, registrationDate: Date): Observable<User> {
    return this.http.post<any>(
      `${environment.apiUrl}/users/register`,
      { firstName, lastName, email, password, selectedCountry, registrationDate },
      { withCredentials: true }
      ).pipe(map(user => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        localStorage.setItem('jwt-refresh-token-users', JSON.stringify(user));
        return user;
      }));
  }

  update(id: number, firstName: string, lastName: string, email: string, password: string, selectedCountry: string, registrationDate: Date): any {
    return this.http.put<any>(
      `${environment.apiUrl}/users/update`,
      { id, firstName, lastName, email, password, selectedCountry, registrationDate },
      { withCredentials: true }
    ).pipe(map(user => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        localStorage.setItem('jwt-refresh-token-users', JSON.stringify(user));
        return user;
      }));
  }

  logout(): Observable<void> {
    return this.http.post<any>(`${environment.apiUrl}/users/revoke-token`, {}, { withCredentials: true })
      .pipe(map(() => {
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        localStorage.removeItem('jwt-refresh-token-users');
      }));
  }

  refreshToken(): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/users/refresh-token`, {}, { withCredentials: true })
      .pipe(map((user) => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  private startRefreshTokenTimer(): void {
    const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);

    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }

}
