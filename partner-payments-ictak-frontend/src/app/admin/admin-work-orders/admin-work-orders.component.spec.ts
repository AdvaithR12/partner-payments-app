import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkOrdersComponent } from './admin-work-orders.component';

describe('AdminWorkOrdersComponent', () => {
  let component: AdminWorkOrdersComponent;
  let fixture: ComponentFixture<AdminWorkOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWorkOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWorkOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
