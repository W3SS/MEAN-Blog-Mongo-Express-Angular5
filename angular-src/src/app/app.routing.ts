import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/not-auth.guard";

import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { BlogComponent } from "./components/blog/blog.component";
import { EditPostComponent } from './components/blog/edit-post/edit-post.component';
import { CreatePostComponent } from './components/blog/create-post/create-post.component';
import { ViewPostComponent } from './components/blog/view-post/view-post.component';
import { SearchComponent } from './components/search/search.component';

const appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'home', redirectTo: '/', pathMatch: 'full' },
    { path: 'blog', children: [
        { path: '', component: BlogComponent },
        { path: 'create-post', component: CreatePostComponent },
        { path: 'post/:id', component: ViewPostComponent },
        { path: 'edit-post/:id', component: EditPostComponent, canActivate: [AuthGuard] }
    ]},
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
    { path: 'search', component: SearchComponent },
    { path: '**', component: HomeComponent}
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})

export class AppRoutingModule { }