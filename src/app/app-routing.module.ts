import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoggedInGuard} from './services/logged-in-guard.service';

import {LoginComponent} from './components/login.component';
import {DashboardComponent} from './components/dashboard.component';
import {RecipeComponent} from './components/recipe.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
    { path: 'recipe/:id', component: RecipeComponent, canActivate: [LoggedInGuard] }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule {

}