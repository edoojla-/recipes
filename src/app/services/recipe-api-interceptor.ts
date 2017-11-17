import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AccountService} from "./account.service";

@Injectable()
export class RecipeAPIInterceptor implements HttpInterceptor {

    //constructor(private auth: AccountService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authToken = localStorage.getItem('access_token');

        let authHeaders = '';

        if (authToken) {
            authHeaders = `Bearer ${authToken}`;
        } else {
            authHeaders = 'Basic cmM6cmM=';
        }

        const authReq = req.clone({
            headers: req.headers.set('Authorization', authHeaders)
        });
        return next.handle(authReq);
    }

}
