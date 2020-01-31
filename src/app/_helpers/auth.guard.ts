//credit to Suraj Roy's JSON world demo

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
import { AuthService } from '../_services/auth.service';

import * as moment from 'moment';
 
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
constructor(
private router: Router,
private authenticationService: AuthService
) {}
 
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
const currentUser = localStorage.getItem('currentUser');
if (currentUser && this.checkExpiry(currentUser)) {
// authorised so return true
    return true;
}
 
// not logged in so redirect to login page
this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
localStorage.setItem('currentUser', "");
return false;
}

checkExpiry(currentUser:string) {
    let expiry = JSON.parse(currentUser)['expireAt'];
    return moment().unix() < expiry;
}
}