import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from '../authentication.service'
import {UserService} from '../user.service'
import { Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error = '';

  constructor(private formBuilder: FormBuilder, public http: HttpClient, private auth: AuthenticationService, private UserService: UserService, private router: Router) { }
  // username = new FormControl('');
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl('')
  })

   onSubmit(form: NgForm) {
    console.log(form.value)
    this.http.post('http://localhost:3002/auth/signin', form.value, {withCredentials: true})
      .subscribe(user => { 
        this.UserService.setUser(user);
        this.router.navigateByUrl('/chat');
      }), (error => { 
      console.log(error)
      })

   }
    


  


  ngOnInit(): void { 
    this.loginForm.valueChanges.subscribe(data => { 
      
    })
  }


}
