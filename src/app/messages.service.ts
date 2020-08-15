import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
  
export class MessagesService {
  constructor(private http : HttpClient ) {}
  getChannelMessages(id) {
    return this.http.get(`http://localhost:3002/channels/${id}/messages`);
  }

  getUserMessages(id) {
    return this.http.get(`http://localhost:3002/users/${id}/messages`);
   }
}
