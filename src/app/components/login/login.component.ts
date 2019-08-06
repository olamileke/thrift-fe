import { Component, OnInit, OnDestroy, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { LoaderService } from '../../services/loader.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm:FormGroup;

  @ViewChild('eye') eye;
  @ViewChild('passwordinput') passwordinput;

  isLoading:Subject<boolean>=this.loader.isLoading;

  private onDestroy$:Subject<void>=new Subject<void>();

  constructor(private fb:FormBuilder, private renderer:Renderer2, private router:Router,
              private route:ActivatedRoute, private userservice:UserService, private loader:LoaderService, 
              private notification:NotificationService, private auth:AuthService) { }

  ngOnInit() {

    // ACTIVATING THE USER'S ACCOUNT CLIENT SIDE

    const token=this.route.snapshot.paramMap.get('token');

    if(token != null ) {

        this.userservice.activateAccount(token).pipe(takeUntil(this.onDestroy$)).subscribe(() => {

            this.notification.showSuccessMsg('Account Activated successfully');
        })
    }

  	this.loginForm=this.fb.group({
  		
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]]
  	});
  }


  ngOnDestroy() {

      this.onDestroy$.next();
  }


  submit(form:FormGroup) {

      this.auth.login(JSON.stringify(form.value)).pipe(takeUntil(this.onDestroy$)).subscribe((res:any) => {

          this.auth.setData(res.token, res.user);
          this.router.navigate(['/dashboard']);
      });
  }


  toggleEyeDisplay(content:string) {

     if(content.length > 0) {

        this.renderer.removeClass(this.eye.nativeElement, 'd-none');
        this.renderer.addClass(this.eye.nativeElement, 'd-block');
     }
     else {

        this.renderer.addClass(this.eye.nativeElement, 'd-none');
        this.renderer.removeClass(this.eye.nativeElement, 'd-block');
     }     
  	 
  }


  togglePasswordDisplay() {

  	  if(this.eye.nativeElement.classList.contains('fa-eye'))
	  {
	      this.renderer.removeClass(this.eye.nativeElement, 'fa-eye');
	      this.renderer.addClass(this.eye.nativeElement, 'fa-eye-slash');
	      this.renderer.setAttribute(this.passwordinput.nativeElement, 'type', 'text');
	  }
	  else
	  {
	      this.renderer.removeClass(this.eye.nativeElement, 'fa-eye-slash');
	      this.renderer.addClass(this.eye.nativeElement, 'fa-eye');
	      this.renderer.setAttribute(this.passwordinput.nativeElement, 'type', 'password');
	  }

  }


  forgotPassword() {

      if(this.loginForm.get('email').invalid) {

          this.notification.showErrorMsg('Enter a valid email address');
      }
      else {

          let data={email:this.loginForm.get('email').value};

          this.userservice.sendPasswordResetMail(data).subscribe(() => {

              this.notification.showSuccessMsg('Password reset mail sent!');
          });
      }
  }

}
