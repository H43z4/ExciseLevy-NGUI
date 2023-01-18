import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PR1Component } from './pr1.component';

describe('PR1Component', () => {
  let component: PR1Component;
  let fixture: ComponentFixture<PR1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PR1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PR1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
