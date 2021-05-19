import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient,private dialogService:DialogService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

public login(email: string, password: string) {
  return this.http.get<any>(environment.baseURL+"getUser/"+email+"/"+password)
      .pipe(map(user => {
          if (user!==null) { 
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('user', JSON.stringify(user.fname));
              this.currentUserSubject.next(user);
          }else{
           this.dialogService.openDialog("Authentication","Error Occured ")
          }

          return user;
      }));
}

public logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('user');
  this.currentUserSubject.next(null);
}

public isUserLoggedIn():boolean {
  let user = localStorage.getItem('currentUser');
  return !(user === null)
}
}
