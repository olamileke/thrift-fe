import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject,interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  monthEnds=[31,28,31,30,31,30,31,31,30,31,30,31];
  monthEnding:number;
  currentDate:string;
  countdown:string;
  secondInterval=interval(1000);

  private onDestroy$:Subject<void>=new Subject<void>();

  constructor() { }

  ngOnInit() {

  	this.currentDate=this.getCurrentDate();
  }

  ngOnDestroy() {

  	this.onDestroy$.next();
  }

   getCurrentDate() {

  	let date=new Date();
  	let month=date.getMonth();
  	let year=date.getFullYear();

  	this.setCountdown(`${this.monthEnds[month]} ${this.months[month]}, ${year} 23:59:59`);

  	return `${this.days[date.getDay()].slice(0,3)}, ${date.getDate()} ${this.months[month]}, ${year}`;
  }


  // counting down till the end of the month

  setCountdown(monthEnd:string) {	

  	this.monthEnding=new Date(monthEnd).getTime();

      this.secondInterval.pipe(takeUntil(this.onDestroy$)).subscribe(() => {

          let now=new Date().getTime();

          if(this.monthEnding > now) {

            let difference=this.monthEnding - now;

            let days=Math.floor(difference/(1000 * 60 * 60 * 24));

            let hours=Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            let minutes=Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            let seconds=Math.floor((difference % (1000 * 60)) / 1000);

            this.countdown=`${days}d ${hours}h ${minutes}m ${seconds}s`;
          }

        })
  	}

}
