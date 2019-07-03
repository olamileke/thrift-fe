import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  resetForm:FormGroup;
  userId:number;
  isLoading:Subject<boolean>=this.loader.isLoading;

  constructor(private router:Router, private route:ActivatedRoute, 
  			  private userservice:UserService, private fb:FormBuilder, 
  			  private notification:NotificationService, private loader:LoaderService) { }

  ngOnInit() {

  	let token=this.route.snapshot.paramMap.get('token');

	  this.userservice.verifyResetToken(token).subscribe((res:any) => {

	  	this.userId=res.userId;
  	})


	this.initForm();
  }


  initForm() {

  	this.resetForm=this.fb.group({

  		password:['', [Validators.required, Validators.minLength(8)]],
  		confirmPassword:['', [Validators.required, Validators.minLength(8)]]
  	});
  }


  submit(form:FormGroup) {

  	let data={userId:this.userId};

  	if(form.get('password').value !== form.get('confirmPassword').value) {

  		this.notification.showErrorMsg('Passwords do not match');
  	}
  	else {

  		data['password']=form.get('password').value;

  		this.userservice.resetPassword(data).subscribe(() => {

  			this.router.navigate(['/login']);
  			this.notification.showSuccessMsg('Password Reset successful!');
  		})
  	}
  }

}
