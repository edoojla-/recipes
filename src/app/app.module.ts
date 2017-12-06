import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {RecipeAPIInterceptor} from './services/recipe-api-interceptor';
import {AccountService} from './services/account.service';
import {LoggedInGuard} from './services/logged-in-guard.service';
import {RecipeService} from './services/recipe.service';
import {RecipeIngredientService} from './services/recipe-ingredient.service';
import {IngredientService} from './services/ingredient.service';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login.component';
import {DashboardComponent} from './components/dashboard.component';
import {RecipeComponent} from './components/recipe.component';
import {RecipeIngredientsComponent} from './components/recipe-ingredients.component';
import {OcticonDirective} from './directives/octicon.directive';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        RecipeComponent,
        RecipeIngredientsComponent,
        OcticonDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CollapseModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RecipeAPIInterceptor,
            multi: true
        },
        AccountService,
        LoggedInGuard,
        RecipeService,
        RecipeIngredientService,
        IngredientService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

