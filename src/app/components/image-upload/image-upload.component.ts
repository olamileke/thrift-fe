import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  @Output() close=new EventEmitter();
  @ViewChild('fileInput') fileInput;
  file:any;
  imgSelected:boolean=false;
  imgName:string;

  allowedExtensions=['jpg', 'jpeg', 'png'];

  constructor(private notification:NotificationService, private userservice:UserService) { }

  ngOnInit() {
  }


  emitClose() {

  	this.close.emit();
  }


  selectImage() {

      this.fileInput.nativeElement.click();
  }


  setImage(element:any) {

      if(element.files.length > 0) {

          this.file=element.files[0];
          this.imgSelected=true;
          this.imgName=this.file.name;
      }
  }


  fileDropped(event:any) {

      let droppedFile=event.files[0];

      if(droppedFile.fileEntry.isFile) {

          const fileEntry=droppedFile.fileEntry as FileSystemFileEntry;

          fileEntry.file((file:File) => {

              this.file=file;  
              this.imgName=this.file.name;
              this.imgSelected=true;  
          }) 
      }
  }


  deleteImage() {

      this.file={};
      this.imgSelected=false;
  }


  upload() {

      if(this.validateFile(this.file)) {

          let formData=new FormData();
          formData.append('image', this.file, this.file.name);

          this.userservice.uploadImage(formData).subscribe((res:any) => {

              this.notification.showSuccessMsg('Image uploaded successfully');
              localStorage.thrift_user=JSON.stringify(res.user);
              this.deleteImage();
              this.close.emit(res.user.avatar);
          });
      }
  }


  validateFile(file:File):boolean {

      let extension=file.type.split('/')[1];

      if(this.allowedExtensions.indexOf(extension) == -1) {

          this.notification.showErrorMsg('File format is not allowed!');
          return false;
      }

      if(file.size > 1500000) {

          this.notification.showErrorMsg('File is too large!');
          return false;
      }

      return true;
  }

}
