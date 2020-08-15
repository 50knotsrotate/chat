import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
  private socket;

  private SERVER_URL = 'http://localhost:3002';

  constructor() {}

  public connect() {
    this.socket = io(this.SERVER_URL);

    return new Observable((obs) => {
      this.socket = io(this.SERVER_URL);
      this.socket.on('message', (message) => {
        if (message) {
          obs.next(message);
        }
      });
    });
  }

  public send(message): void {
    // console.log(message)
      this.socket.emit('message', message);
  }
}
