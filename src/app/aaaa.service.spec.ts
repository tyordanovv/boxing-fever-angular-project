import { TestBed } from '@angular/core/testing';

import { AaaaService } from './aaaa.service';

describe('AaaaService', () => {
  let service: AaaaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AaaaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
