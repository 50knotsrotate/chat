import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnsubscriptionError } from 'rxjs';
import { UserService } from '../user.service';
import { FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router} from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor( private http: HttpClient, private userService: UserService, private router: Router ) {}
  user = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl('10'),
  });

  @Input()
  loading: Boolean = false;

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.http.post('http://localhost:3002/auth/signup', form.value)
      .subscribe(user => { 
        this.userService.setUser(user);
        this.router.navigateByUrl('/chat');
      }), (error => { 
      console.log(error)
      })

   }

  ngOnInit(): void {}
}
