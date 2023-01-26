import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pr2Component } from './pr2.component';

describe('Pr2Component', () => {
  let component: Pr2Component;
  let fixture: ComponentFixture<Pr2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pr2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pr2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
