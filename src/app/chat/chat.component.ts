import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../channel.service';
import { MessagesService } from '../messages.service';
import { UserService } from '../user.service';
import { SocketService } from '../websocket.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  // public messages: Array<any> = [];
  constructor(
    private channelService: ChannelService,
    private userService: UserService,
    private messagesService: MessagesService,
    private SocketService: SocketService
  ) {
    this.switchChannel = this.switchChannel.bind(this);
    this.send = this.send.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addChannel = this.addChannel.bind(this);
  }

  private subject = new Subject<any>();
  @Input() channels : any = [];

  public channelNames: any;

  public soket;

  @Input()
  public selectedChannel;

  @Input()
  public messages;

  public user;

  public inputValue: String = '';


  @Input()
  send() {
    const { user } = this.userService;

    const message = {
      channel_id: null,
      body: null,
      user_id: user.id,
      username: null,
    };

    // message.channel_id = this.selectedChannel.channel_id;
    message.channel_id = 1;

    message.body = this.inputValue;
    // message.body = 'test';

    message.user_id = user.id;
    // message.user_id = 1;

    // message.username = user.username
    message.username = user.username;

    this.SocketService.send(message);
    this.inputValue = '';
  }

  clicked() {
    console.log('clicked');
  }

  @Input()
  handleInput(e) {
    this.inputValue = e.target.value;
  }

  private formatMessages(messages) {
    const channels = [];

    messages.forEach((message, index, messages) => {
      const channelIndex = channels.findIndex(
        (channel) => channel.name === message.name
      );

      if (channelIndex > -1) {
        channels[channelIndex].messages.push(message);
      } else {
        channels.push({
          name: messages[index].name,
          id: message.channel_id,
          messages: [message],
        });
      }
    });
    return channels;
  }

  @Input()
  switchChannel(channel) {
    let newChannelIndex = this.channels.findIndex((c) => channel === c.name);

    this.selectedChannel = this.channels[newChannelIndex];
  }


  @Input()
    addChannel(channel) {
    this.channels.push(channel);
    // this.router.navigateByUrl('/chat')
    // this.selectedChannel = this.channels[channel];
    }

  async init() {
    // this.messagesService.getUserMessages()
    await this.channelService.getUserChannels()
   }

  ngOnInit(): void {
    this.init()
    // this.userService.isUserAuthenticated()
    //   .subscribe(user => {

    //     this.userService.setUser(user);

    //       this.messagesService.getUserMessages(this.user.id).subscribe((messages) => {

    //       this.channels = this.formatMessages(messages);

    //       for (let channel of this.channels) {

    //         this.selectedChannel = channel;

    //         break;
    //     }
    //               this.SocketService.connect()
    //           .subscribe(message => {

    //             console.log('THIS IS THE MESSAGE THAT CAME IN')
    //             console.log(message)
    //             this.selectedChannel.messages.push(message);

    //             console.log('THIS IS THE SELECTED CHANNEL')
    //             console.log(this.selectedChannel)
    //     })
    //   });

    // })
  }
}
