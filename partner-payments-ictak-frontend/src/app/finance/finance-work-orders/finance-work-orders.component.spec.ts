import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceWorkOrdersComponent } from './finance-work-orders.component';

describe('FinanceWorkOrdersComponent', () => {
  let component: FinanceWorkOrdersComponent;
  let fixture: ComponentFixture<FinanceWorkOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceWorkOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceWorkOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
