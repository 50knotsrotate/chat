import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})

export class MessagesService {
  constructor(private http : HttpClient, private userService: UserService ) {}
  getChannelMessages(id) {

    return this.http.get(`http://localhost:3002/channels/${id}/messages`);
  }

  getUserMessages(_id) {
    const { user } = this.userService;
    const { id } = user;
    return this.http.get(`http://localhost:3002/users/${id}/messages`);
   }
}
