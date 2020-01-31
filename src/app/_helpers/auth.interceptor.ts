//credit to Jason Watmore's HTTP tutorial

import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        //get session from local storage
        const user = localStorage.getItem("currentUser");

        if (user) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${JSON.parse(user)['jwt']}`
                }
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}