import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SocketService } from './websocket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, public SocketService: SocketService) {
    // this.getChannelMessages = this.getChannelMessages.bind(this);
    // this.switchChannel = this.switchChannel.bind(this);
    this.send = this.send.bind(this);

    // this.socket = this.SocketService.connect().subscribe((message: any) => {
    //   if (message.channel_id === this.selectedChannel.id) {
    //     this.messages.push(message);
    //   } else {
    //     const [channel] = this.channels.filter(
    //       (channel) => channel.id === message.channel_id
    //     );
    //     channel.hasNewMessage = true;
    //   }
    // });
  }

  socket;

  @Input()
  user;

  @Input()
  channels: any = null;

  @Input()
  selectedChannel: any = {};

  @Input()
  messages: any = [];

  @Input()
  inputValue: String = '';

  @Input()
  handleInput(e) {
    this.inputValue = e.target.value;
  }

  // @Input()
  send(msgBody) {
    const message = {
      channel_id: null,
      body: null,
      user_id: null,
    };

    message.channel_id = this.selectedChannel.channel_id;
    message.body = msgBody;
    message.user_id = 1;
    // Get rid of this after tokens are implemented

    this.SocketService.send(message);
    this.inputValue = '';
  }

  getUserChannels() {
    this.http
      .get('http://localhost:3002/user/channels')
      .subscribe((channels) => {
        this.channels = channels;

        // Selected chatroom for sidebar defaults to the first record returned from the GET
        this.selectedChannel = this.channels[0];

        this.messages = this.selectedChannel.messages;
      });
  }

  // @Input()
  // switchChannel(i) {
  //   this.selectedChannel = this.channels[i];
  //   this.selectedChannel.hasNewMessage = false;
  //   this.getChannelMessages();
  // }

  // @Input()
  // getChannelMessages() {
  //   console.log(this.selectedChannel);
  //   this.http
  //     .get(`http://localhost:3002/channels/${this.selectedChannel.id}/messages`)
  //     .subscribe((messages) => {
  //       this.messages = messages;
  //     });
  // }

  ngOnInit(): void {

  }
}
