// logged-in.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AccountService } from './account.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private accountService: AccountService) {}

  canActivate() {
    return this.accountService.isLoggedIn();
  }
}