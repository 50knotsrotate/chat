import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private http: HttpClient) { }
@Input()
  channels

  ngOnInit(): void {
    this.http.get('http://localhost:3002/channels')
      .subscribe(channels => { 
        console.log(channels)
        this.channels = channels
      })
  }

}
