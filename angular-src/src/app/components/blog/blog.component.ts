import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../services/blog.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-blog',
  styleUrls: ['./blog.component.scss'],
  template: `
    <div class="post" *ngFor="let article of articles">
        <h3>{{ article.title }}</h3>
        <p class="exceprt">{{ article.excerpt }}</p>
    
        <p>Created by: <strong>{{ article.author.firstName }} {{ article.author.lastName }}</strong> on <strong>{{ article.created | date: 'dd-MMM-yyyy' }}</strong></p>
    
        <div *ngIf="article.tags.length > 0">
            <p>Tags: {{ article.tags }}</p>
        </div>
    
        <a [routerLink]="['/blog/post/', article._id]" class="btn btn-primary">Read post</a>
        <a *ngIf="authService.loggedIn()" [routerLink]="['/blog/edit-post/', article._id]" class="btn btn-outline-warning">Edit post</a>
    </div>
  `
})

export class BlogComponent implements OnInit {
  articles: any;
  article

  constructor(
    private blogService: BlogService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.blogService.getArticles().subscribe(data => {
      this.articles = data;
      this.articles.sort((a: any, b: any) => 
      new Date(b.created).getTime() - new Date(a.created).getTime());
    });
  }
}