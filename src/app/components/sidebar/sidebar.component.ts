import { Component, OnInit, Renderer2, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @ViewChild('expenseArrow') expense_arrow;
  @ViewChild('analysisArrow') analysis_arrow;
  @ViewChild('expenselinks') expenselinks;
  @ViewChild('expenseParent') expenseParent;
  @ViewChild('analysislinks') analysislinks;
  @ViewChild('analysisParent') analysisParent;

  @Output() switchTab=new EventEmitter();

  tabs={dashboard:true, spending:false, analysis:false, reports:false, history:false}


  constructor(private renderer:Renderer2, private route:ActivatedRoute) { }

  ngOnInit() {

      this.setInitialActiveTab();
  }


  setInitialActiveTab() {

      let tab=this.route.snapshot.paramMap.get('tab');

      if(tab.includes('Expenses')) {

          tab='spending';
      }

      if(tab == 'singlePeriod' || tab == 'comparison') {

          tab='analysis';
      }

      this.changeActiveTab(tab);

  }


  toggleLinks(tab:string) {

    if(tab == 'spending') {

      	this.toggleSpendingLinks();
     }
     else if(tab == 'analysis') {

         this.toggleAnalysisLinks();
     } 
  }


  toggleSpendingLinks() {

      if(!this.expenselinks.nativeElement.classList.contains('show')) {

        this.renderer.addClass(this.expenselinks.nativeElement, 'show');
        this.renderer.addClass(this.expenseParent.nativeElement, 'alt-link-active');
        this.renderer.addClass(this.expense_arrow.nativeElement, 'active');
        return true;
      }

       this.renderer.removeClass(this.expenselinks.nativeElement, 'show');
       this.renderer.removeClass(this.expenseParent.nativeElement, 'alt-link-active');
       this.renderer.removeClass(this.expense_arrow.nativeElement, 'active');
  }

  toggleAnalysisLinks() {

      if(!this.analysislinks.nativeElement.classList.contains('show')) {

        this.renderer.addClass(this.analysislinks.nativeElement, 'show');
        this.renderer.addClass(this.analysisParent.nativeElement, 'alt-link-active');
        this.renderer.addClass(this.analysis_arrow.nativeElement, 'active');
        return true;
      }

       this.renderer.removeClass(this.analysislinks.nativeElement, 'show');
       this.renderer.removeClass(this.analysisParent.nativeElement, 'alt-link-active');
       this.renderer.removeClass(this.analysis_arrow.nativeElement, 'active');
  }


  // emitting the event to the parent component to switch the active tab 

  toggleTab(tab:string):void {

      let param=tab;

      if(param.includes('Expenses')) {

          param='spending';
      }

      if(param == 'singlePeriod' || param == 'comparison') {

          param='analysis'
      }

      this.changeActiveTab(param);
      this.switchTab.emit(tab);
  }

  changeActiveTab(tab:string) {

      const tabKeys=Object.keys(this.tabs);

      for(let i=0; i < tabKeys.length; i++) {

          this.tabs[tabKeys[i]]=false;
      }

      this.tabs[tab]=true;
  }

}
