import { TestBed } from '@angular/core/testing';

import { LogData } from './log-data';

describe('LogData', () => {
  let service: LogData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
