import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe'

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

    recipes: Recipe[];

    constructor(private recipeService: RecipeService) { }

    ngOnInit(): void {
        this.getRecipes();
    }

    getRecipes(): void {
        this.recipeService.getRecipes().subscribe(
            (result: any) => {
                this.recipes = result;
            },
            (err) => console.log(err)
        );
    }
}