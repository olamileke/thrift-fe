import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';
import { GuestGuardService as GuestGuard } from './guards/guest-guard.service';

import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthHomeComponent } from './components/auth-home/auth-home.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ErrorComponent } from './components/error/error.component';

const routes:Routes=[
						{path:'', component:HomeComponent},
						{path:'signup', component:SignupComponent, canActivate:[GuestGuard]},
						{path:'login', component:LoginComponent, canActivate:[GuestGuard]},
						{path:':tab', component:AuthHomeComponent, canActivate:[AuthGuard]},
						{path:'expenses/:period', component:AuthHomeComponent, canActivate:[AuthGuard]},
						{path:'account/activate/:token', component:LoginComponent, canActivate:[GuestGuard]},
						{path:'password/reset/:token', component:PasswordResetComponent, canActivate:[GuestGuard]},
						{path:'**', component:ErrorComponent}						
					];

@NgModule({
  imports: [
  	RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }