import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule }     from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { AccountService } from './services/account.service';
@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [
        AccountService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

