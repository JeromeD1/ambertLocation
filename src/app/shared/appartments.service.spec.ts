import { TestBed } from '@angular/core/testing';

import { AppartmentsService } from './appartments.service';

describe('AppartmentsService', () => {
  let service: AppartmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppartmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
