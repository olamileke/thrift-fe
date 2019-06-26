import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  breakpoint:boolean=false;
  @Output() toggleTab=new EventEmitter();

  constructor() { }

  ngOnInit() {

  	if(screen.width <= 991) {

  		this.breakpoint=true;
  	}

  }

  // letting the parent component know to display a different view

  emitToggleTab(tab:string):void {

  	this.toggleTab.emit(tab);
  }

}
