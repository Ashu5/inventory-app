import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  public getUserByEmail(email: string): Observable<any> {
    return this.http.get(environment.baseURL + 'getUser/' + email, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public register(user: User): Observable<any> {
    return this.http.post(
      environment.baseURL + 'addUser',
      JSON.stringify(user),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
