import { TestBed } from '@angular/core/testing';

import { TokenInterceptorService } from './token-interceprtor.service';

describe('TokenInterceprtorService', () => {
  let service: TokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
