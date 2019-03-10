import { TestBed } from '@angular/core/testing';

import { HttpControllerService } from './http-controller.service';

describe('HttpControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpControllerService = TestBed.get(HttpControllerService);
    expect(service).toBeTruthy();
  });
});
