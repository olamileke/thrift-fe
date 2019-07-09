import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonthlyDataComponent } from './add-monthly-data.component';

describe('AddMonthlyDataComponent', () => {
  let component: AddMonthlyDataComponent;
  let fixture: ComponentFixture<AddMonthlyDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMonthlyDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMonthlyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
