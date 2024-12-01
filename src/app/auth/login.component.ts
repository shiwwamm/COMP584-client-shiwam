import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from './login-request';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './auth.service';
import { LoginResponse } from './login-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }
  form!: UntypedFormGroup;

onSubmit():void {
  var loginRequest : LoginRequest = {
    userName : this.form.controls["userName"].value,
    password : this.form.controls["password"].value,
};
var LoginResponse : LoginResponse;
this.AuthService.login(loginRequest).subscribe(
  {
    next: result => {
      LoginResponse = result;
      console.log(LoginResponse);
      if (result.success) {
        localStorage.setItem("launchCode", result.token)
      }
    },
    error:e => console.error(e)
  }
);
}
  constructor(private AuthService : AuthService){

  }


}
