import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient, private messagesService: MessagesService) {}

  channels;
  selectedChannel;

  switchChannel(newChannelId) {
    const newChannelIndex = this.channels.findIndex(
      (channel) => channel.id === newChannelId
    );

    if (newChannelIndex === -1) return;

    this.selectedChannel = this.channels[newChannelIndex];

    this.messagesService.getChannelMessages(this.selectedChannel.id);
  }

  getUserChannels() {
    return this.http.get(`http://localhost:3002/user/channels`);
  }
}
