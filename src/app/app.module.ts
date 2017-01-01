import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule }     from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { DashboardComponent } from './components/dashboard.component';
import { AccountService } from './services/account.service';
import {LoggedInGuard} from './services/logged-in-guard.service';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent
    ],
    providers: [
        AccountService,
        LoggedInGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

