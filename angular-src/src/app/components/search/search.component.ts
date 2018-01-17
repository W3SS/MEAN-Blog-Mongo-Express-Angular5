import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services/search.service';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-search',
  template: `
    <div class="search-wrapper">
        <h2>Search</h2>
        <p>Find post titles and tags</p>
        <input type="text" [formControl]="term" autofocus="autofocus" placeholder="">
        <ul>
          <li *ngFor="let item of items | async"><a [routerLink]="['/blog/post/', item._id]">{{item.title}}</a></li>
        </ul>
      </div>
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