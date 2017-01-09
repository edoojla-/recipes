import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {RecipeIngredientService} from '../services/recipe-ingredient.service';
import {RecipeIngredient} from '../models/recipe-ingredient'
@Component({
    selector: 'my-recipe-ingredients',
    templateUrl: './recipe-ingredients.component.html'
})
export class RecipeIngredientsComponent implements OnInit {

    @Input() recipeId: number;

    recipeIngredients: RecipeIngredient[];

    recipeIngredientsForm: FormGroup;

    constructor(private recipeIngredientService: RecipeIngredientService) {

    }

    ngOnInit(): void {
        this.recipeIngredientService.getRecipeIngredients(this.recipeId).subscribe(
            (recipeIngredients: RecipeIngredient[]) => this.recipeIngredients = recipeIngredients
        );
    }
}