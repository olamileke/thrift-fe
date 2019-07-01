import { Component, OnInit, Output, EventEmitter, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  breakpoint:boolean=false;
  @Output() toggleTab=new EventEmitter();
  @Output() search=new EventEmitter();
  @ViewChild('searchInput') searchInput;
  @ViewChild('options') options;
  searchTerm:string='';

  name:string=JSON.parse(localStorage.thrift_user).name;

  constructor(private notification:NotificationService, private renderer:Renderer2,
              private auth:AuthService, private router:Router) { }

  ngOnInit() {

  	if(screen.width <= 991) {

  		this.breakpoint=true;
  	}

  }

  // letting the parent component know to display a different view

  emitToggleTab(tab:string):void {

  	this.toggleTab.emit(tab);
  }


  setSearchTerm(item:string) {

     this.searchTerm=item;
  } 

  emitSearch(item:string) {

    if(this.searchTerm.length >= 3) {

      this.searchTerm=this.searchTerm.charAt(0).toUpperCase() + this.searchTerm.slice(1,).toLowerCase();
      this.search.emit(this.searchTerm);
      this.renderer.setProperty(this.searchInput.nativeElement, 'value', '');
    }
    else {

        this.notification.showErrorMsg('Search Term must be at least 3 characters long');
    }
  }


  getName():string {

      if(this.name.length < 10) {

          return this.name;
      }

      return this.name.slice(0,10)+'...';
  }


  toggleOptions() {

     this.options.nativeElement.classList.toggle('show');
  }


  logout() {

     this.auth.unsetData();
     this.router.navigate(['/login']);
     this.notification.showSuccessMsg('Logged out successfully');
  }

}
