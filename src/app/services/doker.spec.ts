import { TestBed } from '@angular/core/testing';

import { Doker } from './doker.service';

describe('Doker', () => {
  let service: Doker;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Doker);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
