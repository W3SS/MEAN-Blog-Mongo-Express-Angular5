import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: String;
  email: String;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    const userId = JSON.parse(localStorage.getItem('blog-user')).id;
    this.authService.getUser(userId).subscribe(profile => {
      this.username = profile.user.username;
      this.email = profile.user.email;
    });
  }
}