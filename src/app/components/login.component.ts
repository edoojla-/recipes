import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {

    error: string;

    loading = false;

    username = "joe";
    password = "joe";

    constructor(private accountService: AccountService,
        private router: Router) { }

    ngOnInit(): void {
        if (this.accountService.isLoggedIn()) {
            this.router.navigate(['dashboard']);
        }
    }

    login(): void {
        this.loading = true;
        this.accountService.login(this.username, this.password).subscribe(
            (result) => {
                if (result) {
                    this.loading = false;
                    this.router.navigate(['dashboard']);
                }
            },
            (err) => {
                this.error = err;
                this.loading = false;
            }
        );
    }
}
