import { Component } from '@angular/core';
import { AccountService } from './services/account.service';

import '../assets/css/styles.css';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent {
    constructor(private accountService: AccountService) { }
    
    isLoggedIn(): boolean {
        return this.accountService.isLoggedIn();
    }
    
    logout(): void {
        this.accountService.logout();
    }
}

