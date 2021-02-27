import { TestBed } from '@angular/core/testing';

import { YearOptionsResolver } from './year-options.resolver';

describe('YearOptionsResolver', () => {
  let resolver: YearOptionsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(YearOptionsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
