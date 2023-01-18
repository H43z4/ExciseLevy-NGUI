import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmnOwnerComponent } from './cmn-owner.component';

describe('CmnOwnerComponent', () => {
  let component: CmnOwnerComponent;
  let fixture: ComponentFixture<CmnOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmnOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmnOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
