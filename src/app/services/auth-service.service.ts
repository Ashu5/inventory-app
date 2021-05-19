import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(user: User) {
    return this.http
      .post<any>(environment.baseURL + 'authenticate', JSON.stringify(user), {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        map((data) => {
          if (data !== null) {
            this.storeUser(JSON.stringify(user.email));
          }
          return data;
        })
      );
  }

  public storeUser(user: string) {
    localStorage.setItem('user', user);
  }
  public storeToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  public getToken() {
    return localStorage.getItem('auth_token');
  }
  public removeToken() {
    localStorage.removeItem('user');
    return localStorage.removeItem('auth_token');
  }

  public logout() {
    this.removeToken();
    this.http.get<any>(environment.baseURL + 'api/' + 'logout');
  }

  public isUserLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
