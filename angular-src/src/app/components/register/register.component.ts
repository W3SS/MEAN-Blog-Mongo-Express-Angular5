import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { matchingPasswords } from '../../validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message;
  messageClass;
  formSubmitted: Boolean = false;

  data = <any>{};
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.createForm();
   }

  createForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      username: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(8),
        Validators.maxLength(35),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ])],
      password2: ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});
  }

  onRegisterSubmit() {

    const user = {
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      password2: this.registerForm.get('password2').value,
    }

    this.authService.registerUser(user).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.formSubmitted = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.formSubmitted = true;
        this.disableForm();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    });

    // Iterate over the form controls 
    Object.keys( this.registerForm.controls).forEach(key => {
      this.registerForm.controls[key].markAsDirty();
    });
  }

  disableForm() {
    Object.keys( this.registerForm.controls).forEach(key => {
      this.registerForm.controls[key].disable();
    });
  }

  ngOnInit() {
  }

}