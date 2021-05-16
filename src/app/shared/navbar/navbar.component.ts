import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  public  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthServiceService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
