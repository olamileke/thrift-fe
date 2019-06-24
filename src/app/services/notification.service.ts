import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr:ToastrService) { }

  showSuccessMsg(message:string, title?:string) {

  	this.toastr.success(message, title);
  }


  showErrorMsg(message:string, title?:string) {

  	this.toastr.error(message, title);
  }

  showInfoMsg(message:string, title?:string) {

  	this.toastr.info(message, title);
  }
}
