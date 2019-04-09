import { TestBed } from '@angular/core/testing';

import { PwaServiceService } from './pwa-service.service';

describe('PwaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PwaServiceService = TestBed.get(PwaServiceService);
    expect(service).toBeTruthy();
  });
});
