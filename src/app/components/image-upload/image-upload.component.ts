import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  @Output() close=new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  emitClose() {

  	this.close.emit();
  }

}
