import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkOrderComponent } from './admin-work-order.component';

describe('AdminWorkOrderComponent', () => {
  let component: AdminWorkOrderComponent;
  let fixture: ComponentFixture<AdminWorkOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWorkOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
