import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceTemplateComponent } from './finance-template.component';

describe('FinanceTemplateComponent', () => {
  let component: FinanceTemplateComponent;
  let fixture: ComponentFixture<FinanceTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
