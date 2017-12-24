import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  onLogoutClick() {
    this.authService.logoutUser();
    this.flashMessagesService.show('You are now logged out', {cssClass: 'alert-primary'});
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }
}