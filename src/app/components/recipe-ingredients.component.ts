import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {RecipeIngredientService} from '../services/recipe-ingredient.service';
import {RecipeIngredient} from '../models/recipe-ingredient'
import {IngredientService} from '../services/ingredient.service';
import {Ingredient} from '../models/ingredient'

@Component({
    selector: 'my-recipe-ingredients',
    templateUrl: './recipe-ingredients.component.html'
})
export class RecipeIngredientsComponent implements OnInit {

    @Input() recipeId: number;

    recipeIngredients: RecipeIngredient[];

    ingredients: Ingredient[];

    suggestedIngredients: Ingredient[];

    recipeIngredientsForm: FormGroup;

    units: Array<string>;

    suggestBoxVisible: boolean;

    constructor(private recipeIngredientService: RecipeIngredientService,
        private ingredientService: IngredientService,
        private formBuilder: FormBuilder) {
        this.recipeIngredientsForm = this.formBuilder.group({
            name: [''],
            id: [''],
            amount: [''],
            unit: ['']
        });

        this.units = ['GRAM', 'PIECE'];
        this.addInputValueChangeHandler();
        this.suggestBoxVisible = false;
    }

    ngOnInit(): void {
        this.recipeIngredientService.getRecipeIngredients(this.recipeId).subscribe(
            (recipeIngredients: RecipeIngredient[]) => this.recipeIngredients = recipeIngredients
        );
        this.ingredientService.getIngredients().subscribe(
            (ingredients: Ingredient[]) => {
                this.ingredients = ingredients;
                this.suggestedIngredients = this.ingredients;
            }
        );
    }

    addInputValueChangeHandler(): void {
        this.recipeIngredientsForm.controls['name'].valueChanges.subscribe((value: string) => {
            if (value.length > 0) {
                this.suggestedIngredients = this.ingredients.filter(ingredient => ingredient.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
            }
            else {
                this.suggestedIngredients = this.ingredients;                
            }
        });
        this.recipeIngredientsForm.controls['id'].reset();
    }

    selectSuggestedIngredient(ingredient: Ingredient): void {
        this.recipeIngredientsForm.controls['name'].setValue(ingredient.name);
        this.recipeIngredientsForm.controls['id'].setValue(ingredient.id);
    }

    hideSuggestBox() : void {
        setTimeout(() => this.suggestBoxVisible = false, 250);
    }

    showSuggestBox() : void {
        setTimeout(() => this.suggestBoxVisible = true, 250);
    }
}