import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements CanActivate {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  private SIGNIN_URL = 'http://localhost:3002/auth/signin';
  private SIGNUP_URL = 'http://localhost:3002/auth/signup';


  login(form) {
    this.http.post(this.SIGNIN_URL, form, {withCredentials: true}).subscribe((response) => {

      // this.userService.setUser(user);
      // localStorage.setItem('token', token);
      this.router.navigateByUrl('/');
    }, function (error) {
      console.log('its happening here')
        console.log(error)
     });
  }

  signup(form) {
    this.http.post(this.SIGNUP_URL, form).subscribe((response) => {
      const user = response['user'];

      const token = response['token'];

      this.userService.setUser(user);

      localStorage.setItem('token', token);
      
      this.router.navigateByUrl('/');
    });
  }

  canActivate(route: ActivatedRouteSnapshot) {
   if(this.userService.getUser()){
    return true
   } else {
     return false
   }
  }



}
