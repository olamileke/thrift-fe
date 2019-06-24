import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyExpensesComponent } from './daily-expenses.component';

describe('DailyExpensesComponent', () => {
  let component: DailyExpensesComponent;
  let fixture: ComponentFixture<DailyExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
