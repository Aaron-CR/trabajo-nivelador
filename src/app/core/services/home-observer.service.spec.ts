import { TestBed } from '@angular/core/testing';

import { HomeObserverService } from './home-observer.service';

describe('HomeObserverService', () => {
  let service: HomeObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
