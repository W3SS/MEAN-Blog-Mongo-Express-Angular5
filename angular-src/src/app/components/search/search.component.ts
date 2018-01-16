import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services/search.service';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-search',
  template: `
      <h2>Search</h2>
      <input type="text" [formControl]="term" autofocus="autofocus">
      <ul>
        <li *ngFor="let item of items | async"><a [routerLink]="['/blog/post/', item._id]">{{item.title}}</a></li>
      </ul>
  `,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  items: Observable<object>;
  term = new FormControl();

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.items = this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchService.search(term));
  }
}