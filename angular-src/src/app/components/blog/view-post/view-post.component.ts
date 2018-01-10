import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-view-post',
  template: `
    <h2>{{article?.title}}</h2>
    <p>{{article?.body}}</p>

    <div *ngIf="article?.tags.length > 0">
        <p>tags: {{article?.tags}}</p>
    </div>
  `
})

export class ViewPostComponent implements OnInit {
  urlParam: any;
  article: any;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.urlParam = this.activatedRoute.snapshot.params;

    this.blogService.getArticle(this.urlParam.id)
      .subscribe(data => this.article = data);
  }
}