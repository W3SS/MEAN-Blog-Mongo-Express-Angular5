import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Data } from '@angular/router/src/config';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()

export class AuthService {
  authToken;
  user;
  options;

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

    logoutUser() {
      this.authToken = null;
      this.user = null;
      localStorage.clear();
    }

    loggedIn() {
      return tokenNotExpired('my-blog-token');
    }

    getUser(userId) {
      return this.http.get(this.domain + '/api/users/' + userId)
        .map(
          res => {
            return res as Data;
          },
          err => {
            console.log("There was an error");
          }
        )
    }

    getUsers() {
      return this.http.get(this.domain + '/api/users')
        .map(
          res => {
            return res as Data;
          },
          err => {
            console.log("There was an error");
          }
        )
    }

    getAuthHeader() {}
    
    storeUserData(token, user) {
      localStorage.setItem('my-blog-token', token);
      localStorage.setItem('blog-user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
    }
}