import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private messagesService: MessagesService, private UserService : UserService, private router : Router) { }

  ngOnInit(): void {
    this.UserService.isUserAuthenticated()
      .subscribe(user => {
        this.UserService.setUser(user);
        this.router.navigateByUrl('/')
      }, err => {
        console.log('ERROR IN HOME COMPONENT ON INIT')
      })
  }

}
