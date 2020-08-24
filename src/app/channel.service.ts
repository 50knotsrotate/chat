import { Injectable, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from './messages.service';
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient, private messagesService: MessagesService, private userService: UserService) {}


  channels;

  selectedChannel;

  getChannelList() {
    return this.channels || [];
  }

  switchChannel(newChannel) {
    const newChannelIndex = this.channels.findIndex(
      (channel) => channel.id === newChannel.id
    );

    if (newChannelIndex === -1) return;

    this.selectedChannel = this.channels[newChannelIndex];

    this.messagesService.getChannelMessages(this.selectedChannel.id);
  }

  createChannel(channel) {
    return this.http.post('http://localhost:3002/channels', {channel})
  }

  addChannel(channel) {
    this.channels.push(channel);
  }

  joinChannel(channel) {
   const userId = this.userService.user.id;

   this.http.post(`http://localhost:3002/users/${userId}/channels`, { channel })
     .subscribe(channel => {
       this.addChannel(channel)
     })
  }

  getAllChannels() {
    return this.http.get('http://localhost:3002/channels')
  }

  getUserChannels() {
    const userId = this.userService.user.id;

    return this.http.get(`http://localhost:3002/users/${userId}/channels`)
      .subscribe(channels => {
        this.channels = channels;
      })
  }

}
