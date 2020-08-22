import { Component, Input, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../websocket.service';
import { ChannelService } from '../channel.service';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private http: HttpClient, private SocketService: SocketService, private channelService: ChannelService, public userService: UserService) {
  }

    @Input()
    selectedChannel: Object;

  @Input()
  switchChannel: Function;

  @Input()
  public channels



  @Input()
  public inputValue: String;




  send() {
    this.SocketService.send(this.inputValue);
    this.inputValue = ''
  };

  handleInput = e => {
    this.inputValue = e.target.value;
  };



  ngOnInit(): void {

    // this.channelService.getUserChannels().subscribe(channels => {
    //   this.channels = channels;
    //   this.selectedChannel = this.channels[0];

    // })
    }

}

