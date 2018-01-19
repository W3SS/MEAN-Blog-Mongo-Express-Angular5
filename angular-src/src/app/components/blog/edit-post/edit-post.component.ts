import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';

import { BlogService } from "../../../services/blog.service";
import { Article } from "../../../models/article";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})

export class EditPostComponent implements OnInit {

  urlParam: any;
  createPostForm: FormGroup;
  message: String;
  messageClass: String;
  formSubmitted: Boolean = false;
  tag: String;
  article: any;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private changeDetectionRef: ChangeDetectorRef
  ) { 
    this.createForm();
    
   }

   createForm() {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      excerpt: ['', Validators.required],
      body: ['', Validators.required],
      tags: ['']
    })
  }

  addTag(tag) {
    this.article.tags.push(this.createPostForm.get('tags').value);
    this.createPostForm.get('tags').reset();
  }

  deleteTag(tag:string, index) {
    if (index !== -1) {
        this.article.tags.splice(index, 1);
    }  
  }
  
  onPostSubmit() {
    const newArticle = {
      title: this.createPostForm.get('title').value,
      excerpt: this.createPostForm.get('excerpt').value,
      body: this.createPostForm.get('body').value,
      tags: this.article.tags
    }
    
    this.blogService.updateArticle(this.urlParam.id, newArticle)
      .subscribe(article => {
        if(!article.success) {
          this.messageClass = 'alert alert-danger';
          this.message = 'There are some errors';
          this.formSubmitted = false;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = article.message;
          this.formSubmitted = true;
          this.disableForm();
          setTimeout(() => {
            this.router.navigate(['/blog']);
          }, 2000);
          // Scroll to top to read message
          window.scrollTo(0, 0);
      }
    });

    // Iterate over the form controls 
    Object.keys( this.createPostForm.controls).forEach(key => {
      this.createPostForm.controls[key].markAsDirty();
    });

    // Scroll to top to read message
    window.scrollTo(0, 0);
  }

  onPostDelete() {
    this.blogService.deleteArticle(this.urlParam.id).subscribe((response) => {
      this.messageClass = 'alert alert-success';
      this.message = 'Article deleted';
      this.formSubmitted = true;
      this.disableForm();
      setTimeout(() => {
        this.router.navigate(['/blog']);
      }, 2000);
    });
    // Scroll to top to read message
    window.scrollTo(0, 0);
  }

  disableForm() {
    Object.keys( this.createPostForm.controls).forEach(key => {
      this.createPostForm.controls[key].disable();
    });
  }

  preventSubmission(e) {
    const textArea = document.getElementById('text-area');
    if(!(e.target === textArea)) {
      e.preventDefault();
    }
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.urlParam = this.activatedRoute.snapshot.params;

    this.blogService.getArticle(this.urlParam.id)
      .subscribe(data => {this.article = data});
  }
}