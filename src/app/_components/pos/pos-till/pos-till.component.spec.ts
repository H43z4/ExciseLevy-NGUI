import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosTillComponent } from './pos-till.component';

describe('PosTillComponent', () => {
  let component: PosTillComponent;
  let fixture: ComponentFixture<PosTillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosTillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosTillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
