import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { ErrorService } from './error.service';
import { LocalStorageService } from './local-storage.service';

const apiUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $User: BehaviorSubject<User> = new BehaviorSubject<User>(null!);

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService
  ) {}

  signUp(data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${apiUrl}/user/register`, data).pipe(
      tap((res) => {
        this.localStorageService.setTokens(res.accessToken, res.refreshToken);
        this.$User.next(res.user);
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${apiUrl}/user/login`, data).pipe(
      tap((res) => {
        this.localStorageService.setTokens(res.accessToken, res.refreshToken);
        this.$User.next(res.user);
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }

  logout() {
    this.localStorageService.clearTokens();
    this.$User.next(null!);
  }

  fetchUserData(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/user/me`).pipe(
      tap((res) => {
        this.$User.next({
          _id: res._id,
          firstname: res.firstname,
          role: res.role,
        });
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }

  editUser(data: FormData) {
    return this.http
      .put(`${apiUrl}/user/editProfile`, data)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  getLoggedInUserData(): Observable<any> {
    return this.$User.pipe(
      switchMap((u) => {
        if (u) {
          return of(u);
        }

        const accessToken = this.localStorageService.getAccessToken();
        if (accessToken) {
          return this.fetchUserData();
        }

        return of(null);
      })
    );
  }

  refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
    const refreshToken = this.localStorageService.getFreshToken();
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        `${apiUrl}/user/me/refresToken`,
        { refreshToken }
      )
      .pipe(
        tap((res) => {
          console.log('Token refreshed!');
          this.localStorageService.setTokens(res.accessToken, res.refreshToken);
        })
      );
  }

  getUserProfile(userId: String) {
    return this.http
      .get(`${apiUrl}/user/userProfile/${userId}`)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }
}
