import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent } from './chat/chat.component';
import { SocketService } from './websocket.service';
import { NavbarComponent } from './navbar/navbar.component';
import { InputComponent } from './input/input.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { NewChannelComponent} from './new-channel/new-channel.component'

// @ts-lint disable
import { AuthGuard } from './auth.guard'


const routes: Routes = [
        { path: '', component: HomeComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent, children: [{ path: '', component: MessagesComponent }, { path: 'explore', component: ExploreComponent }, {path: 'new', component: NewChannelComponent}]},
      { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
