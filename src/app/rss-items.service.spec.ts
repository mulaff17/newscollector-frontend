import { TestBed } from '@angular/core/testing';

import { RssItemsService } from './rss-items.service';

describe('RssItemsService', () => {
  let service: RssItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RssItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
