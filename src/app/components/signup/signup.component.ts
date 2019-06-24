import { Component, OnInit, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '../../services/loader.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  private onDestroy$:Subject<void>=new Subject<void>(); 

  @ViewChild('passwordinput') passwordinput;
  @ViewChild('eye') eye;
  @ViewChild('signupbutton') signupbutton;

  signupForm:FormGroup;
  isLoading:Subject<boolean>=this.loader.isLoading;

  constructor(private fb:FormBuilder, private http:HttpClient,
              private loader:LoaderService, private renderer:Renderer2,
              private userservice:UserService, private notification:NotificationService) { }

  ngOnInit() {

  	this.signupForm=this.fb.group({

  		name:['', [Validators.required]],
  		email:['', [Validators.required, Validators.email]],
  		password:['', [Validators.required, Validators.minLength(8)]]
  	});
  }

  ngOnDestroy() {

    this.onDestroy$.next();
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

  submit(form:FormGroup) {

    const userInfo={name:form.controls.name.value, email:form.controls.email.value, password:form.controls.password.value};

    this.userservice.register(JSON.stringify(userInfo)).pipe(takeUntil(this.onDestroy$)).subscribe((res:any) => {

       this.renderer.setProperty(this.signupbutton.nativeElement, 'disabled', true);
       this.notification.showSuccessMsg('Check your email to activate your account');
    });
  }

}
