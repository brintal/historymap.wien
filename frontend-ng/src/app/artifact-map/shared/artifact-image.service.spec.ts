import { TestBed } from '@angular/core/testing';

import { ArtifactImageService } from './artifact-image.service';

describe('ArtifactImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtifactImageService = TestBed.get(ArtifactImageService);
    expect(service).toBeTruthy();
  });
});
