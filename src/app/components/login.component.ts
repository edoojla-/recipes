import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { AccountService } from '../services/account.service';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    constructor(private accountService: AccountService) { }

    login(): void {
        this.accountService.authenticate();
    }
}