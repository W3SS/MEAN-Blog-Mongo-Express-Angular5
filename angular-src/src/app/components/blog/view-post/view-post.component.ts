import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common';

import { BlogService } from '../../../services/blog.service';
import { AuthService } from "../../../services/auth.service";
import { HighlightService } from "../../../services/highlight.service";

@Component({
  selector: 'app-view-post',
  template: `
    <h2>{{article?.title}}</h2>
    <div [innerHtml]="article?.body"></div>
    <p>By: <strong>{{ article?.author.firstName }} {{ article?.author.lastName }}</strong> on <strong>{{ article?.created | date: 'dd-MMM-yyyy' }}</strong></p>

    <button class="btn btn-primary" (click)="goBack()">&larr; Go back</button>
    <br><br>
    <div *ngIf="authService.loggedIn()">
      <button [routerLink]="['/blog/edit-post/', article?._id]" class="btn btn-outline-warning">Edit Post</button>
    </div>
  `
})

export class ViewPostComponent implements OnInit {
  urlParam: any;
  article: any;
  highlighted: boolean = false;

  constructor(
    private location: Location,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private highlightService: HighlightService
  ) { }

  goBack() {
    this.location.back();
  }

  ngAfterViewChecked() {
    if (this.article && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnInit() {
    this.urlParam = this.activatedRoute.snapshot.params;

    this.blogService.getArticle(this.urlParam.id)
      .subscribe(data => {
        this.article = data;
      });
  }
}