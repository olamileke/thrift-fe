import { Component, OnInit, ViewChild, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('hamburger') hamburger;
  @ViewChild('sidebar') sidebar;
  @ViewChild('nav') nav;
  @ViewChild('brandName') brandName;

  @HostListener('window:scroll', ['$event'])
  scrollHandler() {

    if(window.pageYOffset > 40) {

        this.toggleNavBarElementColor();
        this.renderer.addClass(this.nav.nativeElement, 'active');
    }
    else {

        this.renderer.removeClass(this.nav.nativeElement,'active');
    }
  }

  constructor(private renderer:Renderer2, private auth:AuthService, private router:Router) { }

  ngOnInit() {

     if(this.auth.isAuthenticated()) {

         this.router.navigate(['/dashboard']);
     }
  }

  toggleNavBarElementColor() {

    let value=screen.height - 40;

    if(screen.width <= 575 && document.body.scrollTop >= value) {

        this.renderer.addClass(this.brandName.nativeElement, 'alt');
        this.renderer.addClass(this.hamburger.nativeElement, 'alt');
    }
    else {

        this.renderer.removeClass(this.brandName.nativeElement, 'alt');
        this.renderer.removeClass(this.hamburger.nativeElement, 'alt');
    }
  }

  toggleNav() {

  	if(this.hamburger.nativeElement.classList.contains('active')) {

  		this.renderer.removeClass(this.hamburger.nativeElement, 'active');
  		this.renderer.removeClass(this.sidebar.nativeElement, 'active');
  	}
  	else {

  		this.renderer.addClass(this.hamburger.nativeElement, 'active');
  		this.renderer.addClass(this.sidebar.nativeElement, 'active');
  	}
  }


}
