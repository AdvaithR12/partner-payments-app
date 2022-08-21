import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewEnquiryComponent } from './admin-new-enquiry.component';

describe('AdminNewEnquiryComponent', () => {
  let component: AdminNewEnquiryComponent;
  let fixture: ComponentFixture<AdminNewEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewEnquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
