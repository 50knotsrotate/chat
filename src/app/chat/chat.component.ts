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

  }

  private subject = new Subject<any>();
  public channels;

  public channelNames: any;

  public soket;

  // @Input()
  public selectedChannel;

  // @Input()
  public messages;

  public user;

  public inputValue: String = '';

  // @Input()
  // switchChannel(newChannelId) {
  //   const newChannelIndex = this.channels.findIndex(
  //     (channel) => channel.id === newChannelId
  //   );

  //   if (newChannelIndex === -1) return;

  //   this.selectedChannel = this.channels[newChannelIndex];

  //   this.selectedChannel.hasNewMessage = false;

  //   this.messagesService
  //     .getChannelMessages(this.selectedChannel.id)
  //     .subscribe((messages) => (this.messages = messages));
  // }

  @Input()
  send() {

    const user = this.userService.getUser()

    const message = {
      channel_id: null,
      body: null,
      user_id: null,
      username: null
    };

    // message.channel_id = this.selectedChannel.channel_id;
    message.channel_id = 1;

    message.body = this.inputValue;
    // message.body = 'test';

    message.user_id = user.id;
    // message.user_id = 1;

    // message.username = user.username
    message.username = user.username


    this.SocketService.send(message);
    this.inputValue = '';
  }

  clicked(){
    console.log('clicked')
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
        channels.push({ name: messages[index].name, id: message.channel_id , messages: [message] });
      }
    });
    return channels
  }

  switchChannel(channel) {
   let newChannelIndex = this.channels.findIndex(c => channel === c.name);

   this.selectedChannel = this.channels[newChannelIndex];
  }





 ngOnInit(): void {

  // this.userService.isUserAuthenticated()
  //   .subscribe(user => {
  //     // console.log(user)
  //     this.userService.setUser(user);
  //     this.user = this.userService.getUser();
  //     console.log('this.user')
  //       console.log(this.user)

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
