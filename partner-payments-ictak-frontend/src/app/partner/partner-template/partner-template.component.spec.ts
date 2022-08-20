import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTemplateComponent } from './partner-template.component';

describe('PartnerTemplateComponent', () => {
  let component: PartnerTemplateComponent;
  let fixture: ComponentFixture<PartnerTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
