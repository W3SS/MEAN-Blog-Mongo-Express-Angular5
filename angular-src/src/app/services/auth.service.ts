import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Data } from '@angular/router/src/config';

@Injectable()

export class AuthService {
  authToken;
  user;

  domain = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

    registerUser(user) {
      return this.http.post(this.domain+'/api/users/register', user)
      .map(
        res => {
          return res as Data;
        },
        err => {
          console.log("There was an error");
        }
      )
    }

    loginUser(user) {
      return this.http.post(this.domain+'/api/users/authenticate', user)
      .map(
        res => {
          return res as Data;
        },
        err => {
          console.log("There was an error");
        }
      )
    }
    
    storeUserData(token, user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
    }
}