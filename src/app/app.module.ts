import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { GlobalHttpInterceptorService } from './http-interceptor.service';

import { AuthenticationService } from './authentication.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent } from './chat/chat.component';
import { SocketService } from './websocket.service';
import { NavbarComponent } from './navbar/navbar.component';
import { InputComponent } from './input/input.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';

// @ts-lint disable
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component'


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ChatComponent,
    NavbarComponent,
    InputComponent,
    LoginComponent,
    MessagesComponent,
    SignupComponent,
    HomeComponent,
    ExploreComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
      { path: 'explore', component: ExploreComponent },
    ]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    SocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
