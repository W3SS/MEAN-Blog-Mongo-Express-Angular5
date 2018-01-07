import { Component, OnInit } from '@angular/core';

import { BlogService } from "../../services/blog.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  articles: any;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.blogService.getArticles().subscribe(data => {
      console.log(data);
      this.articles = data;
    })
  }
}