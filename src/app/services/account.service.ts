import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountService {

    private token: string;

    private url: string = "http://192.168.178.48:8080/oauth/token?grant_type=password&username=joe&password=joe";
    
    constructor(private http: Http) { }

    authenticate(): void {
        var headers = new Headers();
        headers.append('Authorization', 'Basic cmM6cmM=');
        headers.append('Content-Type', 'application/form-data');

        this.http.post(this.url, {}, { headers: headers })
            .subscribe((res) => this.token = res.json());
    }

    //    create(): Promise<any> {
    //        var headers = new Headers();
    //        headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //
    //        var credentials = "grant_type=password"
    //            + "&username=joe"
    //            + "&password=joe"
    //
    //        return this.http
    //            .post(this.url, credentials, { headers: headers })
    //            .toPromise()
    //            .then(res => res.json().data)
    //            .catch(this.handleError);
    //    }

    //    private handleError(error: any): Promise<any> {
    //        console.error('An error occurred', error); // for demo purposes only
    //        return Promise.reject(error.message || error);
    //    }

    _jsAuthenticate(): void {
        var request = new XMLHttpRequest();
        request.open("POST", this.url, true);

        request.setRequestHeader("Authorization", "Basic cmM6cmM="); //rc:rc base64
        request.setRequestHeader("Content-type", "application/form-data");

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                console.log(JSON.parse(request.responseText));

                var responseJson = JSON.parse(request.responseText);
                var oauthToken = responseJson['access_token'];

                console.log(oauthToken);
            }
        };
        request.send("");
    }
}