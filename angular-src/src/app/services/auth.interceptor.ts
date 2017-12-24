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

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {

                const authToken = localStorage.getItem('my-blog-token');
        
                if(authToken) {
                    const newReq = req.clone({
                        headers: req.headers.set(
                            'Authorization', authToken
                        )});

                    return next.handle(newReq);
                    
                } else {
                    return next.handle(req);
                }
            }
}