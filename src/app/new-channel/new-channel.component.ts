import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.css']
})
export class NewChannelComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  channel = new FormGroup({
    name: new FormControl('Name of channel'),
    image: new FormControl(),
    description: new FormControl('Tell us a little more about it!')
  })

  onSubmit() {
    this.http.post('http://localhost:3002/channels', this.channel.value)
      .subscribe(res => {
        // Do something with new channel
        this.router.navigateByUrl('/chat/explore')
      });


  }

  ngOnInit(): void {
  }

}
