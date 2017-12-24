import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from "../services/auth.service";

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
      if(this.authService.loggedIn()) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
  }
}
}
