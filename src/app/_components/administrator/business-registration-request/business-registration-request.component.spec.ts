import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRegistrationRequestComponent } from './business-registration-request.component';

describe('BusinessRegistrationRequestComponent', () => {
  let component: BusinessRegistrationRequestComponent;
  let fixture: ComponentFixture<BusinessRegistrationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessRegistrationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessRegistrationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
