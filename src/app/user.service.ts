import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }
  
  public user;

  userLoggedIn() { 
    // return this.http.get('http://localhost:3002/me')
    
   
  }

  isUserAuthenticated(){
    return this.http.get('http://localhost:3002/me')
  }

  setUser(user) {
    this.user = user;
   }

  getUser() { 
    // return this.http.get('http://localhost:3002/me')
    return this.user;
  }



  // ngOnInit() { 
  //   this.getUser()
  //     .subscribe(user => { 
  //       this.user = user;
  //     })
  // }

}
