import { TestBed } from '@angular/core/testing';

import { SocketService } from './websocket.service';

describe('WebsocketService', () => {
  let service: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
