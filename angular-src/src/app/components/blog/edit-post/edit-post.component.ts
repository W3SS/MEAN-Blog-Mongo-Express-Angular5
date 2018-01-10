import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

import { BlogService } from "../../../services/blog.service";

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
  article: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
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
    
    const newArticle = {
      title: this.createPostForm.get('title').value,
      excerpt: this.createPostForm.get('excerpt').value,
      body: this.createPostForm.get('body').value
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
      }
    });
    // Iterate over the form controls 
    Object.keys( this.createPostForm.controls).forEach(key => {
      this.createPostForm.controls[key].markAsDirty();
    });

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
  }

  disableForm() {
    Object.keys( this.createPostForm.controls).forEach(key => {
      this.createPostForm.controls[key].disable();
    });
  }

  ngOnInit() {
    this.urlParam = this.activatedRoute.snapshot.params;

    this.blogService.getArticle(this.urlParam.id)
      .subscribe(data =>this.article = data);
  }

}
