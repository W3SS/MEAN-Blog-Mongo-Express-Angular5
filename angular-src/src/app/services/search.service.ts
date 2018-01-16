import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const BASE_URL = 'http://localhost:8080';

@Injectable()
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  search(term: string) {
    let params: HttpParams = new HttpParams().set('title', term);
    
    return this.http.get(`${BASE_URL}`+'/api/search/article', { params } );
  }
}