import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMonthlyDataComponent } from './update-monthly-data.component';

describe('UpdateMonthlyDataComponent', () => {
  let component: UpdateMonthlyDataComponent;
  let fixture: ComponentFixture<UpdateMonthlyDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMonthlyDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMonthlyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
