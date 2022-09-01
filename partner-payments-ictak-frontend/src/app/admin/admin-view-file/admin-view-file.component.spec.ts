import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewFileComponent } from './admin-view-file.component';

describe('AdminViewFileComponent', () => {
  let component: AdminViewFileComponent;
  let fixture: ComponentFixture<AdminViewFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
