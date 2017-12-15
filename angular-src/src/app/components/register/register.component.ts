import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
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
    //console.log(this.registerForm.controls)
  }

  ngOnInit() {
  }

}