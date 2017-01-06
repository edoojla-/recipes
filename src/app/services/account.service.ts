import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountService {

    private loggedIn = false;

    constructor(private http: Http) {
        this.loggedIn = !!localStorage.getItem('access_token');
    }

    login(username: string, password: string): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Basic cmM6cmM=');
        headers.append('Content-Type', 'application/json');

        // Funktioniert nicht
        let jsonData = {
            "username": username,
            "password": password,
            "grant_type": 'password'
        };

        // Funktioniert auch nicht
        let params = new URLSearchParams();
        params.set('grant_type', 'password');
        params.set('username', username);
        params.set('password', password);

        let accessUrl = ("/api/oauth/token")
            .concat("?grant_type=password")
            .concat("&username=")
            .concat(username)
            .concat("&password=")
            .concat(password);

        return this.http.post(
            accessUrl,
            {},
            { headers }
        )
            .map((result: any) => {
                if (result && result.status === 200) {
                    return result.json();
                }
            })
            .map((result: any) => {
                console.log(result);
                localStorage.setItem('access_token', result.access_token);
                this.loggedIn = true;
                return true;
            })
            .catch((error: any) => {
                if (error.status === 500) {
                    return Observable.throw(new Error(error.json().error + ' ' + error.json().error_description));
                }
                else if (error.status === 400) {
                    return Observable.throw(new Error(error.json().error + ' ' + error.json().error_description));
                }
            });
    }


    logout() {
        localStorage.removeItem('access_token');
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}