import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Data } from '@angular/router/src/config';
import { Article } from '../models/article';

const BASE_URL = 'http://localhost:8080';

@Injectable()
export class BlogService {

  constructor(
    private http: HttpClient
  ) {}

  saveArticle(article) {
    return this.http.post(`${BASE_URL}`+'/api/articles', article)
    .map(
      res => {
        return res as Data;
      },
      err => {
        console.log("There was an error");
      }
    )
  }

  updateArticle(id, newArticle) {
    return this.http.put(`${BASE_URL}`+'/api/articles/'+ id, newArticle)
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
    return this.http.get(`${BASE_URL}`+'/api/articles')
  }

  getArticle(id) {
    return this.http.get(`${BASE_URL}`+'/api/articles/'+ id)
  }

  deleteArticle(id) {
    return this.http.delete(`${BASE_URL}`+'/api/articles/'+ id)
  }
}