import { TestBed } from '@angular/core/testing';

import { SimilarplayerService } from './similarplayer.service';

describe('SimilarplayerService', () => {
  let service: SimilarplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimilarplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
