import { TestBed } from '@angular/core/testing';

import { PR2Service } from './pr2.service';

describe('PR2Service', () => {
  let service: PR2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PR2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
