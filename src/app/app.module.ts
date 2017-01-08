import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule }     from '@angular/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AccountService } from './services/account.service';
import { LoggedInGuard } from './services/logged-in-guard.service';
import { RecipeService } from './services/recipe.service';
import { RecipeIngredientService } from './services/recipe-ingredient.service';
import { IngredientService } from './services/ingredient.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { DashboardComponent } from './components/dashboard.component';
import {RecipeComponent} from './components/recipe.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        RecipeComponent
    ],
    providers: [
        AccountService,
        LoggedInGuard,
        RecipeService,
        RecipeIngredientService,
        IngredientService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

