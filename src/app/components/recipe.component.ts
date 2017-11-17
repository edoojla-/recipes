import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe'

@Component({
    selector: 'my-recipe',
    templateUrl: './recipe.component.html'
})
export class RecipeComponent implements OnInit {

    recipe: Recipe;

    recipeForm: FormGroup;

    constructor(private recipeService: RecipeService,
        private route: ActivatedRoute,
        private location: Location,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {

        this.recipeForm = this.formBuilder.group({
            id: '',
            name: '',
            description: ''
        });

        this.route.params
            .switchMap((params: Params) => this.recipeService.getRecipe(+params['id']))
            .subscribe((recipe: Recipe) => this.processRecipe(recipe));
    }

    processRecipe(recipe: Recipe): void {
        this.recipe = recipe;
        this.recipeForm.patchValue(this.recipe);
    }

    save(model: Recipe, isValid: boolean): void {
        // check if model is valid
        console.log(model, isValid);
        // if valid, call API to save recipe
        if (isValid) {
            this.recipeService.updateRecipe(model)
                .subscribe((res: any) => this.goBack());
        }
    }

    goBack(): void {
        this.location.back();
    }
}
