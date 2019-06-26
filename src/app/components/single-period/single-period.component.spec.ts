import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePeriodComponent } from './single-period.component';

describe('SinglePeriodComponent', () => {
  let component: SinglePeriodComponent;
  let fixture: ComponentFixture<SinglePeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
