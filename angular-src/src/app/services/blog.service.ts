import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Data } from '@angular/router/src/config';

@Injectable()
export class BlogService {
  
  domain = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) {}

  saveArticle(article) {
    return this.http.post(this.domain+'/api/articles', article)
    .map(
      res => {
        return res as Data;
      },
      err => {
        console.log("There was an error");
      }
    )
  }

  getArticles() {
    return this.http.get(this.domain+'/api/articles')
    .map(
      res => {
        return res as Data;
      },
      err => {
        console.log(err);
      }
    )
  }
}