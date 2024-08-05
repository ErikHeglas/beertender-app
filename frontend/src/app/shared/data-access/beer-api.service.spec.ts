import { TestBed } from '@angular/core/testing';

import { BeerApiService } from './beer-api.service';

describe('BeerApiService', () => {
  let service: BeerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
