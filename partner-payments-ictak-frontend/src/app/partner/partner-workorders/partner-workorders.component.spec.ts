import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerWorkordersComponent } from './partner-workorders.component';

describe('PartnerWorkordersComponent', () => {
  let component: PartnerWorkordersComponent;
  let fixture: ComponentFixture<PartnerWorkordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerWorkordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerWorkordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
