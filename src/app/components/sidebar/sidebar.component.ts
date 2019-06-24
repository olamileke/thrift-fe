import { Component, OnInit, Renderer2, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @ViewChild('arrow') arrow;
  @ViewChild('altlinks') altlinks;
  @ViewChild('altlinkparent') altlinkparent;

  @Output() switchTab=new EventEmitter();

  constructor(private renderer:Renderer2,private elRef:ElementRef) { }

  ngOnInit() {

    if(this.elRef.nativeElement.classList.contains('expense-toggled')) {

      this.toggleAltLinks();
    }
  }


  toggleAltLinks():boolean {

  	if(!this.altlinks.nativeElement.classList.contains('show')) {

  		this.renderer.addClass(this.altlinks.nativeElement, 'show');
  		this.renderer.addClass(this.altlinkparent.nativeElement, 'alt-link-active');
  		this.renderer.addClass(this.arrow.nativeElement, 'active');
  		return true;
  	}

	  this.renderer.removeClass(this.altlinks.nativeElement, 'show');
  	this.renderer.removeClass(this.altlinkparent.nativeElement, 'alt-link-active');
	  this.renderer.removeClass(this.arrow.nativeElement, 'active');
  }

  // emitting the event to the parent component to switch the active tab 

  toggleTab(tab:string):void {

      this.switchTab.emit(tab);
  }

}
