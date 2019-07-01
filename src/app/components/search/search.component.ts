import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {

  purchases=[];
  fetchedData:boolean=false;

  constructor(private expenses:ExpensesService) { }

  @Input() searchTerm:string;

  ngOnInit() {

  	this.fetchSearchResults();
  }


  ngOnChanges() {

  	this.fetchSearchResults();
  }


  fetchSearchResults() {

  	this.expenses.search(this.searchTerm).subscribe((res:any) => {

  		this.fetchedData=true;
  		this.purchases=res.data;
  	})
  }


   getPurchaseDetails():string {

      if(this.purchases.length > 0) {

        return `${this.purchases.length} expense items totalling ${this.getPurchaseTotal()}`;
    }

    return 'No expense items';
  }


  // sum up purchases

  getPurchaseTotal() {

    let total=0;

    for(let i=0; i < this.purchases.length; i++) {

        total+=this.purchases[i].amount;
    }

    return 'N '+String(total);
  }


}
