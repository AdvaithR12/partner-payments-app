import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewRequestComponent } from './admin-new-request.component';

describe('AdminNewRequestComponent', () => {
  let component: AdminNewRequestComponent;
  let fixture: ComponentFixture<AdminNewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
