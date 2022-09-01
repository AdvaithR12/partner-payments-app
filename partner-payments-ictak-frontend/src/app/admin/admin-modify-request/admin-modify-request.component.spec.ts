import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifyRequestComponent } from './admin-modify-request.component';

describe('AdminModifyRequestComponent', () => {
  let component: AdminModifyRequestComponent;
  let fixture: ComponentFixture<AdminModifyRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModifyRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminModifyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
