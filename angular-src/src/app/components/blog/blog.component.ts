import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../services/blog.service";

@Component({
  selector: 'app-blog',
  styleUrls: ['./blog.component.scss'],
  template: `

    <h2>Latest Posts</h2>

    <div class="post" *ngFor="let article of articles">
        <h3>{{ article.title }}</h3>
        <p class="exceprt">{{ article.excerpt }}</p>
    
        <p>Created by: <strong>{{ article.author.firstName }} {{ article.author.lastName }}</strong> on <strong>{{ article.created | date: 'dd-MMM-yyyy' }}</strong></p>
    
        <div *ngIf="article.tags.length > 0">
            <p>Tags: {{ article.tags }}</p>
        </div>
    
        <a [routerLink]="['/blog/post/', article._id]" class="btn btn-primary">Read post</a>
        <a [routerLink]="['/blog/edit-post/', article._id]" class="btn btn-outline-warning">Edit post</a>
    </div>
  `
})

export class BlogComponent implements OnInit {
  articles: any;
  article

  constructor(
    private blogService: BlogService
  ) { }


  ngOnInit() {
     this.blogService.getArticles().subscribe(articles => {
      this.articles = articles;
    }) 
  }
}