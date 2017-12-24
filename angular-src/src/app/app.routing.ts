import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/not-auth.guard";

import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { BlogComponent } from "./components/blog/blog.component";

const appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'home', redirectTo: '/', pathMatch: 'full' },
    { path: 'blog', component: BlogComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
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