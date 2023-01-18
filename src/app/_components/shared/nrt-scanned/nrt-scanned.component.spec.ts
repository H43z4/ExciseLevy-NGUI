import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrtScannedComponent } from './nrt-scanned.component';

describe('NrtScannedComponent', () => {
  let component: NrtScannedComponent;
  let fixture: ComponentFixture<NrtScannedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrtScannedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NrtScannedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
