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
            recipeIngredientId: [''],
            name: [''],
            id: [''],
            amount: [''],
            unit: ['']
        });

        this.units = ['', 'GRAM', 'PIECE', 'MILLILITER'];
        this.addInputValueChangeHandler();
        this.suggestBoxVisible = false;
    }

    ngOnInit(): void {
        this.fetchUpdatedData();
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

    hideSuggestBox(): void {
        setTimeout(() => this.suggestBoxVisible = false, 250);
    }

    showSuggestBox(): void {
        setTimeout(() => this.suggestBoxVisible = true, 250);
    }

    saveRecipeIngredient(formValue: any, isValid: boolean): void {
        if (isValid) {
            let recipeIngredient: RecipeIngredient = new RecipeIngredient();
            let ingredient: Ingredient = new Ingredient();
            ingredient.id = formValue.id;
            ingredient.name = formValue.name;
            recipeIngredient.id = formValue.recipeIngredientId;
            recipeIngredient.amount = formValue.amount;
            recipeIngredient.unit = formValue.unit;
            recipeIngredient.ingredient = ingredient;
            if (recipeIngredient.id) {
                this.recipeIngredientService.updateRecipeIngredient(recipeIngredient).subscribe(
                    (res: any) => {
                        this.fetchUpdatedData();
                    }
                );
            } else {
                this.recipeIngredientService.addRecipeIngredient(this.recipeId, recipeIngredient).subscribe(
                    (res: any) => {
                        this.fetchUpdatedData();
                    }
                );
            }
            this.recipeIngredientsForm.controls['name'].setValue('');
            this.recipeIngredientsForm.controls['amount'].setValue('')
            this.recipeIngredientsForm.controls['unit'].setValue('')
        }
    }

    editRecipeIngredient(recipeIngredient: RecipeIngredient): void {
        this.recipeIngredientsForm.patchValue(recipeIngredient);
        this.recipeIngredientsForm.patchValue(recipeIngredient.ingredient);
        this.recipeIngredientsForm.controls['recipeIngredientId'].setValue(recipeIngredient.id);
    }

    deleteRecipeIngredient(recipeIngredientId: number): void {
        this.recipeIngredientService.deleteRecipeIngredient(recipeIngredientId).subscribe(
            (res: any) => {
                this.fetchUpdatedData();
            }
        );
    }

    private fetchUpdatedData(): void {
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
}