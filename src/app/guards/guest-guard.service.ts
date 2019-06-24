import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';


@Injectable({
  providedIn: 'root'
})
export class GuestGuardService implements CanActivate {

  constructor(private router:Router, private auth:AuthService, private notification:NotificationService) { }

  canActivate():boolean {

  	if(!this.auth.isAuthenticated()) {

  		return true;
  	}

  	this.router.navigate(['/dashboard']);
  	this.notification.showInfoMsg('Logout first!', 'Error');

  	return false;
  }
}
