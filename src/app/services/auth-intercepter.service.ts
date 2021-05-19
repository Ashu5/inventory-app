import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor{

  constructor(private authService:AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.getToken()!=null){
      const authRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${this.authService.getToken()}`)
        });

        return next.handle(authRequest);
    } else{
      return next.handle(req);
    }      
  }
}
