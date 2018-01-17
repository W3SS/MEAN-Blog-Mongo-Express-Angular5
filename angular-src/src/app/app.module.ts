import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { AppRoutingModule } from "./app.routing";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlashMessagesModule } from "angular2-flash-messages";

import { AppComponent } from './app.component';

import { AuthService } from "./services/auth.service";
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/not-auth.guard";
import { BlogService } from "./services/blog.service";
import { SearchService } from "./services/search.service";

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { CreatePostComponent } from './components/blog/create-post/create-post.component';
import { EditPostComponent } from './components/blog/edit-post/edit-post.component';
import { ViewPostComponent } from './components/blog/view-post/view-post.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    RegisterComponent,
    BlogComponent,
    CreatePostComponent,
    EditPostComponent,
    ViewPostComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotAuthGuard,
    BlogService,
    SearchService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
enableProdMode();