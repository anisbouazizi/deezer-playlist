import { TestBed } from '@angular/core/testing';

import { DeezerService } from './deezer.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('DeezerService', () => {
  let service: DeezerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(DeezerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
