import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Data } from '@angular/router/src/config';

@Injectable()

export class AuthService {

  constructor(private http: HttpClient) { }

    registerUser(user) {
      return this.http.post('http://localhost:8080/api/users/register', user)
      .map(
        res => {
          return res as Data;
        },
        err => {
          console.log("There was an error");
        }
      );
    }    
}