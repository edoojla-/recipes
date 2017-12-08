import { Component } from '@angular/core';
import { AccountService } from './services/account.service';

import '../assets/css/styles.css';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    title = 'NinJo Recipe Manager';

    isCollapsed: boolean = true;

    constructor(private accountService: AccountService) { }

    isLoggedIn(): boolean {
        return this.accountService.isLoggedIn();
    }

    logout(): void {
        this.accountService.logout();
    }
}

