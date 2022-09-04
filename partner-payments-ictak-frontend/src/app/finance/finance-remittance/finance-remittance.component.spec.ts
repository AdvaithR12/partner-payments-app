import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceRemittanceComponent } from './finance-remittance.component';

describe('FinanceRemittanceComponent', () => {
  let component: FinanceRemittanceComponent;
  let fixture: ComponentFixture<FinanceRemittanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceRemittanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceRemittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
