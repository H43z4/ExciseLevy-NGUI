import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmnReadonlyOwnerComponent } from './cmn-readonly-owner.component';

describe('CmnReadonlyOwnerComponent', () => {
  let component: CmnReadonlyOwnerComponent;
  let fixture: ComponentFixture<CmnReadonlyOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmnReadonlyOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmnReadonlyOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
