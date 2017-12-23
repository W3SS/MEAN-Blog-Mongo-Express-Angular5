import { Injectable } from '@angular/core';
import { 
    HttpInterceptor, 
    HttpHandler, 
    HttpEvent, 
    HttpRequest 
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { AuthService } from './auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor() {}

    authToken = localStorage.getItem('my-blog-token');
    userId = localStorage.getItem('blog-user');

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
            const authReq = request.clone({
                headers: request.headers.set(
                    'Authorization', 
                    this.authToken)});

        return next.handle(authReq);
      }

}