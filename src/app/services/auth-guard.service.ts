import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthServiceService
    ) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        const currentUser = this.authenticationService.isUserLoggedIn();
        if (currentUser) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}