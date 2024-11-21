import { TestBed } from '@angular/core/testing';

import { AnatomicalStructureDetailsService } from './anatomical-structure-details.service';

describe('AnatomicalStructureDetailsService', () => {
  let service: AnatomicalStructureDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnatomicalStructureDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
