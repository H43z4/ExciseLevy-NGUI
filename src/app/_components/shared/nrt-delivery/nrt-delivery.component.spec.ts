import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrtDeliveryComponent } from './nrt-delivery.component';

describe('NrtDeliveryComponent', () => {
  let component: NrtDeliveryComponent;
  let fixture: ComponentFixture<NrtDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrtDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NrtDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
