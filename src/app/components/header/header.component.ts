import { Component, OnInit, Output, EventEmitter, ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  @Output() update=new EventEmitter();
  @Output() changePicture=new EventEmitter();
  @ViewChild('searchInput') searchInput;
  @ViewChild('navbarContent') navbarContent;
  @ViewChild('options') options;
  displaySearch:boolean=false;
  searchTerm:string='';
  imgSrc=JSON.parse(localStorage.thrift_user).avatar;
  name:string=JSON.parse(localStorage.thrift_user).name;

  tabs={dashboard:false, spending:false, analysis:false, reports:false,overview:false};

  constructor(private notification:NotificationService, private renderer:Renderer2,
              private auth:AuthService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {

  	if(screen.width <= 991) {

  		this.breakpoint=true;

        let tab=this.route.snapshot.paramMap.get('tab');
        this.determineActiveTab(tab);
  	}

  }


  determineActiveTab(tab:string):void {

      if(tab.includes('Expense')) {

          tab='spending';
      }

      if(tab == 'singlePeriod' || tab == 'comparison') {

          tab='analysis';
      }

      const tabKeys=Object.keys(this.tabs);

      for(let i=0; i < tabKeys.length; i++) {

          this.tabs[tabKeys[i]]=false;
      }

      this.tabs[tab]=true;
  }

  // letting the parent component know to display a different view

  emitToggleTab(tab:string, toggle=null):void {

  	this.toggleTab.emit(tab);

    if(toggle == null) {

      this.toggleNavbar();
    }
    this.determineActiveTab(tab);
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


  emitPictureChange() {

      this.changePicture.emit();
      this.toggleNavbar();
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


  emitUpdate() {

      this.update.emit();
      this.toggleNavbar();
  }



  logout() {

     this.auth.unsetData();
     this.router.navigate(['/login']);
     this.notification.showSuccessMsg('Logged out successfully');
  }


  toggleNavbar() {

      if(screen.width <= 991) {

        if(this.navbarContent.nativeElement.classList.contains('d-none')) {

            this.renderer.removeClass(this.navbarContent.nativeElement, 'd-none');
            this.renderer.addClass(this.navbarContent.nativeElement, 'd-block');
        }
        else {

            this.renderer.addClass(this.navbarContent.nativeElement, 'd-none');
            this.renderer.removeClass(this.navbarContent.nativeElement, 'd-block');
        }
       }

  }


  toggleSearch() {

      this.displaySearch=!this.displaySearch;
  }

}
