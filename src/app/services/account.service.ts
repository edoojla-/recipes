import {Injectable}    from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountService {

    private loggedIn = false;

    constructor(private httpClient: HttpClient) {
        this.loggedIn = !!localStorage.getItem('access_token');
    }

    login(username: string, password: string): Observable<any> {
        let accessUrl = ("/api/oauth/token")
            .concat("?grant_type=password")
            .concat("&username=")
            .concat(username)
            .concat("&password=")
            .concat(password);

        return this.httpClient.post(accessUrl, {})
            .map((result: any) => {
                if (result) {
                    localStorage.setItem('access_token', result.access_token);
                    this.loggedIn = true;
                    return true;
                }
                return false;
            })
            .catch((error: any) => this.handleError(error));
    }


    logout() {
        localStorage.removeItem('access_token');
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    handleError(error) {
        let errorMessage = "Uninitialized";
        if (error.status) {
            errorMessage = error.status;
        } else {
            errorMessage = 'Server error';
        }
        return Observable.throw(new Error(errorMessage));
    }
}
