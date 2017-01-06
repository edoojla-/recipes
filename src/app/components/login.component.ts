import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {

    username = "";

    password = "";

    constructor(private accountService: AccountService,
        private router: Router) { }

    login(): void {
        this.accountService.login(this.username, this.password).subscribe(
            (result) => {
                if (result) {
                    this.router.navigate(['dashboard']);
                }
            },
            (err) => console.log(err)
        );
    }
}