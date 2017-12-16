import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "../../services/auth.service";
import { attachEmbeddedView } from '@angular/core/src/view/view_attach';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message;
  messageClass;
  formSubmitted = false;

  data = <any>{};
  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
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
      password2: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)])]
    }, { validator: this.matchingPasswords( 'password', 'password2' )});
  }

  matchingPasswords(pasword, password2) {
    return (group: FormGroup) => {
      if(group.controls.password.value === group.controls.password2.value) {
        return null;
      } else {
        return({ 'matchingPasswords': true })
      }
    }
  }

  onRegisterSubmit() {
    this.formSubmitted = true;

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
        this.message = data.message;
        this.messageClass = 'alert alert-danger';
        this.formSubmitted = false;
      } else {
        this.message = data.message;
        this.messageClass = 'alert alert-success';
        this.disableForm();
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