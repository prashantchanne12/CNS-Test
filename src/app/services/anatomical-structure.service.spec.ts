import { TestBed } from '@angular/core/testing';

import { AnatomicalStructureService } from './anatomical-structure.service';

describe('AnatomicalStructureService', () => {
  let service: AnatomicalStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnatomicalStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
