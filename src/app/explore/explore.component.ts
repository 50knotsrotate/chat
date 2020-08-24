import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

import { ChannelService } from '../channel.service';
import { UserService } from '../user.service'

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit {
  constructor(private http: HttpClient, private router : Router, private channelService : ChannelService) {}

  newChannel = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  loading = false
  success = false
  error


  @Input()
  addChannel: Function;

  onSubmit() {
    this.loading = true
    this.http.post('http://localhost:3002/channels', { name: this.newChannel.get('name').value })
      .subscribe(channel => {
        this
        this.loading = false
        this.success = true
        this.error = 'Your chatroom was created successfully!'
      }),
      function (err) {
        this.error = 'Uh uh something wen wrong'
      }
  }

  filterChannelsByName(e) {
    this.filteredChannels = this.channels.filter(channel => channel.name.indexOf(e.target.value) != -1);
  }


  joinChannel(channel) {
    this.channelService.joinChannel(channel)
   }

  private getFilteredChannels(name = '') {
    this.filteredChannels = this.channels.filter(
      (channel) => channel.name.indexOf(name) != -1
    );
  }


  channels;

  filteredChannels

  ngOnInit(): void {
    this.http.get('http://localhost:3002/channels').subscribe((channels) => {

      this.channels = channels;
      this.getFilteredChannels()
    });
  }
}
