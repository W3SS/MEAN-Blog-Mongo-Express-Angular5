import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";

const appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'home', redirectTo: '/', pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
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