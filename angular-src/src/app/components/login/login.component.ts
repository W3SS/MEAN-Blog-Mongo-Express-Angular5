import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { AuthGuard } from "../../guards/auth.guard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: String;
  messageClass: String;
  formSubmitted: Boolean = false;
  previousUrl: String;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) { 
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLoginSubmit() {

    const user = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }

    this.authService.loginUser(user).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.formSubmitted = true;
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {

          if(this.previousUrl) {
            this.router.navigate([this.previousUrl])
          } else {
            this.router.navigate(['dashboard']);
          }
        }, 1300)
      }
    })
  }

  ngOnInit() {
    if(this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger';
      this.message = 'You must be logged in to view that page';
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

}
