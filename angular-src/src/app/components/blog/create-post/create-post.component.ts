import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { BlogService } from "../../../services/blog.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  message: String;
  messageClass: String;
  formSubmitted: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogService
  ) { 
    this.createForm();
   }

   createForm() {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      excerpt: ['', Validators.required],
      body: ['', Validators.required]
    })
  }

  onPostSubmit() {
    const article = {
      title: this.createPostForm.get('title').value,
      excerpt: this.createPostForm.get('excerpt').value,
      body: this.createPostForm.get('body').value
    }
    
    this.blogService.saveArticle(article).subscribe(article => {
      if(!article.success) {
        console.log(article);
        this.messageClass = 'alert alert-danger';
        this.message = 'There are some errors';
        this.formSubmitted = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = article.message;
        this.formSubmitted = true;
        this.disableForm();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    });
    // Iterate over the form controls 
    Object.keys( this.createPostForm.controls).forEach(key => {
      this.createPostForm.controls[key].markAsDirty();
    });

  }

  disableForm() {
    Object.keys( this.createPostForm.controls).forEach(key => {
      this.createPostForm.controls[key].disable();
    });
  }

  ngOnInit() {
  }

}