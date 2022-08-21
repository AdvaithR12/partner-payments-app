import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerInvoiceComponent } from './partner-invoice.component';

describe('PartnerInvoiceComponent', () => {
  let component: PartnerInvoiceComponent;
  let fixture: ComponentFixture<PartnerInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
